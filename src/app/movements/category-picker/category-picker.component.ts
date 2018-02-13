import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '@app/categories';
import { CategoryService } from '@app/core';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.css']
})
export class CategoryPickerComponent implements OnInit {
  objectKeys = Object.keys;
  categories: Category[] = [];
  categoryGroups: { [key: string]: Category[] } = {};

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getAll().then(categories => {
      this.categories = categories.sort((a, b) => a.group < b.group ? 1 : -1);
      const groups = new Set();
      this.categories.forEach(category => {
        groups.add(category.group);
      });
      groups.forEach(group => {
        this.categoryGroups[group] = this.categories.filter(category => category.group === group);
      });
    });
  }
}
