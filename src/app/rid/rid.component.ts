import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent, MatSort } from '@angular/material';

import { Rid } from '../shared/rid';
import { Info } from '../shared/info';
import { RidService } from './rid.service';
import { InfoService } from '../shared/info.service';

@Component({
  selector: 'app-rid',
  templateUrl: './rid.component.html',
  styleUrls: ['./rid.component.css']
})
export class RidComponent implements OnInit{
  displayedColumns = ['category', 'description', 'date', 'amount', 'action'];
  dataSource = new MatTableDataSource();
  infos: Info[]=[];
  selectedTab: String;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ridService: RidService, private infoService: InfoService) { }
  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.infoService.getInfos().then(infos=>{
      this.infos=infos;
    });
   
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  popup(element){
    alert(JSON.stringify(element, null, 2));
  }
  changedCategory(event: MatTabChangeEvent){
    this.selectedTab=event.tab.textLabel;
    this.ridService.getRids({category: this.selectedTab}).then(rids=>{
      this.dataSource.data=rids;
    });
  }
}
