import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
    '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11',
    '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];

  constructor() { }

  validateNumberField(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  numDaysBetween = function (d1: Date, d2: Date) {
    const diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

  randomColors(total: number): string[] {
    if (total <= 20) {
      return this.colors.slice(0, total - 1);
    }
    return ['#3366CC'];
  }
  randomColor(): string {
    return this.colors[Math.floor(Math.random() * 20)];
  }

  toTitleCase(str): string {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }
}
