import { Module } from '@nestjs/common';
import { BinanceModule } from './binance/binance.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), BinanceModule, AnalyzerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
