import { Component, OnInit } from '@angular/core';
import { HighchartsService } from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private highchartsService: HighchartsService) { }

  ngOnInit() {
    this.highchartsService.applyTheme();
  }
}
