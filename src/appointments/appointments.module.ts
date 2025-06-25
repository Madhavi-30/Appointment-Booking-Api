import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointments.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { User } from '../users/users.entity';
import { Service } from '../services/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Service])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
