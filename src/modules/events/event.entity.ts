import { BaseEntity } from "../../database/base.repository";
import { EventInterface } from "./event.interface";

export class EventEntity extends BaseEntity<EventInterface> {
  constructor() {
    super('events');
  }
}