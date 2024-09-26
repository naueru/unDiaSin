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
  const { notifications } = useContext(ConfigurationContext);

  useEffect(() => {
    if (notifications) {
      scheduleNotification(language);
    } else {
      turnOffNotifications();
    }
  }, [language, notifications]);
  return <></>;
};

export default NotificationsHaddler;
