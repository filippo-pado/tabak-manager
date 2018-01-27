import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Movement } from '../movement';
import { Category } from '@app/categories';
import { CategoryService } from '@app/core';
import { UtilsService } from '@app/shared';
import { MovementService } from '@app/core';
import { MovementFormService } from './movement-form.service';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.css']
})
export class MovementFormComponent implements OnInit {
  @ViewChild('date') dateEl: ElementRef;
  movement: Movement;
  action: string;
  validateNumberField: (evt: Event) => void;

  constructor(private utilsService: UtilsService, private movementService: MovementService,
    private movementFormService: MovementFormService,
    private categoryService: CategoryService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.validateNumberField = this.utilsService.validateNumberField;
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
