// Core
import * as Notifications from "expo-notifications";

// Types
import { TTranslationsKeys } from "../models/translations";
import { TTimeObject } from "../store/config-context";

// Constants
import { DEFAULT_LANGUAGE } from "../constants/defaults";
import TRANSLATIONS from "../constants/translations";

export const scheduleNotification = (
  language: TTranslationsKeys = DEFAULT_LANGUAGE,
  time: TTimeObject
) => {
  const trigger = new Date().setHours(time.hour, time.minutes, time.seconds, 0);
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
