import { Component, OnInit } from '@angular/core';
import { SlotService } from '@app/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { SlotEditingService } from '@app/slots/slot-editing.service';
import { Slot } from '@app/slots/slot';
import { SlotReport } from '@app/slots/slot-report';
import { ConfirmDialogComponent } from '@app/shared';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  slotList: Slot[] = [];
  reportsDate: Date = new Date();
  newSlotReports = {};
  reportsByDate = [];
  constructor(private slotService: SlotService,
    private slotEditingService: SlotEditingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.reset();
    this.slotEditingService.slotUpdatedID.subscribe(slotID => {
      this.reset();
    });
  }
  saveReport() {
    const savingPromises: Promise<any>[] = [];
    this.slotList.forEach(slot => {
      this.newSlotReports[slot._id].date = this.reportsDate;
      savingPromises.push(this.slotService.createReport(slot._id, this.newSlotReports[slot._id])
        .then(response => { })
        .catch(error => {
          alert(JSON.stringify(error, null, 2));
        })
      );
    });
    Promise.all(savingPromises).then(() => {
      this.reset();
      this.snackBar.open('Report salvato!', 'Ok', { duration: 2000 });
    });
  }

  reset() {
    this.slotService.query({ operational: 1 }, { position: 1 }).then(slots => {
      this.slotList = slots;
      this.slotList.forEach(slot => {
        this.newSlotReports[slot._id] = new SlotReport();
      });
    });
    this.slotService.getReportsByDate().then(repByDate => {
      this.reportsByDate = repByDate;
      this.reportsByDate.forEach(dateReports => {
        dateReports.profit = this.getProfit(dateReports._id);
      });
    });
  }
  getSlotReport(reports: any[], slotID: string) {
    return reports.find(report => report.slot === slotID);
  }
  getProfit(date: string) {
    const dateIndex = this.reportsByDate.findIndex(reports => reports._id === date);
    if (dateIndex <= 0) { return 0; } // not found or first day
    const dateReports = this.reportsByDate[dateIndex];
    const previousDateReports = this.reportsByDate[dateIndex - 1];
    let profit = 0;
    this.slotList.forEach(slot => {
      const dateSlotReport = this.getSlotReport(dateReports.reports, slot._id);
      const previousDateSlotReport = this.getSlotReport(previousDateReports.reports, slot._id);
      if (!dateSlotReport || !previousDateSlotReport) { return 'error'; }
      // check if negative
      const totalIn = dateSlotReport.totalIn - previousDateSlotReport.totalIn;
      const totalOut = dateSlotReport.totalOut - previousDateSlotReport.totalOut;
      if (totalIn > totalOut) {
        const income = (totalIn - totalOut - (totalIn * 19.8 / 100)) * 80 / 100;
        profit += income;
      } else {
        this.reportsByDate.find(reports => reports._id === date).
          reports.find(report => report.slot === slot._id)['negative'] = true;
      }
    });
    return profit;
  }
  deleteReports(reports: any[]) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { action: 'Confermi eliminazione?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deletingPromises: Promise<any>[] = [];
        reports.forEach(report => {
          deletingPromises.push(this.slotService.deleteReport(report.slot, report._id)
            .then(response => { })
            .catch(error => {
              alert(JSON.stringify(error, null, 2));
            })
          );
        });
        Promise.all(deletingPromises).then(() => {
          this.reset();
          this.snackBar.open('Report eliminato!', 'Ok', { duration: 2000 });
        });
      }
    });
  }
}
