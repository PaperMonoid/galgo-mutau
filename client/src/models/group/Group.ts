import Class from "./Class";

export default interface Group {
  key: string;
  name: string;
  credits: number;
  semester: number;
  monday: Class;
  tuesday: Class;
  wednesday: Class;
  thursday: Class;
  friday: Class;
  saturday: Class;
  sunday: Class;
  teacher: string;
}
