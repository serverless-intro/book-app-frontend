import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, Validation } from '../../model';
import { createValidatorsFrom } from '../../../shared/forms/validation';
import { BookService } from '../../services/book.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnDestroy {
  readonly bookForm: FormGroup;
  readonly originalBook: Book | undefined;
  private readonly unsubscribe = new Subject();

  constructor(activatedRoute: ActivatedRoute, private readonly router: Router, private readonly books: BookService) {
    this.bookForm = new FormGroup({
      author: new FormControl(null, createValidatorsFrom(Validation.author)),
      title: new FormControl(null, createValidatorsFrom(Validation.title)),
      isbn: new FormControl(null, createValidatorsFrom(Validation.isbn)),
    });
    this.originalBook = activatedRoute.snapshot.data.book as Book | undefined;
    if (this.originalBook) {
      this.bookForm.patchValue(this.originalBook);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  save() {
    if (this.bookForm.valid) {
      this.saveOrUpdate()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => this.router.navigate(['..']));
    }
  }

  private saveOrUpdate(): Observable<void> {
    if (this.originalBook) {
      return this.books.update({
        ...this.originalBook,
        ...this.bookForm.value,
      });
    } else {
      return this.books.save({
        ...this.bookForm.value,
      });
    }
  }
}
