import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BinanceConfig, BinanceError, Interval, KlineData } from './binance';

@Injectable()
export class BinanceService {
  private readonly logger = new Logger(BinanceService.name);
  private config: BinanceConfig;

  constructor(configService: ConfigService) {
    const url = configService.get<string>('BINANCE_API_URL');

    if (!url) {
      throw Error('BINANCE_API_URL env is not set');
    }
    this.config = { url };
  }

  async request<T>(
    endpoint: string,
    params: Record<string, string>,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  ): Promise<T> {
    try {
      const url = new URL(endpoint, this.config.url);

      const searchParams = new URLSearchParams(params);
      url.search = searchParams.toString();

      const res = await fetch(url.toString(), {
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      });

      // I don't want to spent too much time on error handling, so this could be improved
      if (!res.ok) {
        if (res.status >= 500) {
          const reason = await res.text().catch(() => 'Internal Binance Error');
          this.logger.log('Binance internal API error', reason);
          throw new InternalServerErrorException();
        }

        // Binance has error structure defined in docs
        const reason: BinanceError = await res
          .json()
          .catch(() => ({ code: 500, err: 'Strange error' }));

        // Generic 4** error handler, could be improved
        this.logger.log(
          `Binance API call failed with status ${res.status}. Code: ${reason.code}. Reason: ${reason.err}`,
        );
        throw new BadRequestException();
      }

      return await res.json();
    } catch (error) {
      if (error instanceof Error) {
        this.logger.log(
          `Binance API call failed: ${error.message}`,
          error.stack,
        );
      }

      throw error;
    }
  }

  async getKlineData(
    symbol: string,
    interval: Interval,
    startTime: number,
    endTime: number,
  ) {
    const data = await this.request<[Array<number | string>]>(
      'klines',
      {
        symbol,
        interval,
        startTime: String(startTime),
        endTime: String(endTime),
      },
      'GET',
    );

    const klines: KlineData[] = [];

    for (const kline of data) {
      if (kline.length < 3) {
        this.logger.log('Kline data malformed');
        continue;
      }

      const time = kline.at(0)!;
      const open = kline.at(1)!;
      const high = kline.at(2)!;
      const low = kline.at(3)!;
      const close = kline.at(4)!;

      klines.push({
        openTime: +time,
        open: +open,
        close: +close,
        low: +low,
        high: +high,
      });
    }

    return klines;
  }
}
