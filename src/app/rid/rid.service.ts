import { Injectable } from '@angular/core'; 
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Rid } from '../shared/rid'; 
 
import 'rxjs/add/operator/toPromise'; 
 
@Injectable() 
export class RidService { 
  private headers = new Headers({ 'Content-Type': 'application/json' }); 
  private ridsUrl = '/api/rids'; // URL to web api 
 
  constructor(private http: HttpClient) { } 
  
  getRids(params={}): Promise < Rid[] > {    
    return this.http.get(this.ridsUrl, {params: params}) 
      .toPromise() 
      .then(response => { 
        return response as Rid[] 
      }) 
      .catch(this.handleError);     
  };
   
  private handleError(error: any): Promise < any > { 
    console.error('An error occurred', error); 
    return Promise.reject(error); 
  }; 
} 