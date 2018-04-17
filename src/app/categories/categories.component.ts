import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Category } from './category';
import { CategoryService } from '@app/core';
import { CategoryFormService } from './category-form/category-form.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService, private categoryFormService: CategoryFormService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ['name', 'pattern', 'group', 'profitGroup', 'art', 'rate', 'amountToProfit', 'amountHint', 'action'];
    this.categoryService.getAll().then(categories => {
      this.dataSource.data = categories;
    });
    this.categoryFormService.categoryUpdatedID.subscribe(categoryUpdatedID => {
      this.categoryService.getOne(categoryUpdatedID).then(category => {
        const categoryIndex = this.dataSource.data.findIndex(cat => cat._id === category._id);
        if (categoryIndex !== -1) {
          this.dataSource.data[categoryIndex] = category;
        } else {
          this.dataSource.data.unshift(category);
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

}
