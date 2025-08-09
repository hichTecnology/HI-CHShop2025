// src/analytics/analytics.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('visitors')
  async getVisitors() {
    const visitors = await this.analyticsService.getUserCount();
    return { visitors };
  }

  @Get('visitors/product/:productId')
  async getProductViewsById(@Param('productId') productId: string) {
    const productViews = await this.analyticsService.getProductViewsById(productId);
    return { productViews };
  }
 
}
