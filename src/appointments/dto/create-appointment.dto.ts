import { IsDateString, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString() 
  date: string;

  @IsInt()
  userId: number;

  @IsInt()
  serviceId: number;
}
