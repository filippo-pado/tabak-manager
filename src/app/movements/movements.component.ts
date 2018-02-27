import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Movement } from './movement';
import { MovementService } from '@app/core';
import { MovementFormService } from './movement-form/movement-form.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<MovementTableData>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movementService: MovementService, private movementFormService: MovementFormService,
    public snackBar: MatSnackBar, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ['category', 'date', 'amount', 'profit', 'rid', 'note', 'verified', 'action'];
    this.movementFormService.movementUpdatedID.subscribe(movementUpdatedID => {
      this.movementService.query({ _id: movementUpdatedID }, 'category').then(movements => {
        const movement = movements[0];
        const movementIndex = this.dataSource.data.findIndex(mov => mov._id === movement._id);
        if (movementIndex !== -1) {
          this.dataSource.data[movementIndex] = new MovementTableData(movement);
        } else {
          this.dataSource.data.unshift(new MovementTableData(movement));
        }
        this.dataSource._updateChangeSubscription();
      });
    });
    this.route.queryParams.subscribe(params => {
      // if movement_id changes, load only if it comes from first load by url
      if (!params.movement_id || !this.dataSource.data.length) {
        const filterCategory = (params && params.category_id) ? { category: params.category_id } : {};
        this.movementService.query(filterCategory, 'category').then(movements => {
          const data: MovementTableData[] = [];
          movements.forEach(movement => {
            data.push(new MovementTableData(movement));
          });
          this.dataSource.data = data;
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
  verify(tableMovement: MovementTableData): void {
    this.movementService.getOne(tableMovement._id).then((movement: Movement) => {
      if (tableMovement.verified) {
        movement.verified = false;
        movement.verifiedRid = undefined;
      } else {
        movement.verified = true;
      }
      this.movementService.update(movement._id, movement).then(response => {
        this.snackBar.open(response.verified ? 'Movimento verificato!' : 'Movimento non verificato!', 'Ok', { duration: 2000 });
        const movementIndex = this.dataSource.data.findIndex(mov => mov._id === response._id);
        if (movementIndex !== -1) {
          this.dataSource.data[movementIndex].verified = response.verified;
          this.dataSource.data[movementIndex].verifiedRid = response.verifiedRid ? response.verifiedRid.date : undefined;
          this.dataSource._updateChangeSubscription();
        }
      }).catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
    });
  }
  delete(movement: Movement): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: movement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movementService.delete(movement._id).then(() => {
          this.dataSource.data = this.dataSource.data.filter(function (elem: MovementTableData) {
            return elem._id !== movement._id;
          });
          this.snackBar.open('Movimento eliminato!', 'Ok', { duration: 2000 });
        }).catch(error => {
          alert(JSON.stringify(error, null, 2));
        });
      }
    });
  }
}

class MovementTableData {
  _id: string;
  category: string;
  date: Date;
  amount: number;
  profit: number;
  rid: number[] = [];
  note: string;
  verified: boolean;
  verifiedRid: Date;
  constructor(movement: Movement) {
    this._id = movement._id;
    this.category = movement.category.name;
    this.date = movement.date;
    this.amount = movement.amount;
    this.profit = movement.amount * movement.category.amountToProfit;
    this.rid.push(movement.rid);
    this.rid.push(movement.extraRid);
    this.note = movement.note;
    this.verified = movement.verified;
    this.verifiedRid = movement.verifiedRid ? movement.verifiedRid.date : undefined;
  }
}
