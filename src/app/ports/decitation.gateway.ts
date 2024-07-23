import {Citation} from "../models/citation.model";

export abstract class DecitationGateway {
  abstract getCitationByDate(date: Date) : [number, Citation]
  abstract hasCitationForDate(date: Date) : boolean;
  abstract getCryptedCitation(date: Date) : string;
  abstract verify(correspondanceMap : Map<string,string>, date:Date): boolean;
}
