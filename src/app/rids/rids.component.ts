import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent, MatSort, MatPaginator } from '@angular/material';

import { Rid } from '../shared/rid';
import { Info } from '../shared/info';
import { RidService } from './rid.service';
import { InfoService } from '../shared/info.service';

@Component({
  selector: 'app-rid',
  templateUrl: './rids.component.html',
  styleUrls: ['./rids.component.css']
})
export class RidsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['description', 'date', 'amount', 'verified', 'action'];
  dataSource = new MatTableDataSource();
  info: Info = {} as Info;
  selectedTab: string = 'Tutti';
  editing: Object = {};
  newRid: Rid = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ridService: RidService, private infoService: InfoService) { }
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.infoService.getInfo().then(info => {
      this.info = info;
    }).then(() => {
      this.ridService.getAll().then(rids => {
        rids.forEach(rid => {
          this.editing[rid._id] = false;
        });
        this.dataSource.data = rids;
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
    this.selectedTab = event.index === 0 ? 'Tutti' : this.info.categories[event.index - 1].category;
    const filterCategory = this.selectedTab === 'Tutti' ? {} : { category: this.selectedTab };
    this.ridService.getAll(filterCategory).then(rids => { // -1 because position 0 is all
      rids.forEach(rid => {
        this.editing[rid._id] = false;
      });
      this.dataSource.data = rids;
    });
    this.newRid = null;
  }
  verify(rid: Rid): void {
    rid.verified = !rid.verified;
    this.ridService.update(rid._id, rid).then(response => {

    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  startEditing(rid: Rid): void {
    this.editing[rid._id] = true;
  }
  confirmEditing(rid: Rid): void {
    this.ridService.update(rid._id, rid).then(response => {
      this.editing[rid._id] = false;
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  cancelEditing(rid: Rid): void {
    this.editing[rid._id] = false;
  }
  delete(rid: Rid): void {
    if (confirm('Eliminare elemeto?')) {
      this.ridService.delete(rid._id).then(() => {
        this.dataSource.data = this.dataSource.data.filter(function (elem: Rid) {
          return elem._id !== rid._id;
        });
      }).catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
    }
  }
  startNew(): void {
    this.newRid = new Rid();
    this.newRid.category = this.selectedTab;
    this.dataSource.data.unshift(this.newRid);
    this.dataSource.filter = '';
  }
  confirmNew(rid: Rid): void {
    const index: number = this.dataSource.data.findIndex(element => element === rid);
    this.ridService.create(rid).then(response => {
      this.dataSource.data[index] = response;
      this.dataSource.filter = '';
      this.newRid = null;
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  cancelNew(rid: Rid): void {
    this.newRid = null;
    this.dataSource.data = this.dataSource.data.filter(function (elem: Rid) {
      return elem._id !== rid._id;
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
}
