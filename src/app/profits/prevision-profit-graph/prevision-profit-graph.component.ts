import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private profitService: ProfitService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.year) {
        this.profitService.getProfits(1, 'profitGroup', Number(params.year)).then(profits => {
          let totalProfit = 0;
          profits.forEach(group => {
            totalProfit += group.totalGroup;
          });
          const yeardays = new Date().getFullYear() % 4 === 0 ? 366 : 365;
          let dayofyear = this.utilsService.dayOfYear();
          if (params.year !== (new Date()).getFullYear().toString()) {
            // other year, assume to be at 31 december
            dayofyear = yeardays;
          }
          this.chart = new Chart({
            chart: {
              type: 'pie',
            },
            tooltip: { valueSuffix: '€', valueDecimals: 2 },
            plotOptions: {
              pie: {
                allowPointSelect: false,
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
                y: Math.round(((totalProfit / dayofyear * yeardays) - totalProfit) * 100) / 100,
                color: '#FFEB3B',
              }]
            }, {
              name: 'Previsione',
              size: '100%',
              innerSize: '70%',
              data: [{
                name: 'Previsione',
                y: Math.round(totalProfit / dayofyear * yeardays * 100) / 100,
                color: '#4CAF50'
              }]
            }]
          });
        });
      }
    });
  }
}
