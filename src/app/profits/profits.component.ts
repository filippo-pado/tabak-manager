import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ProfitService } from './profit.service';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/category.service';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  viewType: string;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
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
    this.periodLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.dataSource.data = [];
    this.displayedColumns = ['group'].concat(this.periods).concat(['totalGroup']);
    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      const totalRow = { group: 'totale' };
      this.periods.concat(['totalGroup']).forEach(period => {
        totalRow[period] = 0;
        profits.forEach(row => {
          totalRow[period] += row[period] ? row[period] : 0;
        });
      });
      this.dataSource.data = profits.concat(totalRow);
    });
  }

  quarterArts(): void {
    this.periodLabels = ['Gennaio Febbraio Marzo', 'Aprile Maggio Giugno', 'Luglio Agosto Settembre', 'Ottobre Novembre Dicembre'];
    this.periods = ['1', '2', '3', '4'];
    this.dataSource.data = [];
    this.displayedColumns = ['group'].concat(this.periods).concat(['totalGroup']);
    this.profitService.getProfits(4, 'art').then(profits => {
      this.dataSource.data = profits;
    });
  }
}


