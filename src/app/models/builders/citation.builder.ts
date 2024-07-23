import {Citation} from "../citation.model";

export class CitationBuilder {
  protected numero: number;
  protected citation: string;
  protected auteur: string;
  protected Date: Date;
  protected key: string;

  public withNumero(numero: number): CitationBuilder {
    this.numero = numero;
    return this;
  }

  public withCitation(citation: string): CitationBuilder {
    this.citation = citation;
    return this;
  }

  public withAuteur(auteur: string): CitationBuilder {
    this.auteur = auteur;
    return this;
  }

  public withDate(date: Date): CitationBuilder {
    this.Date = date;
    return this
  }

  public build(): Citation {
    return {
      citation: this.citation,
      auteur: this.auteur,
      key: this.key
    };
  }
}
