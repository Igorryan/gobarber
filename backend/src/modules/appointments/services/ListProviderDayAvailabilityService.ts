import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string,
  month: number;
  year: number;
  day: number
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, year, month, day }: IRequest): Promise<IResponse> {

    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });


    const hourStart = 8;

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart);

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => getHours(appointment.date) === hour)

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    })

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
