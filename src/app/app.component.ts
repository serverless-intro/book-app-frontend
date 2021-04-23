import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'book-app';
  readonly message$: Observable<string[]>;

  constructor(http: HttpClient) {
    this.message$ = http
      .get<{ title: string }[]>('http://localhost:3000/api/books')
      .pipe(map((books) => books.map((book) => book.title)));
  }
}
