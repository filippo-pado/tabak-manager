import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
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
  parentTabChanged(event: MatTabChangeEvent): void {
    if (event.tab.textLabel === 'Tutti') {
      this.router.navigate(['movements/category/all']);
    } else {
      this.router.navigate(['movements/category/' + this.categoryGroups[event.tab.textLabel.toLowerCase()][0]._id]);
    }
  }
}
