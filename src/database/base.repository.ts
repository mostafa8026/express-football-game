import fs from 'fs';
import { DatabaseInterface } from './base.interface';
/** 
 * A base repository which simulates a database using json file 
 * T should have id property of type string
 */
export class BaseEntity<T extends DatabaseInterface> {
  private _data: T[] = [];
  private _folder = 'db';
  constructor(private fileName: string) {
    this.fileName += '.json';
    this.fileName = `${this._folder}/${this.fileName}`;
    this.initDatabase();
  }

  initDatabase() {
    if (!fs.existsSync(this._folder)) {
      fs.mkdirSync(this._folder);
    }
    if (!fs.existsSync(this.fileName)) {
      fs.writeFileSync(this.fileName, '[]');
    }
    this._data = this._getAllFromFile();
  }

  public get Data() {
    return this._data;
  }

  private _getAllFromFile(): T[] {
    const data = fs.readFileSync(this.fileName, { encoding: 'utf-8' });
    return JSON.parse(data);
  }

  private _saveToFile() {
    fs.writeFileSync(this.fileName, JSON.stringify(this._data));
  }

  private _generateRandomId() {
    /** generate random Ids like r2bY7C, S44B4f */
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array(6).fill('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  public add(item: T): T {
    if (item.id === undefined) item.id = this._generateRandomId();
    this._data.push(item);
    this._saveToFile();
    return item;
  }

  public update(item: T) {
    const index = this._data.findIndex((value) => value === item);
    if (index !== -1) {
      this._data[index] = item;
      this._saveToFile();
    }
  }

  public delete(item: T) {
    const index = this._data.findIndex((value) => value === item);
    if (index !== -1) {
      this._data.splice(index, 1);
      this._saveToFile();
    }
  }

  public deleteById(id: string) {
    const index = this._data.findIndex((value) => value.id === id);
    if (index !== -1) {
      this._data.splice(index, 1);
      this._saveToFile();
    }
  }

  public getById(id: string) {
    return this._data.find((value) => value.id === id);
  }

  public getAll() {
    return this._data;
  }

  public clear() {
    this._data = [];
    this._saveToFile();
  }

  public count() {
    return this._data.length;
  }

  public exists(item: T) {
    return this._data.includes(item);
  }

  public existsById(id: string) {
    return this._data.some((value) => value.id === id);
  }

  public find(predicate: (value: T, index: number, obj: T[]) => boolean) {
    return this._data.find(predicate);
  }

  public filter(predicate: (value: T, index: number, obj: T[]) => boolean) {
    return this._data.filter(predicate);
  }
}