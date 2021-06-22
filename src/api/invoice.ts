import axios from 'axios';
import { EntitiesResult } from '../models/EntitiesResult';
import { InvoiceData } from '../models/InvoiceData';

export async function analyzeInvoiceEntities(
  invoiceText: string,
): Promise<EntitiesResult[]> {
  try {
    const response = await axios.post<Array<EntitiesResult>>(
      'http://192.168.0.102:7000/entity-extraction',
      {
        invoiceText,
      },
    );
    return response?.data || {};
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAllInvoices(
  token: string,
): Promise<Array<InvoiceData>> {
  try {
    const response = await axios.get<Array<InvoiceData>>(
      'http://192.168.0.102:7000/invoice',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response?.data || [];
  } catch (error) {
    console.log('error : ', error);
    throw error.response?.data;
  }
}
