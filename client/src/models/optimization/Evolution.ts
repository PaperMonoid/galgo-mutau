import Group from "../group/Group";
import Schedule from "../schedule/Schedule";
import { Random, IEvolution } from "mutau";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

export default class Evolution implements IEvolution<Schedule> {
  random: Random;
  allGroups: Group[];
  subjects: string[];
  teachers: string[];
  firstHour: number;
  lastHour: number;

  constructor(
    random: Random,
    allGroups: Group[],
    subjects: string[],
    teachers: string[],
    firstHour: number,
    lastHour: number
  ) {
    this.random = random;
    this.allGroups = allGroups;
    this.subjects = subjects;
    this.teachers = teachers;
    this.firstHour = firstHour;
    this.lastHour = lastHour;
  }

  getRandom(): Random {
    return this.random;
  }

  setRandom(random: Random): Evolution {
    return new Evolution(
      random,
      this.allGroups,
      this.subjects,
      this.teachers,
      this.firstHour,
      this.lastHour
    );
  }

  fitness(schedule: Schedule): number[] {
    let subjects = (schedule.groups && schedule.groups.length) || 0;
    let teachers = 0;
    let freeHours = 0;
    let previous = null;
    for (let group of schedule.groups) {
      if (this.subjects.indexOf(group.name) > 0) {
        subjects++;
      }
      if (this.teachers.indexOf(group.teacher) > 0) {
        teachers++;
      }
      if (previous != null) {
        for (let day of days) {
          if (previous[day] && group[day]) {
            freeHours += previous[day]["to"] - group[day]["from"];
          }
        }
      }
      previous = group;
    }
    let firstHour = 0;
    let lastHour = 0;
    if (schedule.groups.length > 0) {
      let hour = 0;
      hour = schedule.groups[0][days[0]]["from"];
      firstHour = Math.abs(this.firstHour - hour);
      hour = schedule.groups[schedule.groups.length - 1][days[0]]["to"];
      lastHour = Math.abs(this.lastHour - hour);
    }
    return [subjects, teachers, freeHours, firstHour, lastHour];
  }

  isValid(groups: Group[]) {
    let previous = null;
    for (let group of groups) {
      let count = 0;
      for (let _group of groups) {
        if (group.name == _group.name) {
          count++;
        }
      }
      if (count > 1) {
        return false;
      }
    }
    for (let group of groups) {
      if (previous != null) {
        for (let day of days) {
          if (
            previous[day] &&
            previous[day]["from"] &&
            previous[day]["to"] &&
            group[day] &&
            group[day]["from"] &&
            group[day]["to"] &&
            (previous[day]["from"] >= group[day]["from"] ||
              previous[day]["to"] > group[day]["from"])
          ) {
            return false;
          }
        }
      }
      previous = group;
    }
    return true;
  }

  randomizeSample(): Schedule {
    let groups: Group[] = [];
    let [x] = this.random;
    while (x < 0.7) {
      let [i] = this.random;
      i = Math.floor(i * this.allGroups.length);
      for (; i < this.allGroups.length; i++) {
        const _groups = groups.concat([this.allGroups[i]]);
        _groups.sort(function(first: Group, second: Group): number {
          return first["monday"]["from"] - second["monday"]["from"];
        });
        if (this.isValid(_groups)) {
          groups = _groups;
          break;
        }
      }
      [x] = this.random;
    }
    return { groups: groups };
  }

  crossover(first: Schedule, second: Schedule): Schedule {
    let groups: Group[] = [];
    let size = Math.min(first.groups.length, second.groups.length);
    for (let i = 0; i < size; i++) {
      let [x] = this.random;
      if (x < 0.5) {
        const _groups = groups.concat([first.groups[i]]);
        _groups.sort(function(first: Group, second: Group): number {
          return first["monday"]["from"] - second["monday"]["from"];
        });
        if (this.isValid(_groups)) {
          groups = _groups;
        }
      } else {
        const _groups = groups.concat([second.groups[i]]);
        _groups.sort(function(first: Group, second: Group): number {
          return first["monday"]["from"] - second["monday"]["from"];
        });
        if (this.isValid(_groups)) {
          groups = _groups;
        }
      }
    }
    return { groups: groups };
  }

  mutate(sample: Schedule): Schedule {
    let groups: Group[] = [];
    let [x] = this.random;
    for (let group of sample.groups) {
      if (x < 0.7) {
        groups.push(group);
      }
      [x] = this.random;
    }
    while (x < 0.7) {
      let [i] = this.random;
      i = Math.floor(i * this.allGroups.length);
      for (i; i < this.allGroups.length; i++) {
        const _groups = groups.concat([this.allGroups[i]]);
        _groups.sort(function(first: Group, second: Group): number {
          return first["monday"]["from"] - second["monday"]["from"];
        });
        if (this.isValid(_groups)) {
          groups = _groups;
          break;
        }
      }
      [x] = this.random;
    }
    return { groups: groups };
  }
}
