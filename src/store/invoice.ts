import { createContext } from 'react';
import { action, makeObservable, observable } from 'mobx';
import { getAllInvoices } from '../api/invoice';
import { InvoiceData } from '../models/InvoiceData';

export class InvoiceStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  invoices: Array<InvoiceData> = [];

  @action
  public async getAllInvoice(token: string): Promise<void> {
    try {
      const result = await getAllInvoices(token);
      if (this.invoices.length) {
        this.invoices = [...this.invoices, ...result];
      } else {
        this.invoices = result;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default createContext(new InvoiceStore());
