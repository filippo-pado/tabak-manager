import { Component, OnInit } from '@angular/core';
import { ProfitService } from '@app/core';
import { UtilsService } from '@app/shared';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-repartition-graph',
  templateUrl: './repartition-graph.component.html',
  styleUrls: ['./repartition-graph.component.css']
})
export class RepartitionGraphComponent implements OnInit {
  chart = [];

  constructor(private profitService: ProfitService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.profitService.getProfits(1, 'profitGroup').then(profits => {
      const labels: string[] = [];
      const dataset: number[] = [];
      profits.forEach(group => {
        labels.push(this.utilsService.toTitleCase(group.group));
        dataset.push(group.totalGroup);
      });
      this.chart = new Chart('doughnut', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: dataset,
            backgroundColor: this.utilsService.randomColors(dataset.length)
          }],
          labels: labels
        }
      });
    });
  }

}
