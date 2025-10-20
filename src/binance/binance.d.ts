interface BinanceConfig {
  url: string;
}

interface KlineData {
    openTime: number,
    open: number,
    close: number,
    low: number,
    high: number
}

interface BinanceError {
  code: number;
  err: string;
}

const intervals = {
  second = '1s',
  minute = '1w',
  hour = '1h',
  day = '1d',
  week = '1w',
} as const;

export type Interval = (typeof intervals)[keyof typeof intervals];
