import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerService } from './analyzer.service';
import { Analysis } from './analyzer';

describe('AnalyzerService', () => {
  let service: AnalyzerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyzerService],
    }).compile();

    service = module.get<AnalyzerService>(AnalyzerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzeKlinesData', () => {
    it('should throw Error when data is empty', () => {
      // Nevermind, I don't have time to remember about this... Silly mistake!
      expect(() => service.analyzeKlinesData([])).toThrow(Error);
    });

    it('should return bullish trend', () => {
      const expectedResult: Analysis = {
        high: 50,
        low: 30,
        trend: 'BULLISH',
      };
      const data = [
        {
          close: 40,
          high: 20,
          low: 30,
          open: 10,
          openTime: 100,
        },
        {
          close: 100,
          high: 50,
          low: 30,
          open: 10,
          openTime: 1000,
        },
      ];
      const result = service.analyzeKlinesData(data);

      expect(result).toEqual(expectedResult);
    });

    it('should return bearish trend', () => {
      const expectedResult:Analysis = {
        high: 50,
        low: 30,
        trend: 'BEARISH',
      };
      const data = [
        {
          close: 40,
          high: 20,
          low: 30,
          open: 10,
          openTime: 100,
        },
        {
          close: 30,
          high: 50,
          low: 30,
          open: 10,
          openTime: 1000,
        },
      ];
      const result = service.analyzeKlinesData(data);

      expect(result).toEqual(expectedResult);
    });

    it('should return stable trend', () => {
      const expectedResult = {
        high: 50,
        low: 30,
        trend: 'STABLE',
      };
      const data = [
        {
          close: 40,
          high: 20,
          low: 30,
          open: 10,
          openTime: 100,
        },
        {
          close: 40,
          high: 50,
          low: 30,
          open: 10,
          openTime: 1000,
        },
      ];
      const result = service.analyzeKlinesData(data);

      expect(result).toEqual(expectedResult);
    });
  });
});
