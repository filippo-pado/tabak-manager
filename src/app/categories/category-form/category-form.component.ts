import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { UtilsService } from '@app/shared';

import { Category } from '../category';
import { CategoryService } from '@app/core';
import { CategoryFormService } from './category-form.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category = new Category();
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
    this.validateNumberField = this.utilsService.validateNumberField;
    this.route.paramMap.subscribe(params => {
      if (params.get('category_id') !== null) {
        this.categoryService.getOne(params.get('category_id'))
          .then(category => {
            this.category = category;
          })
          .catch(error => {
            alert(JSON.stringify(error, null, 2));
          });
      }
    });
  }

  onSubmit() {
    this.categoryService.update(this.category._id, this.category).then(response => {
      this.snackBar.open('Categoria modificata!', 'Ok', { duration: 2000 });
      this.categoryFormService.updateCategoryID(response._id);
      this.router.navigate(['/categories']);
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
