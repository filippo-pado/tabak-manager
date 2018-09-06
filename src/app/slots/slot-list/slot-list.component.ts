import { Component, OnInit } from '@angular/core';
import { SlotService } from '@app/core';
import { SlotEditingService } from '@app/slots/slot-editing.service';
import { Slot } from '@app/slots/slot';
import { SlotDetailComponent } from '@app/slots/slot-detail/slot-detail.component';

@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit {
  slotList: Slot[] = [];
  displayedColumns: string[] = ['position', 'name', 'operational', 'actions'];

  constructor(private slotService: SlotService, private slotEditingService: SlotEditingService) { }

  ngOnInit() {
    this.reset();
    this.slotEditingService.slotUpdatedID.subscribe(slotID => {
      this.reset();
    });
  }

  reset() {
    this.slotService.getAll().then(slots => {
      this.slotList = slots;
      this.slotList.sort((a, b) => a.position > b.position ? 1 : -1);
    });
  }
}
