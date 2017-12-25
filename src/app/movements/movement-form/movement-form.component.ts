import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { Movement } from '../../shared/movement';
import { MovementService } from '../movement.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.css']
})
export class MovementFormComponent implements OnChanges {
  @Input() movementID: string;
  @Input() category: string;
  @Output() movementEmitter = new EventEmitter<Movement>();
  movement: Movement;
  action: string;

  constructor(private movementService: MovementService) { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.reset();
    if (changes['movementID'] && changes['movementID'].currentValue !== undefined) {
      this.movementService.getOne(changes['movementID'].currentValue)
        .then(movement => this.movement = movement)
        .catch(error => {
          alert(JSON.stringify(error, null, 2));
        });
      this.action = 'edit';
    }
  }
  reset(): void {
    this.action = 'new';
    this.movement = new Movement();
    this.movement.category = this.category === 'tutti' ? '' : this.category;
    this.movementID = null;
  }
  validateAmount(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  confirmEditing(): void {
    this.movementService.update(this.movement._id, this.movement)
      .then(response => {
        this.movementEmitter.emit(response);
      })
      .catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
  }
  confirmNew(): void {
    this.movementService.create(this.movement)
      .then(response => {
        this.movementEmitter.emit(response);
      })
      .catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
  }
}
