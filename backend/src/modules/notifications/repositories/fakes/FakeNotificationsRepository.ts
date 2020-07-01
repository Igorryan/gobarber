import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import { ObjectID } from 'mongodb';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification>{
    const notification = new Notification();

    Object.assign(notification, {id: new ObjectID(), content, recipient_id});

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
