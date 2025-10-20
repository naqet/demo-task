import { Controller, Get, Query } from '@nestjs/common';
import { Interval } from './binance/binance';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/analysis')
  async getAnalysis(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ) {
    return this.service.getAnalysis(
      symbol,
      interval as Interval,
      startTime,
      endTime,
    );
  }
}
