import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Rid } from '../rid';
import { RidService, MovementService } from '@app/core';
import { Movement } from '@app/movements';
import { UtilsService } from '@app/shared';

@Component({
  selector: 'app-rid-verifier',
  templateUrl: './rid-verifier.component.html',
  styleUrls: ['./rid-verifier.component.css']
})
export class RidVerifierComponent implements OnInit {
  rids: Rid[];
  movements: Movement[];

  constructor(private ridService: RidService, private movementService: MovementService,
    private utilService: UtilsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  autoVerify(): void {
    this.ridService.query({}, 'category', { date: 'asc' }).then(rids => {
      this.rids = rids;
      this.movementService.query({
        $or: [
          { 'rid': { $gt: 0 } }, { 'extraRid': { $gt: 0 } }
        ]
      }, 'category', { date: 'asc' }).then(movements => {
        this.movements = movements;
        this.rids.forEach(rid => {
          this.movements.forEach(movement => {
            if ((Math.abs(rid.amount) === Math.abs(movement.rid) || (Math.abs(rid.amount) === Math.abs(movement.extraRid))) &&
              (rid.category && movement.category && (rid.category._id === movement.category._id)) &&
              this.utilService.numDaysBetween(new Date(rid.date), new Date(movement.date)) <= 7) {
              rid.verified = true;
              rid.verifiedMovement = movement._id;
              movement.verified = true;
              movement.verifiedRid = rid;
              this.ridService.update(rid._id, rid).then(ridUpdated => {
                this.movementService.update(movement._id, movement).then(movementUpdated => {
                });
              });
              return;
            }
          });
        });
        console.log('ended');
      });
    });
  }
}
