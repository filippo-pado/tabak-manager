import { Component, OnInit } from '@angular/core';
import { ProfitService } from '@app/core';
import { UtilsService } from '@app/shared';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-repartition-graph',
  templateUrl: './repartition-graph.component.html',
  styleUrls: ['./repartition-graph.component.css']
})
export class RepartitionGraphComponent implements OnInit {
  chart: Chart;

  constructor(private profitService: ProfitService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      this.chart = new Chart({
        chart: { type: 'pie' },
        series: [{
          name: 'Aggio',
          data: profits.map(group => {
            return { name: this.utilsService.toTitleCase(group.group), y: Math.round(group.totalGroup * 100) / 100 };
          })
        }]
      });
    });
  }
}
