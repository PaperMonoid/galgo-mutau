import Group from "../group/Group";
import Schedule from "../schedule/Schedule";
import { GeneticAlgorithm, Generation, Random } from "mutau";
import Evolution from "./Evolution";

function maximize(first: number, second: number) {
  return first - second;
}

function minimize(first: number, second: number) {
  return second - first;
}

function equals(first: Schedule, second: Schedule) {
  let size = Math.min(first.groups.length, second.groups.length);
  for (let i = 0; i < size; i++) {
    if (first.groups[i] != second.groups[i]) {
      return false;
    }
  }
  return true;
}

const random = new Random("foo");

export default class Algorithm {
  generation: Generation<Schedule>;

  constructor(groups: Group[]) {
    const evolution = new Evolution(
      random,
      groups,
      ["MAESTRO"],
      ["ADMON DE BASE DE DAT", "REDES D COMPUTADORAS"],
      1300,
      1900
    );
    const algorithm = new GeneticAlgorithm(
      evolution,
      [maximize, maximize, minimize, minimize, minimize],
      equals
    );
    console.log("Generating samples...");
    const initial = [];
    for (let i = 0; i < 100; i++) {
      try {
        const sample = evolution.randomizeSample();
        initial.push(sample);
      } catch (e) {
        console.log(e);
      }
    }
    console.log("Done generating samples!");
    this.generation = algorithm.optimize(initial, 10, 10, 10);
  }
}
