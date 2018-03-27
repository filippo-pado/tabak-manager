import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

import { Rid } from './rid';
import { RidService } from '@app/core';
import { MovementService } from '@app/core';

@Component({
  selector: 'app-rids',
  templateUrl: './rids.component.html',
  styleUrls: ['./rids.component.css']
})
export class RidsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<RidTableData>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ridService: RidService, private movementService: MovementService, public snackBar: MatSnackBar) { }
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.reload();
    this.displayedColumns = ['category', 'description', 'date', 'amount', 'verified', 'verifiedMovement'];
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  verify(tableRid: RidTableData): void {
    this.ridService.getOne(tableRid._id).then((rid: Rid) => {
      if (tableRid.verified) {
        rid.verified = false;
        rid.verifiedMovement = undefined;
      } else {
        rid.verified = true;
      }
      this.ridService.update(rid._id, rid).then(response => {
        this.snackBar.open(response.verified ? 'Rid verificato!' : 'Rid non verificato!', 'Ok', { duration: 2000 });
        const ridIndex = this.dataSource.data.findIndex(ri => ri._id === response._id);
        if (ridIndex !== -1) {
          this.dataSource.data[ridIndex].verified = response.verified;
          this.dataSource.data[ridIndex].verifiedMovement = response.verifiedMovement ? response.verifiedMovement : '';
          this.dataSource._updateChangeSubscription();
        }
      }).catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
    });
  }
  ridsLoaded(): void {
    this.reload();
  }
  fetchMovementDate(rid: RidTableData) {
    this.movementService.getOne(rid.verifiedMovement).then(movement => {
      rid.verifiedMovementDate = movement.date;
    });
  }


  private reload(): void {
    const data: RidTableData[] = [];
    this.ridService.query({}, 'category').then(rids => {
      rids.forEach(rid => {
        data.push(new RidTableData(rid));
      });
      this.dataSource.data = data;
    });
  }
}

class RidTableData {
  _id: string;
  category: string;
  description: string;
  date: Date;
  amount: number;
  verified: boolean;
  verifiedMovement: string;
  verifiedMovementDate: Date;
  constructor(rid: Rid) {
    this._id = rid._id;
    this.category = rid.category ? rid.category.name : 'Altro';
    this.description = rid.description;
    this.date = rid.date;
    this.amount = rid.amount;
    this.verified = rid.verified;
    this.verifiedMovement = rid.verifiedMovement ? rid.verifiedMovement : '';
  }
}
