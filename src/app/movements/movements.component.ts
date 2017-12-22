import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent, MatSort, MatPaginator } from '@angular/material';

import { Movement } from '../shared/movement';
import { Category } from '../shared/category';
import { MovementService } from './movement.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'amount', 'profit', 'rid', 'verified', 'action'];
  dataSource = new MatTableDataSource();
  categories: Category[] = [];
  selectedTab: string = 'Tutti';
  editing: Object = {};
  newMovement: Movement = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movementService: MovementService, private categoryService: CategoryService) { }
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.categoryService.getAll().then(categories => {
      this.categories = categories;
    }).then(() => {
      this.movementService.getAll().then(movements => {
        movements.forEach(movement => {
          this.editing[movement._id] = false;
        });
        this.dataSource.data = movements;
      });
    });
  }
  ngOnInit() { }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  changedCategory(event: MatTabChangeEvent): void {
    this.selectedTab = event.index === 0 ? 'Tutti' : this.categories[event.index - 1].name;
    if ((this.selectedTab) === 'superenalotto') {
      this.displayedColumns = ['date', 'amount', 'profit', 'rid', 'extraRid', 'verified', 'action'];
    } else {
      this.displayedColumns = ['date', 'amount', 'profit', 'rid', 'verified', 'action'];
    }
    const filterCategory = this.selectedTab === 'Tutti' ? {} : { category: this.selectedTab };
    this.movementService.getAll(filterCategory).then(movements => { // -1 because position 0 is all
      movements.forEach(movement => {
        this.editing[movement._id] = false;
      });
      this.dataSource.data = movements;
    });
    this.newMovement = null;
  }
  verify(movement: Movement): void {
    movement.verified = !movement.verified;
    this.movementService.update(movement._id, movement).then(response => {

    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  startEditing(movement: Movement): void {
    this.editing[movement._id] = true;
  }
  confirmEditing(movement: Movement): void {
    this.movementService.update(movement._id, movement).then(response => {
      this.editing[movement._id] = false;
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  cancelEditing(movement: Movement): void {
    this.editing[movement._id] = false;
  }
  delete(movement: Movement): void {
    if (confirm('Eliminare elemeto?')) {
      this.movementService.delete(movement._id).then(() => {
        this.dataSource.data = this.dataSource.data.filter(function (elem: Movement) {
          return elem._id !== movement._id;
        });
      }).catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
    }
  }
  startNew(): void {
    this.newMovement = new Movement();
    this.newMovement.category = this.selectedTab;
    this.dataSource.data.unshift(this.newMovement);
    this.dataSource.filter = '';
  }
  confirmNew(movement: Movement): void {
    const index: number = this.dataSource.data.findIndex(element => element === movement);
    this.movementService.create(movement).then(response => {
      this.dataSource.data[index] = response;
      this.dataSource.filter = '';
      this.newMovement = null;
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  cancelNew(movement: Movement): void {
    this.newMovement = null;
    this.dataSource.data = this.dataSource.data.filter(function (elem: Movement) {
      return elem._id !== movement._id;
    });
    this.dataSource.filter = '';
  }
  validateAmount(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  toProfit(amount: number, category: string): Number {
    return amount * this.categories.find(x => x.name === category).amountToProfit;
  }
}
