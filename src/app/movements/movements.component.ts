import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Movement } from './movement';
import { MovementService } from '@app/core';
import { MovementFormService } from './movement-form/movement-form.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Movement>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movementService: MovementService, private movementFormService: MovementFormService,
    public snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ['category', 'date', 'amount', 'profit', 'rid', 'note', 'verified', 'action'];
    this.movementFormService.movementUpdatedID.subscribe(movementUpdatedID => {
      this.movementService.query({ _id: movementUpdatedID }, 'category').then(movements => {
        const movement = movements[0];
        const movementIndex = this.dataSource.data.findIndex(mov => mov._id === movement._id);
        if (movementIndex !== -1) {
          this.dataSource.data[movementIndex] = movement;
        } else {
          this.dataSource.data.unshift(movement);
        }
        this.dataSource._updateChangeSubscription();
      });
    });
    this.route.queryParams.subscribe(params => {
      // if movement_id changes, load only if it comes from first load by url
      if (!params.movement_id || !this.dataSource.data.length) {
        const filterCategory = (params && params.category_id) ? { category: params.category_id } : {};
        this.movementService.query(filterCategory, 'category').then(movements => {
          this.dataSource.data = movements;
        });
      }
    });
  }


  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  verify(movement: Movement): void {
    if (movement.verified) {
      movement.verified = false;
      movement.verifiedRid = null;
    } else {
      movement.verified = true;
    }
    this.movementService.update(movement._id, movement).then(response => {
      this.snackBar.open(movement.verified ? 'Movimento verificato!' : 'Movimento non verificato!', 'Ok', { duration: 2000 });
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
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
}
