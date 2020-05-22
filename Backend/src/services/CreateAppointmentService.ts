import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface DataRequest {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: DataRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentData = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentData,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Date already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentData,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
