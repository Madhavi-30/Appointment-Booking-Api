import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Service } from '../services/service.entity';
import { AppointmentStatus } from '../common/enums/appointment-status.enum';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' }) // ✅ This is the correct type for Date
  date: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.BOOKED,
  })
  status: AppointmentStatus;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;
}
