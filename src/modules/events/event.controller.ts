/** Event Controller, get, post, put, delete */
import { Application, Router } from "express";
import { EventService } from "./event.service";

export class EventController {
  private _router: Router;
  private _eventService: EventService;

  constructor() {
    this._router = Router();
  }

  public set eventService(value: EventService) {
    this._eventService = value;
  }

  public initRouter(app: Application, path: string) {
    this._router.get('/', (_, res) => {
      res.render('index', {
        title: 'Events',
        header: 'Events',
        body: 'events/index',
        events: this._eventService.eventEntity.Data
      });
    });

    this._router.get('/all', (_, res) => {
      res.send(this._eventService.eventEntity.Data);
    });

    this._router.get(':id', (req, res) => {
      const { id } = req.params;
      const event = this._eventService.eventEntity.Data.find((value) => value.id === id);
      if (event) {
        res.send(event);
      } else {
        res.status(404);
      }
    });

    /**\
     * curl -X POST -H "Content-Type: application/json" -d '{"name":"New Event","description":"New Event Description","date":"2021-01-01"}' http://localhost:3000/events
     */
    this._router.post('', (req, res) => {
      const { name, description, date } = req.body;
      const event = this._eventService.eventEntity.add({
        name,
        description,
        date
      });
      res.send(event);
    });

    this._router.put(':id', (req, res) => {
      const { id } = req.params;
      const { name, description, date } = req.body;
      const event = this._eventService.eventEntity.Data.find((value) => value.id === id);
      if (event) {
        event.name = name;
        event.description = description;
        event.date = date;
        this._eventService.eventEntity.update(event);
      } else {
        res.status(404);
      }
      res.send(event);
    });

    this._router.delete(':id', (req, res) => {
      const { id } = req.params;
      const event = this._eventService.eventEntity.Data.find((value) => value.id === id);
      if (event) {
        this._eventService.eventEntity.delete(event);
      } else {
        res.status(404);
      }
      res.send(event);
    });

    app.use(path, this._router);
  }
}