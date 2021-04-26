import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Book } from '../../model';
import { Injectable } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService, private readonly router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookId = route.paramMap.get('bookId');
    if (bookId) {
      return this.books.getOne(bookId).pipe(
        catchError((err) => {
          this.navigateToAddNewBookDialog();
          return throwError(err);
        }),
      );
    } else {
      this.navigateToAddNewBookDialog();
      return throwError('No bookId provided');
    }
  }

  private navigateToAddNewBookDialog(): void {
    setTimeout(() => this.router.navigateByUrl('/books/new'));
  }
}
