import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

import { Rid } from './rid';
import { RidService } from '@app/core';

@Component({
  selector: 'app-rids',
  templateUrl: './rids.component.html',
  styleUrls: ['./rids.component.css']
})
export class RidsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Rid>;
  selectedCategory: String;
  editingRidID: String;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ridService: RidService, public snackBar: MatSnackBar) { }
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.selectedCategory = 'tutti';
    this.ridService.getAll().then(rids => {
      this.dataSource.data = rids;
      this.displayedColumns = ['category', 'description', 'date', 'amount', 'verified'];
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
    this.ridService.query(filterCategory).then(rids => {
      this.dataSource.data = rids;
    });
  }
  verify(rid: Rid): void {
    this.ridService.update(rid._id, rid).then(response => {
      rid.verified = !rid.verified;
      this.snackBar.open(rid.verified ? 'Rid verificato!' : 'Rid non verificato!', 'Ok', { duration: 2000 });
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
}
