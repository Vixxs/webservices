import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import { config } from './config/typeorm';
import { AuthGuard } from './guard/auth.guard';
import { jwtConstants } from './guard/constants';
import { ReservationModule } from './reservation/reservation.module';
import { RoomModule } from './room/room.module';
import { SeanceModule } from './seance/seance.module';

@Module({
  imports: [
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    // BullModule.registerQueue({
    //   name: 'reservation',
    // }),
    TypeOrmModule.forRoot(config),
    CinemaModule,
    RoomModule,
    SeanceModule,
    ReservationModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport:
          'smtps://' +
          process.env.SMTP_EMAIL_SENDER +
          ':' +
          process.env.SMTP_PASSWORD +
          '@' +
          process.env.SMTP_HOST,
        defaults: {
          from: '"Zilton Réservation" <admin@zitlon.app>',
        },
        template: {
          dir: process.cwd() + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
