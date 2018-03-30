import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { Vat } from './vat';
import { VatService } from '@app/core';
import { VatFormService } from './vat-form/vat-form.service';

import { ConfirmDialogComponent } from '@app/shared';

@Component({
  selector: 'app-vats',
  templateUrl: './vats.component.html',
  styleUrls: ['./vats.component.css']
})
export class VatsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Vat>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vatService: VatService,
    private vatFormService: VatFormService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ['date', 'amount', 'response', 'xml'];
    this.vatService.getAll().then(vats => {
      this.dataSource.data = vats;
    });
    this.vatFormService.vatUpdatedID.subscribe(vatUpdatedID => {
      this.vatService.getOne(vatUpdatedID).then(vat => {
        const vatIndex = this.dataSource.data.findIndex(v => v._id === vat._id);
        if (vatIndex !== -1) {
          this.dataSource.data[vatIndex] = vat;
        } else {
          this.dataSource.data.unshift(vat);
        }
        this.dataSource._updateChangeSubscription();
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  showRequest(vat: Vat) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '700px',
      data: { action: 'XML inviato:', text: vat.sentXML }
    });
  }
  showResponse(vat: Vat) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '700px',
      data: { action: 'XML ricevuto:', text: vat.responseXML }
    });
  }
}
