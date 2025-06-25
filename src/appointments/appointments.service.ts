import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointments.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from '../common/enums/appointment-status.enum';
import { User } from '../users/users.entity';
import { Service } from '../services/service.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });

    if (!user || !service) {
      throw new NotFoundException('User or Service not found');
    }

    const appointment = this.appointmentRepo.create({
         date: new Date(dto.date),
         status: AppointmentStatus.BOOKED,
         user,
         service,
        });


    return this.appointmentRepo.save(appointment);
  }

  findAll() {
    return this.appointmentRepo.find({
      relations: ['user', 'service'],
    });
  }

  async updateStatus(id: number, status: AppointmentStatus) {
    const appointment = await this.appointmentRepo.findOne({ where: { id } });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.status = status;
    return this.appointmentRepo.save(appointment);
  }

  async cancel(id: number) {
    return this.updateStatus(id, AppointmentStatus.CANCELLED);
  }

  async complete(id: number) {
    return this.updateStatus(id, AppointmentStatus.COMPLETED);
  }
}
