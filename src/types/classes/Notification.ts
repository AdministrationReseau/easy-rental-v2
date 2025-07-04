import {NotificationType} from "@/types/enums/NotificationType";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationService {
  getNotification(id: string): Promise<Notification>;
  getUserNotifications(userId: string, includeRead?: boolean): Promise<Notification[]>;
  createNotification(notification: Partial<Notification>): Promise<Notification>;
  updateNotification(id: string, data: Partial<Notification>): Promise<Notification>;
  deleteNotification(id: string): Promise<boolean>;
  markAsRead(id: string): Promise<Notification>;
  markAsUnread(id: string): Promise<Notification>;
  markAllAsRead(userId: string): Promise<boolean>;
  countUnreadNotifications(userId: string): Promise<number>;
  sendNotification(userId: string, title: string, message: string, type: NotificationType, relatedEntityId?: string, relatedEntityType?: string): Promise<Notification>;
  sendBulkNotifications(userIds: string[], title: string, message: string, type: NotificationType, relatedEntityId?: string, relatedEntityType?: string): Promise<Notification[]>;
  cleanExpiredNotifications(): Promise<number>;
  getUserNotificationPreferences(userId: string): Promise<Record<string, unknown>>;
  updateUserNotificationPreferences(userId: string, preferences: Record<string, unknown>): Promise<Record<string, unknown>>;
}
