import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().then(categories => {
      this.categories = categories.sort((a, b) => a.group < b.group ? 1 : -1);
      this.categoryService.changeCategory('tutti');
    });
  }
  groups(): string[] {
    const groups = new Set();
    this.categories.forEach(category => {
      groups.add(category.group !== 'null' ? category.group : category.name);
    });
    return Array.from(groups);
  }
  subCategories(group: string): Category[] {
    return this.categories.filter(category => category.group === group);
  }
  parentTabChanged(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this.categoryService.changeCategory('tutti');
    } else {
      const newCat: string = this.subCategories(event.tab.textLabel.toLowerCase())[0].name;
      this.categoryService.changeCategory(newCat);
    }
  }
  childTabChanged(event: MatTabChangeEvent): void {
    this.categoryService.changeCategory(event.tab.textLabel.toLowerCase());
  }
}
