import { Injectable } from '@angular/core';
import { Highcharts } from 'angular-highcharts';

@Injectable()
export class HighchartsService {

  constructor() { }

  applyTheme() {
    Highcharts.setOptions(
      {
        lang: {
          thousandsSep: ""
        },
        chart: {
          backgroundColor: 'transparent',
          style: { fontFamily: 'Roboto' },
          height: '60%'
        },
        title: { text: null },
        legend: {
          itemStyle: {
            fontSize: '14px',
            fontWeight: 'normal'
          }
        },
        credits: { enabled: false },
        plotOptions: {
          column: {
            borderWidth: 0,
            maxPointWidth: 17
          },
          pie: {
            size: '80%',
            allowPointSelect: true,
            cursor: 'pointer',
            borderWidth: 0.5,
            colors: ['#F44336', '#FF9800', '#FFEB3B', '#97C31B', '#00BCD4', '#2196F3', '#9C27B0'],
            dataLabels: {
              crop: false,
              softConnector: false,
              style: {
                fontSize: '12px',
                fontWeight: 'normal'
              }
            }
          },
          series: {
            lineWidth: 3,
            marker: {
              lineWidth: 0,
              states: {
                hover: {
                  lineWidth: 1.5,
                  lineColor: 'rgba(255,255,255,0.62)',
                  radius: 6
                }
              }
            }
          }
        },
        xAxis: {
          gridLineWidth: 0,
          gridLineColor: "#ddd",
          gridLineDashStyle: "longdash",
          labels: { style: { color: '#ACACAC' } },
          tickWidth: 0,
          lineWidth: 0
        },
        yAxis: {
          gridLineWidth: 1,
          gridLineColor: "#ddd",
          gridLineDashStyle: "longdash",
          labels: { style: { color: '#ACACAC' } }
        },
        series: [
          { color: 'rgba(125,190,113,.15)', }
        ]
      }
    );
  }
}
