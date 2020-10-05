import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

export default class AppointmentController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //     const appointments = await appointmentsRepository.find();
  //  return response.status(200).json(appointments);
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }
}
