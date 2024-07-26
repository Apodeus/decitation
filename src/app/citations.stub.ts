import {CitationBuilder} from "./models/builders/citation.builder";
import dayjs from 'dayjs';

const CITATION_0 = new CitationBuilder()
  .withCitation('On ne naît pas femme, on le devient.')
  .withAuteur('Simone de Beauvoir')
  .build();

const CITATION_1 = new CitationBuilder()
  .withCitation('La vie est un mystère qu\'il faut vivre, et non un problème à résoudre.')
  .withAuteur('Gandhi')
  .build();

const CITATION_2 = new CitationBuilder()
  .withCitation('Le plus grand risque est de ne prendre aucun risque.')
  .withAuteur('Mark Zuckerberg')
  .build();

const CITATION_3 = new CitationBuilder()
  .withCitation('Le succès c\'est d\'aller d\'échec en échec sans perdre son enthousiasme.')
  .withAuteur('Winston Churchill')
  .build();

const CITATION_4 = new CitationBuilder()
  .withCitation('La seule façon de faire du bon travail est d\'aimer ce que vous faites.')
  .withAuteur('Steve Jobs')
  .build();

const CITATION_5 = new CitationBuilder()
  .withCitation('On ne voit bien qu’avec le cœur. L’essentiel est invisible pour les yeux.')
  .withAuteur('Antoine de Saint-Exupéry')
  .build();

const CITATION_6 = new CitationBuilder()
  .withCitation('Le bonheur est parfois caché dans l\'inconnu.')
  .withAuteur('Victor Hugo')
  .build();

const CITATION_7 = new CitationBuilder()
  .withCitation('La vie est un mystère qu\'il faut vivre, et non un problème à résoudre.')
  .withAuteur('Gandhi')
  .build();

const CITATION_8 = new CitationBuilder()
  .withCitation('Le courage n\'est pas l\'absence de peur, mais la capacité de la vaincre.')
  .withAuteur('Nelson Mandela')
  .build();

const CITATION_9 = new CitationBuilder()
  .withCitation('La beauté est dans les yeux de celui qui regarde.')
  .withAuteur('Oscar Wilde')
  .build();

const CITATION_10 = new CitationBuilder()
  .withCitation('Le bonheur n\'est pas une destination, mais une façon de voyager.')
  .withAuteur('Margaret Lee Runbeck')
  .build();

const CITATION_11 = new CitationBuilder()
  .withCitation('Celui qui ne connaît pas l\'histoire est condamné à la revivre.')
  .withAuteur('Karl Marx')
  .build();

export const FIRST_DATE = dayjs('2024-07-18').startOf("day").toDate();
export const CITATIONS = [CITATION_0, CITATION_1, CITATION_2, CITATION_3, CITATION_4, CITATION_5, CITATION_6, CITATION_7, CITATION_8, CITATION_9, CITATION_10];
