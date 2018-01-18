import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  objectKeys = Object.keys;
  categories: Category[] = [];
  categoryGroups: { [key: string]: Category[] } = {};

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().then(categories => {
      this.categories = categories.sort((a, b) => a.group < b.group ? 1 : -1);
      // this.categoryService.changeCategory('tutti');
      const groups = new Set();
      this.categories.forEach(category => {
        groups.add(category.group);
      });
      const allCategory = new Category();
      allCategory.name = allCategory.group = 'tutti';
      this.categoryGroups['tutti'] = [allCategory];
      groups.forEach(group => {
        this.categoryGroups[group] = this.categories.filter(category => category.group === group);
      });
    });
  }
  parentTabChanged(event: MatTabChangeEvent): void {
    this.categoryService.changeCategory(this.categoryGroups[event.tab.textLabel.toLowerCase()][0]);
  }
  childTabChanged(event: MatTabChangeEvent): void {
    this.categoryService.changeCategory(this.categories.find(category => category.name === event.tab.textLabel.toLowerCase()));
  }
}
