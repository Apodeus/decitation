import {Component, computed, effect, inject, input, ViewChild} from '@angular/core';
import {VictoryComponent} from "../victory/victory.component";
import {DaySelectorComponent} from "../day-selector/day-selector.component";
import {DecitationGateway} from "../../ports/decitation.gateway";
import dayjs from 'dayjs';
import {FIRST_DATE} from "../../citations.stub";
import {Router} from '@angular/router';
import {ChronoComponent} from "../chrono/chrono.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-decitation',
  standalone: true,
  imports: [VictoryComponent, DaySelectorComponent, ChronoComponent, AsyncPipe],
  templateUrl: './decitation.component.html',
  styleUrl: './decitation.component.css',
  host: {
    '(document:keypress)': 'handleInput($event)',
    '(window:keydown.Backspace)': 'deleteLetter()',
    '(window:keydown.ArrowRight)': 'updateToNextIdx()',
    '(window:keydown.ArrowLeft)': 'updateToPreviousIdx()',
  }
})
export class DecitationComponent {

  decipherService = inject(DecitationGateway);
  router = inject(Router);

  date = input(new Date(), {
    transform:  (date : string) => dayjs(date).startOf('day').toDate()
  });

  @ViewChild('chrono') chrono : ChronoComponent;

  alphabet : string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  correspondanceMap  = new Map<string, string>();
  hasWon = false;
  currWordIdx : number = 0;
  currLetterIdx : number = 0;
  cryptedCitationWords = computed(() => {
    if(!this.decipherService.hasCitationForDate(this.date())) {
      console.log('No data for this date');
      this.router.navigate([`/`, dayjs(FIRST_DATE).format('YYYY-MM-DD')]);
    }
    return this.decipherService.getCryptedCitation(this.date()).split(' ');
  });

  constructor() {
    effect(() => {
      this.cryptedCitationWords();
      this.currWordIdx = 0;
      this.currLetterIdx = 0;
      this.hasWon = true;
      this.correspondanceMap.clear();
      this.chrono.restart();
      this.chrono.start();
    });
  }

  onClick(event: Event, idxWord: number, idxLetter : number) {
    this.currWordIdx = idxWord;
    this.currLetterIdx = idxLetter;
  }

  deleteLetter() {
    this.correspondanceMap.delete(this.cryptedCitationWords()[this.currWordIdx][this.currLetterIdx]);
    this.updateToPreviousIdx();
  }

  handleInput(event: KeyboardEvent) {
    const letter = event.key.toUpperCase();

    if(!this.alphabet.includes(letter)) {
      return;
    }

    const currSelection : string = this.cryptedCitationWords()[this.currWordIdx][this.currLetterIdx];
    this.correspondanceMap.set(currSelection, letter);

    //verifier si on a gagné
    if(this.decipherService.verify(this.correspondanceMap, this.date())) {
      console.log('You won!');
      this.hasWon = true;
      this.chrono.stop();
      return;
    }

    //si la prochaine lettre n'en est pas une
    this.updateToNextIdx();
  }

  private updateToNextIdx() {
    let nextIdxW = this.currWordIdx;
    let nextIdxL = this.currLetterIdx + 1;
    while (nextIdxW < this.cryptedCitationWords().length) {
      while (nextIdxL < this.cryptedCitationWords()[nextIdxW].length) {
        if (this.alphabet.includes(this.cryptedCitationWords()[nextIdxW][nextIdxL])) {
          this.currWordIdx = nextIdxW;
          this.currLetterIdx = nextIdxL;
          return;
        }
        nextIdxL++;
      }
      nextIdxW++;
      nextIdxL = 0;
    }
    if(nextIdxW >= this.cryptedCitationWords().length) {
      this.currWordIdx = 0;
      this.currLetterIdx = 0;
    }
  }

  private updateToPreviousIdx() {
    let prvsIdxW :number = this.currWordIdx;
    let prvsIdxL :number = this.currLetterIdx - 1;
    while (prvsIdxW >= 0) {
      while (prvsIdxL >= 0) {
        if (this.alphabet.includes(this.cryptedCitationWords()[prvsIdxW][prvsIdxL])) {
          this.currWordIdx = prvsIdxW;
          this.currLetterIdx = prvsIdxL;
          return;
        }
        prvsIdxL--;
      }
      prvsIdxW--;
      if(prvsIdxW >= 0) {
        prvsIdxL = this.cryptedCitationWords()[prvsIdxW].length - 1;
      }
    }
    if(prvsIdxW < 0) {
      this.currWordIdx = this.cryptedCitationWords().length - 1;
      prvsIdxL = this.cryptedCitationWords()[this.currWordIdx].length - 1;
      while (prvsIdxL >= 0 && !this.alphabet.includes(this.cryptedCitationWords()[this.currWordIdx][prvsIdxL])) {
        prvsIdxL--;
      }
      this.currLetterIdx = prvsIdxL;
    }
  }
}
