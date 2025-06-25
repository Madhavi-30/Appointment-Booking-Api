import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Service) private repo: Repository<Service>) {}

  create(dto: CreateServiceDto) {
    const service = this.repo.create(dto);
    return this.repo.save(service);
  }

  findAll() {
    return this.repo.find();
  }
}