import { Component, Input } from '@angular/core';
import { Book } from '../../../model';

@Component({
  selector: 'ba-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  book: Book | undefined;
  coverImgSrc: string | undefined;

  @Input()
  set of(value: Book | undefined) {
    if (value) {
      this.book = value;
      if (this.book.isbn) {
        this.coverImgSrc = `https://covers.openlibrary.org/b/isbn/${this.book.isbn}-M.jpg`;
      }
    }
  }
}
