import { Component, OnInit } from '@angular/core';
import { ProfitService } from '@app/core';
import { UtilsService } from '@app/shared';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-prevision-profit-graph',
  templateUrl: './prevision-profit-graph.component.html',
  styleUrls: ['./prevision-profit-graph.component.css']
})
export class PrevisionProfitGraphComponent implements OnInit {
  chart: Chart;

  constructor(private profitService: ProfitService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      let totalProfit = 0;
      profits.forEach(group => {
        totalProfit += group.totalGroup;
      });
      const yeardays = new Date().getFullYear() % 4 === 0 ? 366 : 365;
      const datofyear = this.utilsService.dayOfYear();
      this.chart = new Chart({
        chart: {
          type: 'bar'
        },
        series: [{
          name: 'Attuale',
          data: [Math.round(totalProfit * 100) / 100]
        }, {
          name: 'Previsione',
          data: [Math.round(totalProfit / datofyear * yeardays * 100) / 100]
        }],
        title: {
          text: 'Previsione Aggio'
        },
        xAxis: {
          visible: false
        },
        yAxis: {
          title: {
            text: null
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              format: "{point.y} €",
              style: {
                fontSize: '15px',
                fontWeight: '500'
              }
            }
          }
        }
      });
    });
  }
}
