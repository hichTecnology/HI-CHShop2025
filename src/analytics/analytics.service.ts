// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { join } from 'path';

@Injectable()
export class AnalyticsService {
  private analyticsDataClient;

  constructor() {
    const isRender = !!process.env.RENDER;
    const keyPath = isRender
    ? '/etc/secrets/google-analytics.json'
    : join(process.cwd(), 'config', 'google-analytics.json');

    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: 'https://www.googleapis.com/auth/analytics.readonly',
    });

    this.analyticsDataClient = google.analyticsdata({
      version: 'v1beta',
      auth,
    });
  }

  async getUserCount() {
    // Sostituisci con il tuo Property ID GA4 (formato: properties/XXXXXXXXX)
    const propertyId = 'properties/499387392';

    const res = await this.analyticsDataClient.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
      },
    });
    const visitors = res.data.rows?.[0]?.metricValues?.[0]?.value ?? '0';
    return Number(visitors);
  }
  async getProductViewsById(productId: string) {
    const propertyId = 'properties/499387392';
    const res = await this.analyticsDataClient.properties.runReport({
      property: propertyId,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'eventCount' }],
        dimensions: [{ name: 'eventName' }, { name: 'customEvent:product_id' }],
        dimensionFilter: {
          andGroup: {
            expressions: [
              {
                filter: {
                  fieldName: 'eventName',
                  stringFilter: { matchType: 'EXACT', value: 'view_product' },
                },
              },
              {
                filter: {
                  fieldName: 'customEvent:product_id',
                  stringFilter: { matchType: 'EXACT', value: productId },
                },
              },
            ],
          },
        },
      },
    });
  
    return Number(res.data.rows?.[0]?.metricValues?.[0]?.value ?? '0');
  }
  
}
