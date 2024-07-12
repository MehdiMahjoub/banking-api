import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [ConfigModule.forRoot(), FirebaseModule, OperationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
