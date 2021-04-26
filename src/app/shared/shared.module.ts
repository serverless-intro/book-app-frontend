import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormErrorsComponent } from './forms/form-errors/form-errors.component';
import { WithFormErrorsComponent } from './forms/with-form-errors/with-form-errors.component';

@NgModule({
  declarations: [HeaderComponent, FormErrorsComponent, WithFormErrorsComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    // re-export
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // shared components
    HeaderComponent,
    FormErrorsComponent,
    WithFormErrorsComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
