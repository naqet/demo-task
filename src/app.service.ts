import { Injectable } from '@nestjs/common';
import { BinanceService } from './binance/binance.service';
import { AnalyzerService } from './analyzer/analyzer.service';
import { Interval } from './binance/binance';

@Injectable()
export class AppService {
  constructor(
    private readonly binanceService: BinanceService,
    private readonly analyzerService: AnalyzerService,
  ) {}

  async getAnalysis(
    symbol: string,
    interval: Interval,
    startTime: number,
    endTime: number,
  ) {
    const data = await this.binanceService.getKlineData(
      symbol,
      interval,
      startTime,
      endTime,
    );

    const analysis = this.analyzerService.analyzeKlinesData(data);
    return analysis;
  }
}
