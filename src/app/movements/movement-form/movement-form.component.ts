import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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
    private categoryService: CategoryService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.reset();
    this.movementFormService.movementID.subscribe(movementID => {
      this.movementService.query({ _id: movementID }, 'category')
        .then(movement => this.movement = movement[0])
        .catch(error => {
          alert(JSON.stringify(error, null, 2));
        });
      this.action = 'edit';
    });
    this.categoryService.category.subscribe(category => {
      this.reset(category.name === 'tutti' ? new Category() : category);
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
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
