import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { UtilsService } from '@app/shared';

import { Vat } from '../vat';
import { VatService } from '@app/core';
import { VatFormService } from './vat-form.service';

@Component({
  selector: 'app-vat-form',
  templateUrl: './vat-form.component.html',
  styleUrls: ['./vat-form.component.css']
})
export class VatFormComponent implements OnInit {
  vat: Vat;
  action: string;
  validateNumberField: (evt: Event) => void;

  constructor(
    private utilsService: UtilsService,
    private vatService: VatService,
    private vatFormService: VatFormService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.vat = new Vat();
    this.action = 'new';
    this.validateNumberField = this.utilsService.validateNumberField;
  }
  reset(): void {
    this.vat = new Vat();
  }

  onSubmit() {
    this.vatService.create(this.vat).then(response => {
      this.snackBar.open('Corrispettivi inviati!', 'Ok', { duration: 2000 });
      this.vatFormService.updateVatID(response._id);
      this.reset();
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
