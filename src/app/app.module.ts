import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { BookOverviewComponent } from './book/components/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/components/book-details/book-details.component';
import { BookResolver } from './book/components/book-details/book.resolver';
import { AuthGuard } from './shared/security/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/books', pathMatch: 'full' },
      {
        path: 'books',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: BookOverviewComponent },
          { path: 'new', component: BookDetailsComponent },
          { path: ':bookId', component: BookDetailsComponent, resolve: { book: BookResolver } },
        ],
      },
    ]),
    SharedModule.forRoot(),
    BookModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
