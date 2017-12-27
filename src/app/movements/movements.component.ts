import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

import { Movement } from '../shared/movement';
import { Category } from '../shared/category';
import { MovementService } from './movement.service';
import { CategoryService } from '../categories/category.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Movement>;
  categories: Category[];
  selectedCategory: String;
  editingMovementID: String;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movementService: MovementService, private categoryService: CategoryService, public snackBar: MatSnackBar) { }
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
      this.selectedCategory = 'tutti';
      this.movementService.getAll().then(movements => {
        this.dataSource.data = movements;
        this.displayedColumns = ['category', 'date', 'amount', 'profit', 'rid', 'verified', 'action'];
      });
    });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  changedCategory(category: string): void {
    this.selectedCategory = category;
    const filterCategory = this.selectedCategory === 'tutti' ? {} : { category: this.selectedCategory };
    this.movementService.getAll(filterCategory).then(movements => {
      this.dataSource.data = movements;
    });
  }
  verify(movement: Movement): void {
    this.movementService.update(movement._id, movement).then(response => {
      movement.verified = !movement.verified;
      this.snackBar.open(movement.verified ? 'Movimento verificato!' : 'Movimento non verificato!', 'Ok', { duration: 2000 });
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  edit(movement: Movement): void {
    this.editingMovementID = movement._id;
  }
  delete(movement: Movement): void {
    if (confirm('Eliminare elemento?')) {
      this.movementService.delete(movement._id).then(() => {
        this.dataSource.data = this.dataSource.data.filter(function (elem: Movement) {
          return elem._id !== movement._id;
        });
        this.snackBar.open('Movimento eliminato!', 'Ok', { duration: 2000 });
      }).catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
    }
  }
  movementEmitted(movementEmitted: Movement): void {
    const movementIndex = this.dataSource.data.findIndex(movement => movement._id === movementEmitted._id);
    if (movementIndex !== -1) {
      this.dataSource.data[movementIndex] = movementEmitted;
    } else {
      this.dataSource.data.push(movementEmitted);
    }
    this.dataSource._updateChangeSubscription();
    this.editingMovementID = undefined;
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
