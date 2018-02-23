import { Component, OnInit } from '@angular/core';
import { ProfitService } from '@app/core';
import { UtilsService } from '@app/shared';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-period-profit-graph',
  templateUrl: './period-profit-graph.component.html',
  styleUrls: ['./period-profit-graph.component.css']
})
export class PeriodProfitGraphComponent implements OnInit {
  chart: Chart;

  constructor(private profitService: ProfitService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      const periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      const dataset = [];
      profits.forEach(group => {
        const groupData = [];
        periods.forEach(period => {
          groupData.push([period, group[period] ? group[period] : 0]);
        });
        dataset.push({
          name: this.utilsService.toTitleCase(group.group),
          data: groupData,
          visible: false
        });
      });
      dataset[0].visible = true;
      this.chart = new Chart({
        chart: { type: 'line' },
        credits: { enabled: false },
        title: { text: null },
        series: dataset,
        yAxis: { title: { text: null } },
        xAxis: {
          categories: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
        },
      });
    });
  }
}
