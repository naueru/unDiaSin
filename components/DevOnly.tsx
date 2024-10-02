import { FC, PropsWithChildren } from "react";

const DevOnly: FC<PropsWithChildren> = ({ children }) => {
  return __DEV__ ? <>{children}</> : null;
};

export default DevOnly;
