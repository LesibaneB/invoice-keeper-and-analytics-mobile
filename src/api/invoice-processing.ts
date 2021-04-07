import axios from 'axios';
import {EntitiesResult} from '../models/EntitiesResult';

export default async function analyzeInvoiceEntities(
  invoiceText: string,
): Promise<EntitiesResult[]> {
  try {
    const response = await axios.post<EntitiesResult[]>(
      'http://192.168.0.101:7000/entity-extraction',
      {
        invoiceText,
      },
    );
    return response?.data || {};
  } catch (error) {
    throw error.response.data;
  }
}
