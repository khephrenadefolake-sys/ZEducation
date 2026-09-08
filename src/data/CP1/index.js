// =========================================================
// ZEGBE CLUB EDUCATION
// CP1 - INDEX DES DONNÉES
// PNAPAS - CÔTE D'IVOIRE
// =========================================================

export { PROGRESSION_CP1 } from "./progressionCP1";
export { PRELECTURE_CP1 } from "./prelectureCP1";
export { LECTURE_ECRITURE_CP1 } from "./lectureEcritureCP1";
export { COMPREHENSION_CP1 } from "./comprehensionCP1";
export { EXPRESSION_ORALE_CP1 } from "./expressionOraleCP1";

export { MATHEMATIQUES_CP1 } from "./mathematiquesCP1";
export { NOMBRES_CP1 } from "./nombresCP1";
export { CALCUL_CP1 } from "./calculCP1";
export { PROBLEMES_CP1 } from "./problemesCP1";
export { GEOMETRIE_CP1 } from "./geometrieCP1";

export { EVALUATION_CP1 } from "./evaluationCP1";
export { EXERCICES_CP1 } from "./exercicesCP1";

// Export groupé pratique
import { PROGRESSION_CP1 } from "./progressionCP1";
import { PRELECTURE_CP1 } from "./prelectureCP1";
import { LECTURE_ECRITURE_CP1 } from "./lectureEcritureCP1";
import { COMPREHENSION_CP1 } from "./comprehensionCP1";
import { EXPRESSION_ORALE_CP1 } from "./expressionOraleCP1";

import { MATHEMATIQUES_CP1 } from "./mathematiquesCP1";
import { NOMBRES_CP1 } from "./nombresCP1";
import { CALCUL_CP1 } from "./calculCP1";
import { PROBLEMES_CP1 } from "./problemesCP1";
import { GEOMETRIE_CP1 } from "./geometrieCP1";

import { EVALUATION_CP1 } from "./evaluationCP1";
import { EXERCICES_CP1 } from "./exercicesCP1";

export const CP1 = {
  progression: PROGRESSION_CP1,
  prelecture: PRELECTURE_CP1,
  lectureEcriture: LECTURE_ECRITURE_CP1,
  comprehension: COMPREHENSION_CP1,
  expressionOrale: EXPRESSION_ORALE_CP1,

  mathematiques: MATHEMATIQUES_CP1,
  nombres: NOMBRES_CP1,
  calcul: CALCUL_CP1,
  problemes: PROBLEMES_CP1,
  geometrie: GEOMETRIE_CP1,

  evaluation: EVALUATION_CP1,
  exercices: EXERCICES_CP1,
};

export default CP1;