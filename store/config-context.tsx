// Core
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useState } from "react";

// Constants
import { STORAGE_KEY_NOTIFICATIONS } from "../constants/constants";

export interface TConfigContext {
  notifications: boolean;
  setNotifications: Function;
}

export const ConfigurationContext = createContext<TConfigContext>({
  notifications: true,
  setNotifications: () => {},
});

const ConfigurationContextProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const asyncStorage = useAsyncStorage(STORAGE_KEY_NOTIFICATIONS);

  const value = {
    notifications,
    setNotifications: (payload: boolean) => {
      setNotifications(payload);
      asyncStorage.setItem(`${payload}`);
    },
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationContextProvider;
