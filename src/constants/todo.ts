import Tab from "../models/untils/tab";

export const TODO_LIST = "TODO_LIST";

export const TAB_ALL = "ALL";
export const TAB_COMPLETED = "TAB_COMPLETED";
export const TAB_UNCOMPLETED = "TAB_UNCOMPLETED";

export const TODO_TAB = [
  new Tab({ name: "All", id: TAB_ALL }),
  new Tab({ name: "Complete", id: TAB_COMPLETED }),
  new Tab({ name: "UnComplete", id: TAB_UNCOMPLETED }),
];
