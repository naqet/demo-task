import { Injectable } from '@nestjs/common';
import { KlineData } from 'src/binance/binance';
import { Analysis } from './analyzer';

@Injectable()
export class AnalyzerService {
  analyzeKlinesData(klines: KlineData[]) {
    if (klines.length === 0) {
      throw new Error('Empty dataset');
    }

    const analysis: Analysis = {
      trend: 'BULLISH',
      low: Infinity,
      high: -Infinity,
    };

    for (const kline of klines) {
      if (kline.low < analysis.low) {
        analysis.low = kline.low;
      }

      if (kline.high > analysis.high) {
        analysis.high = kline.high;
      }
    }

    const first = klines.at(0)!;
    const last = klines.at(-1)!;

    if (first.close < last.close) {
      analysis.trend = 'BULLISH';
    } else if (first.close === last.close) {
      analysis.trend = 'STABLE';
    } else {
      analysis.trend = 'BEARISH';
    }

    return analysis;
  }
}
