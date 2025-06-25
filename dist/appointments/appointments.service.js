"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointments_entity_1 = require("./appointments.entity");
const appointment_status_enum_1 = require("../common/enums/appointment-status.enum");
const users_entity_1 = require("../users/users.entity");
const service_entity_1 = require("../services/service.entity");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentRepo, userRepo, serviceRepo) {
        this.appointmentRepo = appointmentRepo;
        this.userRepo = userRepo;
        this.serviceRepo = serviceRepo;
    }
    async create(dto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        const service = await this.serviceRepo.findOne({ where: { id: dto.serviceId } });
        if (!user || !service) {
            throw new common_1.NotFoundException('User or Service not found');
        }
        const appointment = this.appointmentRepo.create({
            date: new Date(dto.date),
            status: appointment_status_enum_1.AppointmentStatus.BOOKED,
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
    async updateStatus(id, status) {
        const appointment = await this.appointmentRepo.findOne({ where: { id } });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        appointment.status = status;
        return this.appointmentRepo.save(appointment);
    }
    async cancel(id) {
        return this.updateStatus(id, appointment_status_enum_1.AppointmentStatus.CANCELLED);
    }
    async complete(id) {
        return this.updateStatus(id, appointment_status_enum_1.AppointmentStatus.COMPLETED);
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointments_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentsService);
