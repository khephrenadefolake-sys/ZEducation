// =========================================================
// Z.ÉDUCATION
// DONNÉES DES MATIÈRES ET RUBRIQUES
// =========================================================

// =========================================================
// MATIÈRES CP1 / CP2
// =========================================================

export const MATIERES_CP = [
  {
    id: "francais",
    nom: "Français",
    icon: "📖",
    description:
      "Lecture, écriture, vocabulaire, grammaire et expression.",
  },
  {
    id: "mathematiques",
    nom: "Mathématiques",
    icon: "🔢",
    description:
      "Nombres, calcul, problèmes, géométrie et mesures.",
  },
];

export const MATIERES_CP1 = MATIERES_CP;
export const MATIERES_CP2 = MATIERES_CP;

// =========================================================
// MATIÈRES CE1 / CE2 / CM1 / CM2
// =========================================================

export const MATIERES_CE_CM = [
  {
    id: "francais",
    nom: "Français",
    icon: "📖",
    description: "Français et expression.",
  },
  {
    id: "mathematiques",
    nom: "Mathématiques",
    icon: "🔢",
    description:
      "Nombres, calcul, problèmes, géométrie et mesures.",
  },
  {
    id: "histoire_geographie",
    nom: "Histoire et Géographie",
    icon: "🗺️",
    description: "Histoire et géographie.",
  },
  {
    id: "sciences",
    nom: "Sciences et Technologies",
    icon: "🔬",
    description: "Sciences et technologies.",
  },
  {
    id: "anglais",
    nom: "Anglais",
    icon: "🇬🇧",
    description: "Initiation à l'anglais.",
  },
];

// =========================================================
// RUBRIQUES FRANÇAIS CP1 / CP2
// =========================================================

export const RUBRIQUES_CP = [
  {
    id: "lecture",
    nom: "Lecture",
    icon: "📖",
  },
  {
    id: "ecriture",
    nom: "Écriture",
    icon: "✍️",
  },
  {
    id: "vocabulaire",
    nom: "Vocabulaire",
    icon: "🔤",
  },
  {
    id: "grammaire",
    nom: "Grammaire",
    icon: "📝",
  },
  {
    id: "expression",
    nom: "Expression",
    icon: "💬",
  },
];

// =========================================================
// RUBRIQUES FRANÇAIS CE1 / CE2 / CM1 / CM2
// =========================================================

export const RUBRIQUES_CE_CM = [
  {
    id: "lecture",
    nom: "Lecture",
    icon: "📖",
  },
  {
    id: "ecriture",
    nom: "Écriture",
    icon: "✍️",
  },
  {
    id: "vocabulaire",
    nom: "Vocabulaire",
    icon: "🔤",
  },
  {
    id: "grammaire",
    nom: "Grammaire",
    icon: "📝",
  },
  {
    id: "conjugaison",
    nom: "Conjugaison",
    icon: "🔄",
  },
  {
    id: "orthographe",
    nom: "Orthographe",
    icon: "✅",
  },
  {
    id: "expression",
    nom: "Expression écrite",
    icon: "💬",
  },
];

// =========================================================
// EXPORT PAR DÉFAUT
// =========================================================

export default {
  MATIERES_CP,
  MATIERES_CP1,
  MATIERES_CP2,
  MATIERES_CE_CM,
  RUBRIQUES_CP,
  RUBRIQUES_CE_CM,
};