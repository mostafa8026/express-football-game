import { DatabaseInterface } from "../../database/base.interface";

export interface EventInterface extends DatabaseInterface {
  id?: string;
  name: string;
  description: string;
  date: Date;
}