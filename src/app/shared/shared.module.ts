import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatInputModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatSliderModule,
  MatIconModule,
  MatTabsModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SortByPipe } from './pipes/sort-by.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    CommonModule,
    SortByPipe,
    CapitalizePipe,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  declarations: [SortByPipe, CapitalizePipe],
})
export class SharedModule { }
