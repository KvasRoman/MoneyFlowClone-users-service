import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test_db',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Use only in development (drops and recreates tables)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
