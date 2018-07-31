import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private profitService: ProfitService,
    private utilsService: UtilsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.year) {
        this.profitService.getProfits(1, 'profitGroup', Number(params.year)).then(profits => {
          this.chart = new Chart({
            chart: { type: 'pie' },
            plotOptions: {
              pie: {
                dataLabels: {
                  format: '{point.name} {point.percentage:.1f} %'
                }
              }
            },
            series: [{
              name: 'Aggio',
              data: profits.map(group => {
                return { name: this.utilsService.toTitleCase(group.group), y: Math.round(group.totalGroup * 100) / 100 };
              })
            }]
          });
        });
      }
    });
  }
}
