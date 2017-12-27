import { Component, Input, OnChanges, SimpleChange, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Movement } from '../../shared/movement';
import { MovementService } from '../movement.service';

@Component({
  selector: 'app-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.css']
})
export class MovementFormComponent implements OnChanges {
  @Input() movementID: string;
  @Input() category: string;
  @Output() movementEmitter = new EventEmitter<Movement>();
  @ViewChild('date') dateEl: ElementRef;
  movement: Movement;
  action: string;

  constructor(private movementService: MovementService, public snackBar: MatSnackBar) { }

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
    this.dateEl.nativeElement.focus();
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

  onSubmit() {
    let query: Promise<Movement>;
    if (this.action === 'new') {
      query = this.movementService.create(this.movement);
    } else {
      query = this.movementService.update(this.movement._id, this.movement);
    }
    query.then(response => {
      this.snackBar.open(this.action === 'new' ? 'Movimento creato!' : 'Movimento modificato!', 'Ok', { duration: 2000 });
      this.movementEmitter.emit(response);
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
