import {Component} from '@angular/core';
import {BehaviorSubject, map, Observable, Subscription, tap, timer} from "rxjs";
import {AsyncPipe, DecimalPipe, JsonPipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";

export interface Chrono {
  seconde: number;
  minute: number;
  heure: number;
}

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [
    DecimalPipe,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css'
})
export class ChronoComponent {

  timer$ = new BehaviorSubject<number>(0)
  timerSubscription: Subscription = new Subscription();
  chrono$= this.createChrono();
  chronoSignal = toSignal(this.chrono$, {initialValue: {seconde: 0, minute: 0, heure: 0}});
  isStopped = true;

  constructor() {
    this.initTimerSubscription();
  }


  start() {
    if(!this.isStopped) {
      return;
    }
    this.initTimerSubscription();
    this.isStopped = false;
  }

  private initTimerSubscription() {
    this.timerSubscription = timer(0, 1000)
      .pipe(
        map(t => t),
        tap(t => console.log(t))
      )
      .subscribe(this.timer$);
  }

  stop() {
    this.timerSubscription.unsubscribe();
    this.isStopped = true;
  }

  restart() {
    this.stop();
    this.timer$.next(0);
  }

  createChrono(): Observable<Chrono> {
  return this.timer$.pipe(
    map((seconds: number): Chrono => ({
      seconde: seconds % 60,
      minute: Math.floor(seconds / 60),
      heure: Math.floor(seconds / 3600)
    }))
  );
}
}
