import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  validateNumberField(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
