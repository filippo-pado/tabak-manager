import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ProfitService } from '@app/core';
import { Highcharts } from 'angular-highcharts';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  artGroupToggle: string;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  periods: string[];
  periodLabels: string[];
  currentYear: number;
  years: number[] = [];
  constructor(private profitService: ProfitService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.applyTheme();
    this.dataSource = new MatTableDataSource();
    this.periodLabels = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.periods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.artGroupToggle = 'profitGroup';
    this.viewSemester(1);
    for (let year = 2018; year <= (new Date()).getFullYear(); year++) {
      this.years.push(year);
    }
    this.route.params.subscribe(params => {
      if (params.year) {
        this.currentYear = Number(params.year);
        this.loadProfits(1, this.artGroupToggle, this.currentYear);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  changedArtGroup(event: MatButtonToggleChange) {
    this.loadProfits(1, event.value, this.currentYear);
  }
  changedSemester(event: MatButtonToggleChange) {
    this.viewSemester(Number(event.value));
  }
  viewSemester(semester: number): void {
    if (semester === 1) {
      this.displayedColumns = ['group'].concat(['1', '2', '3', '4', '5', '6']).concat(['totalGroup']);
    } else {
      this.displayedColumns = ['group'].concat(['7', '8', '9', '10', '11', '12']).concat(['totalGroup']);
    }
  }

  private loadProfits(monthsGroup: number, group: string, year: number): void {
    this.profitService.getProfits(monthsGroup, group, year).then(profits => {
      const totalRow = { group: 'totale' };
      this.periods.concat(['totalGroup']).forEach(period => {
        totalRow[period] = 0;
        profits.forEach(row => {
          row[period] = row[period] ? row[period] : 0;
          totalRow[period] += row[period];
        });
      });
      this.dataSource.data = profits.concat(totalRow);
    });
  }
  private applyTheme() {
    Highcharts.setOptions(
      {
        lang: {
          thousandsSep: ''
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
              softConnector: false,
              distance: 10,
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
          gridLineColor: '#ddd',
          gridLineDashStyle: 'longdash',
          labels: { style: { color: '#ACACAC' } },
          tickWidth: 0,
          lineWidth: 0
        },
        yAxis: {
          gridLineWidth: 1,
          gridLineColor: '#ddd',
          gridLineDashStyle: 'longdash',
          labels: { style: { color: '#ACACAC' } }
        },
        series: [
          { color: 'rgba(125,190,113,.15)', }
        ]
      }
    );
  }
}
