import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ProfitService } from './profit.service';
import { Category } from '../shared/categories/category';
import { CategoryService } from '../shared/categories/category.service';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  viewType: string;
  labels: string[];
  groups: string[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  constructor(private profitService: ProfitService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.monthGroups();
  }
  monthGroups(): void {
    this.dataSource.data = [];
    this.labels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.categoryService.getAll().then(categories => {
      const profitGroups = new Set();
      categories.forEach(category => {
        profitGroups.add(category.profitGroup);
      });
      this.groups = Array.from(profitGroups);
      this.displayedColumns = ['period'].concat(this.groups);
    });

    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      this.dataSource.data = profits;
    });
  }

  quarterArts(): void {
    this.dataSource.data = [];
    this.labels = ['Gennaio Febbraio Marzo', 'Aprile Maggio Giugno', 'Luglio Agosto Settembre', 'Ottobre Novembre Dicembre'];
    this.categoryService.getAll().then(categories => {
      const arts = new Set();
      categories.forEach(category => {
        arts.add(category.art);
      });
      this.groups = Array.from(arts);
      this.displayedColumns = ['period'].concat(this.groups);
    });

    this.profitService.getProfits(4, 'art').then(profits => {
      this.dataSource.data = profits;
    });
  }

}


