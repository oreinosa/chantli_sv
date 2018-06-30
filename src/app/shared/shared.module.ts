import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
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
  MatTooltipModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
} from '@angular/material';

import { tap, takeUntil, take, filter, map, switchMap, } from 'rxjs/operators';
import { SortByPipe } from './pipes/sort-by.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ProductsByCategoryPipe } from './pipes/products-by-category.pipe';
import { GetMenuProductsPipe } from './pipes/get-menu-products.pipe';
import { EditingSubcollectionPipe } from './pipes/editing-subcollection.pipe';
import { DowPipe } from './pipes/dow.pipe';
import { SelectedPipe } from './pipes/selected.pipe';
import { CalTotalPipe } from './pipes/cal-total.pipe';
import { SpanishDatePipe } from './pipes/spanish-date.pipe';
import { TtdPipe } from './pipes/ttd.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    CommonModule,
    SortByPipe,
    CapitalizePipe,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatSnackBarModule,
    ProductsByCategoryPipe,
    GetMenuProductsPipe,
    MatAutocompleteModule,
    EditingSubcollectionPipe,
    DowPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    SelectedPipe,
    CalTotalPipe,
    SpanishDatePipe,
    TtdPipe,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [
    SortByPipe,
    CapitalizePipe,
    ProductsByCategoryPipe,
    GetMenuProductsPipe,
    EditingSubcollectionPipe,
    DowPipe,
    SelectedPipe,
    CalTotalPipe,
    SpanishDatePipe,
    TtdPipe
  ],
})
export class SharedModule { }
