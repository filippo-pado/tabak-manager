import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ProfitService } from '@app/core';
import { Category } from '@app/categories';
import { CategoryService } from '@app/core';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  periods: string[];
  periodLabels: string[];
  totalProfit: number = 0;
  estimatedProfit: number = 0;
  constructor(private profitService: ProfitService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.monthGroups();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  monthGroups(): void {
    this.periodLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.loadProfits(1, 'profitGroup');
  }

  quarterArts(): void {
    this.periodLabels = ['Gennaio Febbraio Marzo', 'Aprile Maggio Giugno', 'Luglio Agosto Settembre', 'Ottobre Novembre Dicembre'];
    this.periods = ['1', '2', '3', '4'];
    this.loadProfits(4, 'art');
  }

  private loadProfits(month: number, group: string): void {
    this.dataSource.data = [];
    this.displayedColumns = ['group'].concat(this.periods).concat(['totalGroup']);
    this.profitService.getProfits(month, group).then(profits => {
      const totalRow = { group: 'totale' };
      this.periods.concat(['totalGroup']).forEach(period => {
        totalRow[period] = 0;
        profits.forEach(row => {
          totalRow[period] += row[period] ? row[period] : 0;
        });
      });
      this.dataSource.data = profits.concat(totalRow);

      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = (now.valueOf() - start.valueOf()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      const oneDay = 1000 * 60 * 60 * 24;
      const day = Math.floor(diff / oneDay);
      const days = new Date().getFullYear() % 4 === 0 ? 366 : 365;

      this.totalProfit = totalRow['totalGroup'];
      this.estimatedProfit = this.totalProfit / day * days;
    });
  }
}
