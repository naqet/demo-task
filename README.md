# Demo Binance analysis tool

## Running the app

- Clone the repo
- Set BINANCE_API_URL env variable inside .env file
  - Example: https://api.binance.com/api/v3/

- Run

```sh
npm i
```

- Run

```sh
npm run dev
```

- Use tool like curl to use this API with /analysis endpoint. Example:

```sh
curl "http://localhost:3000/analysis?symbol=BTCUSDT&interval=1w&startTime=1750818400000&endTime=1760918500000"
```

## Endpoints

/analysis

Params:

- symbol:
  - Symbol of cryptocurrency
  - type: string
  - required: true
- interval:
  - Interval of each data point to perform analysis on (1 second, 1 week)
  - type: enum
  - values:
    - 1s
    - 1m
    - 1h
    - 1w
  - required: true
- startTime:
  - Start time of
  - Timestamp in ms to get aggregate trades from INCLUSIVE.
  - type: number
  - required: true
- endTime:
  - Timestamp in ms to get aggregate trades until INCLUSIVE.
  - type: number
  - required: true

## Testing

```sh
npm run test
```

## Things to improve

- I completely forgot about committing once every 10 minutes. In normal job I usually
  do that, but now I focused too much on speed.
- Analysis is basic with simple information, so this could be more advanced
- Complete unit testing for all parts of code e.g controllers
- Add swagger to make documentation more robust
