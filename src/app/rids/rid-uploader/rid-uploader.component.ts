import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Rid } from '@app/rids/rid';
import { Category } from '@app/categories';
import { RidService } from '@app/core';
import { CategoryService } from '@app/core';

import { WorkBook, WorkSheet, read, utils } from 'xlsx/types';
type AOA = any[][];

@Component({
  selector: 'app-rid-uploader',
  templateUrl: './rid-uploader.component.html',
  styleUrls: ['./rid-uploader.component.css']
})
export class RidUploaderComponent implements OnInit {
  loading: boolean = false;
  data: AOA = [[]];
  categories: Category[];
  inputFile: File;
  inputFileName: string = '';
  @Output() ridsLoaded: EventEmitter<void> = new EventEmitter();

  constructor(private categoryService: CategoryService, private ridService: RidService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.categoryService.getAll().then(categories => {
      this.categories = categories.filter(category => (category.pattern && category.pattern !== ''));
    });
    /*this.descriptionMap = new Map<string, string>();
    this.descriptionMap.set('Delega f24', 'f24');
    this.descriptionMap.set('Bon sepa', null);
    this.descriptionMap.set('wursi srl', 'western union');
    this.descriptionMap.set('sisal group', 'superenalotto');
    this.descriptionMap.set('lottomatica holding', 'lotto');
    this.descriptionMap.set('regione veneto', 'bollo auto');
    this.descriptionMap.set('busitalia veneto', 'abbonamenti bus');
    this.descriptionMap.set('logista italia', 'tabacchi');
    this.descriptionMap.set('moneygram', 'moneygram');
    this.descriptionMap.set('lis ip s. P. A', 'lis ip s. P. A');*/
  }

  deleteAll(): void {
    if (confirm('ATTENZIONE: eliminare tutti i rid presenti??? OPERAZIONE IRREVERSIBILE!')) {
      this.ridService.deleteAll().then(() => {
        this.snackBar.open('Rid eliminati!', 'Ok', { duration: 2000 });
        this.ridsLoaded.emit();
      }).catch(error => {
        alert(JSON.stringify(error, null, 2));
      });
    }
  }

  onFileChange(evt: any) {
    // wire up file reader
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    this.inputFile = evt.target.files[0];
    this.inputFileName = this.inputFile.name;
  }

  load(): void {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // read workbook
      const bstr: string = e.target.result;
      const wb: WorkBook = read(bstr, { type: 'binary' });
      // grab first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];
      // parse data
      this.data = <AOA>(utils.sheet_to_json(ws, { header: 1 }));

      const ridToSave: Rid[] = [];
      this.data.forEach(row => {
        if (row[0] && (parseInt(row[0].substr(0, 2), 10))) {
          const rid = new Rid();
          rid.category = this.findCategory(row[3]);
          rid.description = rid.category ? rid.category.name : row[3];
          rid.amount = row[4].replace('€', '').replace(' ', '');
          rid.verifiedMovement = undefined;
          rid.verified = false;
          const [day, month, year] = row[2].split('/');
          rid.date = new Date(year, month - 1, day);
          ridToSave.push(rid);
        }
      });
      this.loading = true;
      this.ridService.createMany(ridToSave)
        .then((rids: Rid[]) => {
          this.loading = false;
          this.snackBar.open('Rid caricati!', 'Ok', { duration: 2000 });
          this.ridsLoaded.emit();
        })
        .catch(error => {
          this.loading = false;
          alert(JSON.stringify(error, null, 2));
        });
    };
    reader.readAsBinaryString(this.inputFile);
  }

  private findCategory(description: string): Category {
    let categoryFound: Category;
    this.categories.forEach(category => {
      if (description.indexOf(category.pattern) !== -1) {
        categoryFound = category;
        return;
      }
    });
    return categoryFound;
  }
}
