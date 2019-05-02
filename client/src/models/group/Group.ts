import Class from "./Class";

interface Days {
  [key: string]: Class;
}

type Group = Days & {
  key: string;
  name: string;
  credits: number;
  semester: number;
  teacher: string;
};

export default Group;
