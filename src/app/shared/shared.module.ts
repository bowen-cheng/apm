import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StarComponent } from './star/star.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StarComponent],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {
}
