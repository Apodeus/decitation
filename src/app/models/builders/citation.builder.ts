import {Citation} from "../citation.model";

export class CitationBuilder {
  protected citation: string;
  protected auteur: string;
  protected key: string;

  public withCitation(citation: string): CitationBuilder {
    this.citation = citation;
    return this;
  }

  public withAuteur(auteur: string): CitationBuilder {
    this.auteur = auteur;
    return this;
  }


  public build(): Citation {
    return {
      citation: this.citation,
      auteur: this.auteur,
      key: this.key
    };
  }
}
