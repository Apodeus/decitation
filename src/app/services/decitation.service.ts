import { Injectable } from '@angular/core';
import removeAccent from 'remove-accents';

@Injectable({
  providedIn: 'root'
})
export class DecitationService {


  alphabet : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  citation : string = 'On ne naît pas femme, on le devient.';
  author : string = 'Simone de Beauvoir';
  //citation : string = 'On ne voit bien qu’avec le cœur. L’essentiel est invisible pour les yeux.';
  //author : string = 'Antoine de Saint-Exupéry';

  citationNormalized : string = removeAccent(this.citation).toUpperCase();
  solutionMap: Map<string, string> = new Map<string, string>();
  shuffledAlphabet : string = this.shuffleAlphabet().join('');

  constructor() {

  }

  //TODO 3: Ajouter un bandeau header pour un éventuel logo et des boutons de navigation.
  verify(correspondanceMap:Map<string,string>): boolean {
    if (correspondanceMap.size !== this.solutionMap.size) {
      return false;
    }
    for (let [key, value] of this.solutionMap) {
      if (correspondanceMap.get(key) !== value) {
        return false;
      }
    }
    return true;
  }

  getCryptedCitation() : string {
    return this.getCitationWithAlphabet(this.shuffledAlphabet.split(''));
  }

  private shuffleAlphabet() : Array<string> {
    return this.alphabet
      .split('')
      .sort(() => Math.random() - 0.5);
  }

  private getCitationWithAlphabet(alphabet : Array<string>) : string{
    let newCitation : string = '';
    for (let i = 0; i < this.citationNormalized.length; i++) {
      if (!this.alphabet.includes(this.citationNormalized[i])) {
        newCitation += this.citationNormalized[i];
        continue;
      }
      var letter = this.citationNormalized[i];
      var newLetter = alphabet[letter.charCodeAt(0) - 65];
      this.solutionMap.set(newLetter, letter);
      console.log(letter, newLetter);
      newCitation += newLetter;
    }
    return newCitation;
  }
}
