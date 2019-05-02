import Schedule from "../schedule/Schedule";
import Group from "../group/Group";

export default class ScheduleSample implements Schedule {
  groups: Group[];

  constructor(groups: Group[]) {
    this.groups = groups;
  }
}
