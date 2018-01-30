import { Component, OnInit } from '@angular/core';
import { Rid } from '../rid';
import { Category } from '@app/categories';
import { CategoryService } from '@app/core';

import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-rid-uploader',
  templateUrl: './rid-uploader.component.html',
  styleUrls: ['./rid-uploader.component.css']
})
export class RidUploaderComponent implements OnInit {
  data: AOA = [[]];
  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().then(categories => {
      this.categories = categories;
    });
  }

  onFileChange(evt: any) {
    // wire up file reader
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // read workbook
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // grab first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // parse data
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      const ridToSave: Rid[] = [];
      this.data.forEach(row => {
        if (row[0] && (parseInt(row[0].substr(0, 2), 10))) {
          const rid = new Rid();
          rid.category = this.findCategoryAndSanitaze(row[3]);
          rid.date = row[2];
          rid.description = row[3];
          rid.amount = row[4];
          ridToSave.push(rid);
        }
      });
      console.log(ridToSave);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  private findCategoryAndSanitaze(description: string): Category {
    const descriptionMap = new Map<string, string>();
    descriptionMap.set('Delega f24', 'f24');
    descriptionMap.set('Bon sepa', null);
    descriptionMap.set('wursi srl', 'western union');
    descriptionMap.set('sisal group', 'superenalotto');
    descriptionMap.set('lottomatica holding', 'lotto');
    descriptionMap.set('regione veneto', 'bollo auto');
    descriptionMap.set('busitalia veneto', 'abbonamenti bus');
    descriptionMap.set('logista italia', 'tabacchi');
    descriptionMap.set('busitalia veneto', 'abbonamenti bus');
    descriptionMap.set('moneygram', 'moneygram');
    descriptionMap.set('lis ip s. P. A', 'lis ip s. P. A');

    let categoryFound: Category;
    descriptionMap.forEach((value: string, key: string) => {
      if (description.indexOf(key) !== -1) {
        if (value !== null) {
          categoryFound = this.categories.find(category => category.name === value);
        }
        return;
      }
    });
    return categoryFound;
  }
}
