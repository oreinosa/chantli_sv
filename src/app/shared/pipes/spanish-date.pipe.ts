import { MONTHS } from './../classes/months';
import { DOW } from './../classes/daysOfTheWeek';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spanishDate'
})
export class SpanishDatePipe implements PipeTransform {

  transform(dateObject: Date, args?: any): string {
    let year = dateObject.getFullYear().toString();
    let month = MONTHS[dateObject.getMonth()];
    let day = dateObject.getDate().toString();
    day = Number.parseInt(day) < 10 ? `0${day}` : day;
    let dow = dateObject.getDay();
    return DOW[dow] + ' ' + day + '/' + month + '/' + year;
  }

}
