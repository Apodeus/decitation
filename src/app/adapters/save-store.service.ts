import {Injectable} from '@angular/core';
import {Chrono} from "../components/chrono/chrono.component";

@Injectable({
  providedIn: 'root'
})
export class SaveStoreService {

  constructor() { }

  save(numero: number, save: Chrono) {
    localStorage.setItem(numero.toString(), JSON.stringify(save));
  }

  get(numero: number): Chrono | null {
    let save = localStorage.getItem(numero.toString());
    if (save === null) {
      return null;
    }
    return JSON.parse(save);
  }

  has(numero: number): boolean {
    return localStorage.getItem(numero.toString()) !== null;
  }

}
