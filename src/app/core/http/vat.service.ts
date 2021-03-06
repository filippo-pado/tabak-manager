import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Vat } from '@app/vats';


@Injectable()
export class VatService {
  private vatsUrl = '/api/vats';

  constructor(private http: HttpClient) { }

  getAll(): Promise<Vat[]> {
    return this.http.get(this.vatsUrl)
      .toPromise()
      .then(response => response as Vat[])
      .catch(this.handleError);
  }

  getReport(year: number = (new Date()).getFullYear()): Promise<any[]> {
    let params = new HttpParams();
    params = params.append('year', '' + year);
    return this.http.get(this.vatsUrl + '/report', { params: params })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getOne(id: string): Promise<Vat> {
    const url = `${this.vatsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Vat)
      .catch(this.handleError);
  }

  create(vat: Vat): Promise<Vat> {
    return this.http.post(this.vatsUrl, vat)
      .toPromise()
      .then(response => response as Vat)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
