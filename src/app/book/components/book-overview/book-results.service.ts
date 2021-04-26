import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../model';
import { BookService } from '../../services/book.service';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class BookResultsService {
  private cachedResults$: Observable<Book[]> | undefined;

  constructor(private readonly books: BookService) {}

  get(): Observable<Book[]> {
    if (!this.cachedResults$) {
      this.cachedResults$ = this.books.findAll().pipe(shareReplay(1));
    }
    return this.cachedResults$;
  }
}
