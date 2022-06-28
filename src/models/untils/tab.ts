export interface ITab {
  name: string;
  id: string;
}

class Tab {
  name: string;
  id: string;
  constructor(tab: ITab) {
    this.name = tab.name;
    this.id = tab.name;
  }
}

export default Tab;
