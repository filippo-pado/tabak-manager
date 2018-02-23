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
  view: string;
  periods: string[];
  periodLabels: string[];
  constructor(private profitService: ProfitService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.monthGroups();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  monthGroups(): void {
    this.view = 'month';
    this.periodLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.loadProfits(1, 'profitGroup');
    this.displayedColumns = ['group'].concat('1', '2', '3', '4', '5', '6').concat(['totalGroup']);
  }

  quarterArts(): void {
    this.view = 'quarter';
    this.periodLabels = ['Gennaio Febbraio Marzo', 'Aprile Maggio Giugno', 'Luglio Agosto Settembre', 'Ottobre Novembre Dicembre'];
    this.periods = ['1', '2', '3', '4'];
    this.loadProfits(4, 'art');
    this.displayedColumns = ['group'].concat('1', '2', '3', '4').concat(['totalGroup']);
  }

  viewSemester(semester: number): void {
    if (semester === 1) {
      this.displayedColumns = ['group'].concat(['1', '2', '3', '4', '5', '6']).concat(['totalGroup']);
    } else {
      this.displayedColumns = ['group'].concat(['7', '8', '9', '10', '11', '12']).concat(['totalGroup']);
    }
  }

  private loadProfits(month: number, group: string): void {
    this.profitService.getProfits(month, group).then(profits => {
      const totalRow = { group: 'totale' };
      this.periods.concat(['totalGroup']).forEach(period => {
        totalRow[period] = 0;
        profits.forEach(row => {
          row[period] = row[period] ? row[period] : 0;
          totalRow[period] += row[period];
        });
      });
      this.dataSource.data = profits.concat(totalRow);
    });
  }
}
