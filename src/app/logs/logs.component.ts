import { Component, OnInit } from '@angular/core';

import { Log } from './log';
import { LogService } from '@app/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.query({}, '', { date: 'desc' }, 100).then(logs => {
      this.logs = logs;
    });
  }
}
