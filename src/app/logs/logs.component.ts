import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Log } from './log';
import { LogService } from '@app/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'requestType', 'body'];
  dataSource: MatTableDataSource<Log>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.logService.query({}, '', { date: 'desc' }, 100).then(logs => {
      this.dataSource.data = logs;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
