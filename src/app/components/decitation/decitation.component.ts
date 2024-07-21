import {Component, inject} from '@angular/core';
import { DecitationService } from '../../services/decitation.service';
import {VictoryComponent} from "../victory/victory.component";

@Component({
  selector: 'app-decitation',
  standalone: true,
  imports: [VictoryComponent],
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
  decipherService = inject(DecitationService);

  alphabet : string[] = this.decipherService.alphabet.split('');
  cryptedCitationWords: string[] = this.decipherService.getCryptedCitation().split(' ');
  currWordIdx : number = 0;
  currLetterIdx : number = 0;
  correspondanceMap : Map<string, string> = new Map<string, string>();
  hasWon : boolean = false;

  onClick(event: Event, idxWord: number, idxLetter : number) {
    this.currWordIdx = idxWord;
    this.currLetterIdx = idxLetter;
  }

  deleteLetter() {
    this.correspondanceMap.delete(this.cryptedCitationWords[this.currWordIdx][this.currLetterIdx]);
    this.updateToPreviousIdx();
  }

  handleInput(event: KeyboardEvent) {
    const letter = event.key.toUpperCase();
    console.log('letter ', letter);

    if(!this.alphabet.includes(letter)) {
      return;
    }

    const currSelection : string = this.cryptedCitationWords[this.currWordIdx][this.currLetterIdx];
    this.correspondanceMap.set(currSelection, letter);

    //verifier si on a gagné
    if(this.decipherService.verify(this.correspondanceMap)) {
      console.log('You won!');
      this.hasWon = true;
      return;
    }

    //si la prochaine lettre n'en est pas une
    this.updateToNextIdx();
  }

  private updateToNextIdx() {
    let nextIdxW = this.currWordIdx;
    let nextIdxL = this.currLetterIdx + 1;
    while (nextIdxW < this.cryptedCitationWords.length) {
      while (nextIdxL < this.cryptedCitationWords[nextIdxW].length) {
        if (this.alphabet.includes(this.cryptedCitationWords[nextIdxW][nextIdxL])) {
          this.currWordIdx = nextIdxW;
          this.currLetterIdx = nextIdxL;
          return;
        }
        nextIdxL++;
      }
      nextIdxW++;
      nextIdxL = 0;
    }
    if(nextIdxW >= this.cryptedCitationWords.length) {
      this.currWordIdx = 0;
      this.currLetterIdx = 0;
    }
  }

  private updateToPreviousIdx() {
    let prvsIdxW :number = this.currWordIdx;
    let prvsIdxL :number = this.currLetterIdx - 1;
    while (prvsIdxW >= 0) {
      while (prvsIdxL >= 0) {
        if (this.alphabet.includes(this.cryptedCitationWords[prvsIdxW][prvsIdxL])) {
          this.currWordIdx = prvsIdxW;
          this.currLetterIdx = prvsIdxL;
          return;
        }
        prvsIdxL--;
      }
      prvsIdxW--;
      if(prvsIdxW >= 0) {
        prvsIdxL = this.cryptedCitationWords[prvsIdxW].length - 1;
      }
    }
    if(prvsIdxW < 0) {
      this.currWordIdx = this.cryptedCitationWords.length - 1;
      prvsIdxL = this.cryptedCitationWords[this.currWordIdx].length - 1;
      while (prvsIdxL >= 0 && !this.alphabet.includes(this.cryptedCitationWords[this.currWordIdx][prvsIdxL])) {
        prvsIdxL--;
      }
      this.currLetterIdx = prvsIdxL;
    }
  }
}
