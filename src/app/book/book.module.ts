import { ModuleWithProviders, NgModule } from '@angular/core';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookOverviewComponent } from './components/book-overview/book-overview.component';
import { BookService } from './services/book.service';
import { BookResolver } from './components/book-details/book.resolver';
import { SharedModule } from '../shared/shared.module';
import { BookCardComponent } from './components/book-overview/book-card/book-card.component';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent, BookCardComponent],
  imports: [SharedModule],
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BookResolver],
    };
  }
}
