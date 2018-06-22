import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Vat } from '../vat';
import { VatService } from '@app/core';
import { VatFormService } from '../vat-form/vat-form.service';

@Component({
  selector: 'app-vat-report',
  templateUrl: './vat-report.component.html',
  styleUrls: ['./vat-report.component.css']
})
export class VatReportComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  monthLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre', 'Totale'];

  constructor(
    private vatService: VatService,
    private vatFormService: VatFormService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ['month', 'vats'];
    this.loadData();
    this.vatFormService.vatUpdatedID.subscribe(vatUpdatedID => {
      this.loadData();
    });
  }

  loadData(): void {
    this.vatService.getReport().then(vatReport => {
      let total = 0;
      vatReport.forEach(row => {
        total += row.vats;
      });
      this.dataSource.data = vatReport.concat({ _id: 13, vats: total });
    });
  }
}
