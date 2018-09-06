import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { SlotService } from '@app/core';
import { SlotEditingService } from '@app/slots/slot-editing.service';
import { Slot } from '@app/slots/slot';
import { ConfirmDialogComponent } from '@app/shared';

@Component({
  selector: 'app-slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.css']
})
export class SlotDetailComponent implements OnInit {
  slot: Slot;
  constructor(private slotService: SlotService,
    private slotEditingService: SlotEditingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.slot_id) {
        this.slotService.getOne(params.slot_id).then(slot => {
          this.slot = slot;
        });
      } else {
        this.slot = new Slot();
      }
    });
  }
  operationalChange(val: string) {
    this.slot.operational = val === 'true' ? true : false;
  }
  create() {
    this.slotService.create(this.slot).then(response => {
      this.snackBar.open('Slot creata!', 'Ok', { duration: 2000 });
      this.slotEditingService.updatedSlotID(response._id);
      this.reset();
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  reset() {
    this.slot = new Slot();
    this.router.navigate(['/slots']);
  }
  edit() {
    this.slotService.update(this.slot._id, this.slot).then(response => {
      this.snackBar.open('Slot modificata!', 'Ok', { duration: 2000 });
      this.slotEditingService.updatedSlotID(response._id);
      this.reset();
    }).catch(error => {
      alert(JSON.stringify(error, null, 2));
    });
  }
  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { action: 'Confermi eliminazione?', object: this.slot }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.slotService.delete(this.slot._id).then(() => {
          this.slotEditingService.updatedSlotID(this.slot._id);
          this.snackBar.open('Slot eliminata!', 'Ok', { duration: 2000 });
          this.reset();
        }).catch(error => {
          alert(JSON.stringify(error, null, 2));
        });
      }
    });
  }

}
