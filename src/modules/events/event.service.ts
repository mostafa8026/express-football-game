/** DI through getter, setter properties */

import { EventEntity } from "./event.entity";

export class EventService {
  private _eventEntity: EventEntity;

  constructor() {
  }

  public get eventEntity(): EventEntity {
    return this._eventEntity;
  }

  public set eventEntity(value: EventEntity) {
    this._eventEntity = value;
  }
}