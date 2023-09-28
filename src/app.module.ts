import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from '@modules/example/example.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
	ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: '.env',
	  }),
    ExampleModule,
	SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
