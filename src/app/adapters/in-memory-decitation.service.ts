import {Injectable} from '@angular/core';
import removeAccent from 'remove-accents';
import {DecitationGateway} from "../ports/decitation.gateway";
import {Citation} from '../models/citation.model';
import dayjs from 'dayjs';
import {FIRST_DATE} from "../citations.stub";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDecitationService extends DecitationGateway {

  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  citations: Citation[];
  solutionMap = new Map<string, Map<string, string>>();
  shuffledAlphabet: string = this.shuffleAlphabet().join('');

  withCitations(citations: Citation[]): InMemoryDecitationService {
    this.citations = citations;
    return this;
  }

  constructor() {
    super();
  }

  override verify(correspondanceMap: Map<string, string>, date: Date): boolean {
    let dateKey = dayjs(date).format('YYYY-MM-DD');
    if (!this.solutionMap.has(dateKey)) {
      return false;
    }
    let solution = this.solutionMap.get(dateKey);
    if (solution === undefined || correspondanceMap.size !== solution.size) {
      return false;
    }
    for (let [key, value] of solution) {
      if (correspondanceMap.get(key) !== value) {
        return false;
      }
    }
    return true;
  }

  override hasCitationForDate(date: Date): boolean {
    if(dayjs(date).isBefore(dayjs(FIRST_DATE))) {
      return false;
    }
    if(dayjs(date).isAfter(dayjs())) {
      return false;
    }
    let idx = dayjs(FIRST_DATE).diff(dayjs(date), "day");
    return idx < this.citations.length;
  }

  override getCitationByDate(date: Date): [number, Citation] {
    if(dayjs(date).isBefore(dayjs(FIRST_DATE))) {
      throw new Error('Date too old, no data');
    }
    let idx = dayjs(date).diff(dayjs(FIRST_DATE), "day");
    if(idx >= this.citations.length) {
      throw new Error('Date too far in the future, no data');
    }
    let citation: Citation = this.citations[idx];

    return [idx, citation];
  }

  override getCryptedCitation(date: Date): string {
    let citation = this.getCitationByDate(date)[1];
    let citationNormalized = removeAccent(citation.citation).toUpperCase();
    let solutionMap = new Map<string, string>();
    let cryptedCitation = this.getCitationWithAlphabet(citationNormalized, this.shuffleAlphabet(), solutionMap);
    this.solutionMap.set(dayjs(date).format('YYYY-MM-DD'), solutionMap);
    return cryptedCitation;
  }

  private shuffleAlphabet(): Array<string> {
    return this.alphabet
      .split('')
      .sort(() => Math.random() - 0.5);
  }

  private getCitationWithAlphabet(citationNormalized: string, alphabet: Array<string>, solutionMap: Map<string, string>): string {
    let newCitation = '';
    for (let i = 0; i < citationNormalized.length; i++) {
      if (!this.alphabet.includes(citationNormalized[i])) {
        newCitation += citationNormalized[i];
        continue;
      }
      let letter = citationNormalized[i];
      let newLetter = alphabet[letter.charCodeAt(0) - 65];
      solutionMap.set(newLetter, letter);
      //console.log(letter, newLetter);
      newCitation += newLetter;
    }
    return newCitation;
  }
}
