import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { UtilsService } from '@app/shared';

import { Category } from '@app/categories/category';
import { CategoryService } from '@app/core';
import { CategoryFormService } from '@app/categories/category-form/category-form.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category;
  action: string;
  validateNumberField: (evt: Event) => void;

  constructor(
    private utilsService: UtilsService,
    private categoryService: CategoryService,
    private categoryFormService: CategoryFormService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.category = new Category();
    this.action = 'new';
    this.validateNumberField = this.utilsService.validateNumberField;
    this.route.paramMap.subscribe(params => {
      if (params.get('category_id') !== null) {
        this.categoryService.getOne(params.get('category_id'))
          .then(category => {
            this.action = 'edit';
            this.category = category;
          })
          .catch(error => {
            alert(JSON.stringify(error, null, 2));
          });
      }
    });
  }
  reset(): void {
    this.action = 'new';
    this.category = new Category();
  }

  onSubmit() {
    let query: Promise<Category>;
    if (this.action === 'new') {
      query = this.categoryService.create(this.category);
    } else {
      query = this.categoryService.update(this.category._id, this.category);
    }
    query.then(response => {
      this.snackBar.open(this.action === 'new' ? 'Categoria creata!' : 'Categoria modificata!', 'Ok', { duration: 2000 });
      this.categoryFormService.updateCategoryID(response._id);
      this.reset();
      this.router.navigate(['/categories']);
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
