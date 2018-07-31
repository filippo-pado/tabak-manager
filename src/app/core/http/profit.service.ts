import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class ProfitService {
  private profitsUrl = '/api/profits';

  constructor(private http: HttpClient) { }

  getProfits(monthsGroup: number = 1, group: string = 'profitGroup', year: number = (new Date()).getFullYear()): Promise<any> {
    let params = new HttpParams();
    params = params.append('months', '' + monthsGroup);
    params = params.append('group', group);
    params = params.append('year', '' + year);
    return this.http.get(this.profitsUrl + '/', { params: params })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }

}
