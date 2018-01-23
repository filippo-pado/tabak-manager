import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Movement } from '../movement';
import { Category } from '../../shared/categories/category';
import { MovementService } from '../movement.service';
import { MovementFormService } from './movement-form.service';
import { CategoryService } from '../../shared/categories/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.css']
})
export class MovementFormComponent implements OnInit {
  @ViewChild('date') dateEl: ElementRef;
  movement: Movement;
  action: string;

  constructor(private movementService: MovementService, private movementFormService: MovementFormService,
    private categoryService: CategoryService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.movement = new Movement();
    this.route.paramMap.subscribe(params => {
      if (params.get('movement_id') !== null) {
        this.action = 'edit';
        this.movementService.query({ _id: params.get('movement_id') }, 'category')
          .then(movement => this.movement = movement[0])
          .catch(error => {
            alert(JSON.stringify(error, null, 2));
          });
      } else {
        this.reset();
        if (params.get('category_id') !== 'all') {
          this.categoryService.getOne(params.get('category_id'))
            .then(category => {
              this.reset(category);
            })
            .catch(error => {
              alert(JSON.stringify(error, null, 2));
            });
        }
      }
      this.dateEl.nativeElement.focus();
    });
  }
  reset(category: Category = new Category()): void {
    this.action = 'new';
    this.movement = new Movement();
    this.movement.category = category;
    this.dateEl.nativeElement.focus();
  }
  validateAmount(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  onSubmit() {
    let query: Promise<Movement>;
    if (this.action === 'new') {
      query = this.movementService.create(this.movement);
    } else {
      query = this.movementService.update(this.movement._id, this.movement);
    }
    query.then(response => {
      this.snackBar.open(this.action === 'new' ? 'Movimento creato!' : 'Movimento modificato!', 'Ok', { duration: 2000 });
      this.movementFormService.updateMovementID(response._id);
      this.reset(this.movement.category);
      this.router.navigate(['/movements/category/' + this.movement.category._id]);
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
