export class Vat {
  _id: string;
  date: Date = new Date();
  amount: number = 0;
  sentXML: string;
  responseXML: string;
  responseCode: number;
}
