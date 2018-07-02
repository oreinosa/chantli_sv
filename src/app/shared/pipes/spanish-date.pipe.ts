import { MONTHS } from './../classes/months';
import { DOW } from './../classes/daysOfTheWeek';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spanishDate'
})
export class SpanishDatePipe implements PipeTransform {

  transform(dateObject: Date, format: string = 'long'): string {
    let dateString = '';
    const year = dateObject.getFullYear().toString();
    const month = MONTHS[dateObject.getMonth()];
    const day = dateObject.getDate();
    const dow = dateObject.getDay();

    switch (format) {
      case "long":
        dateString = DOW[dow] + ' ' + day + '/' + month + '/' + year;
        break;
      case "short":
        dateString = day + ' ' + month;
    }
    // .toString();
    // day = Number.parseInt(day) < 10 ? `0${day}` : day;
    return dateString;
  }

}
