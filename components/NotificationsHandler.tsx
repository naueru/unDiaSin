// Core
import { useContext, useEffect } from "react";

// Context
import { TranslationsContext } from "../store/language-context";
import { ConfigurationContext } from "../store/config-context";

// Utils
import {
  scheduleNotification,
  turnOffNotifications,
} from "../utils/notifications";

const NotificationsHaddler = () => {
  const { language } = useContext(TranslationsContext);
  const { notifications, notificationsTime } = useContext(ConfigurationContext);

  useEffect(() => {
    if (notifications) {
      scheduleNotification(language, notificationsTime);
    } else {
      turnOffNotifications();
    }
  }, [language, notifications, notificationsTime]);
  return <></>;
};

export default NotificationsHaddler;
