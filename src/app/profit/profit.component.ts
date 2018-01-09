import { Component, OnInit } from '@angular/core';
import { MovementService } from '../movements/movement.service';
import { Movement } from '../movements/movement';
import { CategoryService } from '../shared/categories/category.service';
import { Category } from '../shared/categories/category';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent implements OnInit {
  categories: Category[];
  movements: { string: Movement[] };
  constructor(private movementService: MovementService, private categoryService: CategoryService) { }

  ngOnInit() {
    /*this.categoryService.getAll().then(categories => {
      this.categories = categories;
      this.categories.forEach(category => {
        this.movementService.getAll({ category: category.name }).then(movements => {
          this.movements[category.name] = movements;
          console.log(this.movements);
        });
      });
    });*/
  }

}
