// Core
import * as Notifications from "expo-notifications";

// Types
import { TTranslationsKeys } from "../models/translations";

// Constants
import TRANSLATIONS from "../constants/translations";
import { DEFAULT_LANGUAGE } from "../constants/defaults";

export const scheduleNotification = (
  language: TTranslationsKeys = DEFAULT_LANGUAGE
) => {
  const trigger = new Date().setHours(23, 50, 0, 0);
  Notifications.scheduleNotificationAsync({
    identifier: "daily",
    content: {
      title: TRANSLATIONS[language].NOTIFICATION_DAILY_TITLE,
      body: TRANSLATIONS[language].NOTIFICATION_DAILY_BODY,
    },
    trigger,
  });
};

export const turnOffNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};
