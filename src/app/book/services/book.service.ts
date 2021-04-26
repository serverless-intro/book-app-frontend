import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookProperties } from '../model';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookService {
  private readonly backendUrl;

  constructor(private readonly http: HttpClient) {
    this.backendUrl = `${environment.backendUrl}/api`;
  }

  findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.backendUrl}/books`);
  }

  getOne(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.backendUrl}/books/${id}`);
  }

  save(bookToSave: BookProperties): Observable<void> {
    return this.http.post<void>(`${this.backendUrl}/books`, bookToSave);
  }

  update(bookToUpdate: Book): Observable<void> {
    return this.http.put<void>(`${this.backendUrl}/books/${bookToUpdate.id}`, bookToUpdate);
  }
}
