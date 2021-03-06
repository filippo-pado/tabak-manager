import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { UtilsService } from '@app/shared';

import { Vat } from '@app/vats/vat';
import { VatService } from '@app/core';
import { VatFormService } from '@app/vats/vat-form/vat-form.service';

import { ConfirmDialogComponent } from '@app/shared';

@Component({
  selector: 'app-vat-form',
  templateUrl: './vat-form.component.html',
  styleUrls: ['./vat-form.component.css']
})
export class VatFormComponent implements OnInit {
  vat: Vat;
  action: string;
  sendingVats: boolean = false;
  validateNumberField: (evt: Event) => void;

  constructor(
    private utilsService: UtilsService,
    private vatService: VatService,
    private vatFormService: VatFormService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
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
    if (this.vat.amount >= 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: { action: 'Confermi invio corrispettivi?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sendingVats = true;
          this.vatService.create(this.vat).then(response => {
            this.sendingVats = false;
            this.snackBar.open('Corrispettivi inviati!', 'Ok', { duration: 2000 });
            this.vatFormService.updateVatID(response._id);
            this.reset();
          }).catch(error => {
            this.sendingVats = false;
            alert(JSON.stringify(error, null, 2));
          });
        }
      });
    }
  }
}
