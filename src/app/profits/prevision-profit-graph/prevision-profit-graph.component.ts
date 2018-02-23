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
          type: 'pie',
          height: 300,
          width: 300
        },
        tooltip: { valueSuffix: '€', valueDecimals: 2 },
        plotOptions: {
          pie: {
            dataLabels: { enabled: false },
            showInLegend: true
          }
        },
        legend: { labelFormat: '{name}: {y:,.2f}€' },
        series: [{
          name: 'Aggio',
          size: '70%',
          data: [{
            name: 'Attuale',
            y: Math.round(totalProfit * 100) / 100,
            color: '#2196F3'
          }, {
            name: 'Rimanente',
            y: Math.round(((totalProfit / datofyear * yeardays) - totalProfit) * 100) / 100,
            color: '#FFEB3B',
          }]
        }, {
          name: 'Previsione',
          size: '100%',
          innerSize: '70%',
          data: [{
            name: 'Previsione',
            y: Math.round(totalProfit / datofyear * yeardays * 100) / 100,
            color: '#4CAF50'
          }]
        }]
      });
    });
  }
}
