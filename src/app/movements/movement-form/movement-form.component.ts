import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Movement } from '@app/movements/movement';
import { Category } from '@app/categories';
import { CategoryService } from '@app/core';
import { UtilsService } from '@app/shared';
import { MovementService } from '@app/core';
import { MovementFormService } from '@app/movements/movement-form/movement-form.service';

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
    this.route.queryParams.subscribe(params => {
      if (params.movement_id) {
        this.action = 'edit';
        this.movementService.query({ _id: params.movement_id }, 'category')
          .then(movement => {
            this.dateEl.nativeElement.focus();
            this.movement = movement[0];
          })
          .catch(error => {
            alert(JSON.stringify(error, null, 2));
          });
      } else {
        if (params.category_id) {
          this.categoryService.getOne(params.category_id)
            .then(category => {
              this.reset(category);
            })
            .catch(error => {
              alert(JSON.stringify(error, null, 2));
            });
        } else {
          this.reset();
        }
      }
    });
  }
  reset(category: Category = new Category()): void {
    this.action = 'new';
    this.movement = new Movement();
    this.movement.category = category;
    setTimeout(() => this.dateEl.nativeElement.focus(), 100);
  }
  onSubmit() {
    this.movement.date = new Date(this.movement.date);
    this.movement.date.setHours(12, 0, 0);
    let query: Promise<Movement>;
    if (this.action === 'new') {
      query = this.movementService.create(this.movement);
    } else {
      query = this.movementService.update(this.movement._id, this.movement);
    }
    query.then(response => {
      this.snackBar.open(this.action === 'new' ? 'Movimento creato!' : 'Movimento modificato!', 'Ok', { duration: 2000 });
      this.movementFormService.updateMovementID(response._id);
      this.returnToCategories();
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }

  returnToCategories(): void {
    this.reset(this.movement.category);
    if (this.route.snapshot.queryParams.category_id) {
      this.router.navigate(['/movements'], { queryParams: { category_id: this.route.snapshot.queryParams.category_id } });
    } else {
      this.router.navigate(['/movements']);
    }
  }
}
