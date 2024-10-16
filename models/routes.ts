export type TROUTE =
  | "expendables"
  | "manageExpendable"
  | "config"
  | "expendablesOverview"
  | "expendableDetail";

export type TROUTES = {
  [key in TROUTE]: TROUTE;
};

export type TROUTE_DESTINATION = {
  route: TROUTE | null;
  params: {
    [key: string]: string | number;
  };
};

export type TROUTE_DESTINATION_GROUP = {
  left: TROUTE_DESTINATION;
  right: TROUTE_DESTINATION;
  self: TROUTE_DESTINATION;
};

export type TROUTE_DESTINATIONS = {
  [key in TROUTE]: TROUTE_DESTINATION_GROUP;
};
