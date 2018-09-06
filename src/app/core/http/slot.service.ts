import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Slot } from '@app/slots';
import { SlotReport } from '@app/slots';

@Injectable()
export class SlotService {
  private slotUrl = '/api/slots'; // URL to web api

  constructor(private http: HttpClient) { }

  getAll(): Promise<Slot[]> {
    return this.http.get(this.slotUrl)
      .toPromise()
      .then(response => {
        return response as Slot[];
      })
      .catch(this.handleError);
  }

  getOne(id: string): Promise<Slot> {
    const url = `${this.slotUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Slot)
      .catch(this.handleError);
  }

  query(query: any = {}, sort: object = {}, limit: number = 100000000): Promise<Slot[]> {
    return this.http.post(this.slotUrl + '/query', { query: query, sort: sort, limit: limit })
      .toPromise()
      .then(response => response as Slot[])
      .catch(this.handleError);
  }

  create(slot: Slot): Promise<Slot> {
    return this.http.post(this.slotUrl, slot)
      .toPromise()
      .then(response => response as Slot)
      .catch(this.handleError);
  }

  update(id: string, updates: any): Promise<Slot> {
    if (updates.reports) { updates.reports = undefined; }
    const url = `${this.slotUrl}/${id}`;
    return this.http.patch(url, updates)
      .toPromise()
      .then(response => response as Slot)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.slotUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getReports(id: string): Promise<SlotReport[]> {
    const url = `${this.slotUrl}/${id}/reports`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response as SlotReport[];
      })
      .catch(this.handleError);
  }
  createReport(id: string, report: SlotReport): Promise<SlotReport> {
    const url = `${this.slotUrl}/${id}/reports`;
    return this.http.post(url, report)
      .toPromise()
      .then(response => response as SlotReport)
      .catch(this.handleError);
  }
  updateReport(id: string, report_id: string, updates: any): Promise<SlotReport> {
    const url = `${this.slotUrl}/${id}/reports/${report_id}`;
    return this.http.patch(url, updates)
      .toPromise()
      .then(response => response as SlotReport)
      .catch(this.handleError);
  }
  deleteReport(id: string, report_id: string): Promise<void> {
    const url = `${this.slotUrl}/${id}/reports/${report_id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  getReportsByDate(): Promise<any[]> {
    const url = `${this.slotUrl}/reportsByDate`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
