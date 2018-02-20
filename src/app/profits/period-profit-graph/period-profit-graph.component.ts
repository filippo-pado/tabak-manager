import { Component, OnInit } from '@angular/core';
import { ProfitService } from '@app/core';
import { UtilsService } from '@app/shared';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-period-profit-graph',
  templateUrl: './period-profit-graph.component.html',
  styleUrls: ['./period-profit-graph.component.css']
})
export class PeriodProfitGraphComponent implements OnInit {
  chart = [];

  constructor(private profitService: ProfitService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      const datasets = [];
      const periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      profits.forEach(group => {
        const groupProfits = [];
        periods.forEach(period => {
          groupProfits.push(group[period] ? group[period] : 0);
        });
        datasets.push({
          label: this.utilsService.toTitleCase(group.group),
          data: groupProfits,
          borderColor: this.utilsService.randomColor(),
          fill: false,
          hidden: true,
        });
      });
      datasets[0].hidden = false;
      this.chart = new Chart('line', {
        type: 'line',
        data: {
          datasets: datasets,
          labels: periods
        }
      });
    });
  }

}
