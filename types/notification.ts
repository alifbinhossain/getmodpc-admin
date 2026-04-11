export type INotification = {
  id: string;
  title: string;
  message: string;
  app_id: string;
  is_read: boolean;
  version: string;
  created_at: string;
  updated_at: string;
};

export type INotificationResponse = {
  notifications: INotification[];
  totalUnreadCount: number;
};
