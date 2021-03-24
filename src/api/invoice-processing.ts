import axios from 'axios';
import { EntitiesResult } from '../models/EntitiesResult';

export default async function analyzeInvoiceEntities(
  invoiceText: string,
): Promise<EntitiesResult[]> {
  const response = await axios.post<EntitiesResult[]>(
    'http://192.168.0.103:7000/entity-extraction',
    {
      invoiceText,
    },
  );

  return response?.data || {};
}
