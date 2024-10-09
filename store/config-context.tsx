// Core
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useState } from "react";

// Constants
import { STORAGE_KEY_NOTIFICATIONS } from "../constants/constants";

export type TTimeObject = {
  hour: number;
  minutes: number;
  seconds: number;
};
export interface TConfigContext {
  notifications: boolean;
  setNotifications: Function;
  notificationsTime: TTimeObject;
  setNotificationsTime: Function;
}

export const ConfigurationContext = createContext<TConfigContext>({
  notifications: true,
  setNotifications: () => {},
  notificationsTime: {
    hour: 23,
    minutes: 30,
    seconds: 0,
  },
  setNotificationsTime: () => {},
});

const ConfigurationContextProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [notificationsTime, setNotificationsTime] = useState<TTimeObject>({
    hour: 23,
    minutes: 30,
    seconds: 0,
  });
  const asyncStorage = useAsyncStorage(STORAGE_KEY_NOTIFICATIONS);

  const value = {
    notifications,
    setNotifications: (payload: boolean) => {
      setNotifications(payload);
      asyncStorage.setItem(
        JSON.stringify({
          notifications: payload,
          notificationsTime,
        })
      );
    },
    notificationsTime,
    setNotificationsTime: (payload: TTimeObject) => {
      setNotificationsTime(payload);
      asyncStorage.setItem(
        JSON.stringify({
          notifications,
          notificationsTime: payload,
        })
      );
    },
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationContextProvider;
