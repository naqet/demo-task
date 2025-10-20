import { Test, TestingModule } from '@nestjs/testing';
import { BinanceService } from './binance.service';
import { ConfigModule } from '@nestjs/config';

describe('BinanceService', () => {
  let service: BinanceService;

  beforeEach(async () => {
    process.env.BINANCE_API_URL = 'http://test.com/api/';
    global.fetch = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<BinanceService>(BinanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getKlineData', () => {
    it('should return kline data from request', async () => {
      const startTime = new Date('01-01-2023').getTime();
      const endTime = new Date('01-02-2023').getTime();

      const mockResponse = [[100, '10.00', '20.00', '30.00', '40.00']];

      const expectedResult = [
        {
          close: 40,
          high: 20,
          low: 30,
          open: 10,
          openTime: 100,
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await service.getKlineData(
        'BTCUSDT',
        '1w',
        startTime,
        endTime,
      );

      expect(global.fetch).toHaveBeenCalledWith(
        'http://test.com/api/klines?symbol=BTCUSDT&interval=1w&startTime=1672527600000&endTime=1672614000000',
        { headers: { 'Content-Type': 'application/json' }, method: 'GET' },
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
