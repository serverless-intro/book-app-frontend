import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, pluck, switchMap, tap } from 'rxjs/operators';
import { BookResultsService } from './book-results.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
  providers: [BookResultsService],
})
export class BookOverviewComponent implements OnDestroy {
  readonly $books: Observable<Book[]>;
  readonly queryFormControl;
  readonly queryValueChangeSubscription: Subscription;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookResults: BookResultsService,
    private readonly router: Router,
  ) {
    this.queryFormControl = new FormControl();
    this.queryValueChangeSubscription = this.updateUrlQueryParamOnChangeInInput();
    this.$books = this.emitFilteredBooksOnQueryParamChange();
  }

  ngOnDestroy(): void {
    this.queryValueChangeSubscription.unsubscribe();
  }

  private emitFilteredBooksOnQueryParamChange(): Observable<Book[]> {
    return this.activatedRoute.params.pipe(
      pluck('query'),
      tap((query) => this.queryFormControl.setValue(query)),
      switchMap((query) => this.bookResults.get().pipe(map((books) => books.filter(bookMatchesQueryOf(query))))),
    );
  }

  private updateUrlQueryParamOnChangeInInput(): Subscription {
    return this.queryFormControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => value != null),
      )
      .subscribe((newQuery) => this.router.navigate([{ query: newQuery }], { relativeTo: this.activatedRoute }));
  }
}

function bookMatchesQueryOf(query: string | undefined) {
  return function (book: Book): boolean {
    return query ? stringOf(book.author).includes(query) || stringOf(book.title).includes(query) : true;
  };

  function stringOf(value: string) {
    return {
      includes(anotherValue: string): boolean {
        return value.toLowerCase().includes(anotherValue.toLowerCase());
      },
    };
  }
}
