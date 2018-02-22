import { Injectable } from '@angular/core';
import { Highcharts } from 'angular-highcharts';

@Injectable()
export class HighchartsService {

  constructor() { }

  applyTheme() {
    Highcharts.setOptions(
      {
        chart: {
          backgroundColor: 'transparent',
          style: {
            fontFamily: 'Roboto'
          },
          spacing: [30, 30, 30, 30],
          width: 450
        },
        credits: {
          enabled: false
        },
        title: {
          align: 'center',
          style: {
            color: '#717171',
            fontWeight: '400',
            padding: '1em 0',
            'text-transform': 'uppercase'
          }
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            maxPointWidth: 17
          },
          pie: {
            borderWidth: 0,
            colors: ['#F44336', '#FF9800', '#FFEB3B', '#97C31B', '#00BCD4', '#2196F3', '#9C27B0'],
            dataLabels: {
              style: {
                fontWeight: '500'
              }
            }
          },
          series: {
            lineWidth: 3,
            marker: {
              radius: 5,
              symbol: 'circle',
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
          labels: {
            style: {
              color: '#ACACAC'
            }
          },
          tickWidth: 0,
          lineWidth: 0
        },
        yAxis: {
          gridLineWidth: 1,
          gridLineColor: "#ddd",
          gridLineDashStyle: "longdash",
          labels: {
            style: {
              color: '#ACACAC'
            }
          }
        },
        series: [
          {
            color: 'rgba(125,190,113,.15)',
          }
        ]
      }
    );
  }
}
