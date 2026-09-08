// =========================================================
// ZEGBE CLUB EDUCATION
// CP1 - ÉVALUATION
// PNAPAS - CÔTE D'IVOIRE
// =========================================================

export const EVALUATION_CP1 = {
  niveau: "CP1",
  programme: "PNAPAS",

  principes: [
    "Évaluation diagnostique",
    "Évaluation formative",
    "Évaluation sommative",
    "Remédiation et soutien"
  ],

  lecture_ecriture: {
    domaine: "Lecture-Écriture",
    competences: [
      {
        id: "eval_le_01",
        nom: "Conscience phonologique",
        indicateurs: [
          "Identifier un son entendu.",
          "Distinguer des sons.",
          "Repérer un son dans un mot.",
          "Manipuler progressivement les unités sonores."
        ]
      },
      {
        id: "eval_le_02",
        nom: "Principe alphabétique",
        indicateurs: [
          "Reconnaître les lettres étudiées.",
          "Associer progressivement lettres et sons.",
          "Associer progressivement sons et lettres."
        ]
      },
      {
        id: "eval_le_03",
        nom: "Lecture",
        indicateurs: [
          "Lire les syllabes étudiées.",
          "Lire des mots décodables.",
          "Lire des phrases simples.",
          "Lire progressivement de courts textes adaptés."
        ]
      },
      {
        id: "eval_le_04",
        nom: "Écriture",
        indicateurs: [
          "Tracer correctement les lettres étudiées.",
          "Écrire des syllabes.",
          "Écrire des mots étudiés.",
          "Écrire des phrases simples."
        ]
      },
      {
        id: "eval_le_05",
        nom: "Compréhension",
        indicateurs: [
          "Comprendre une consigne simple.",
          "Comprendre une phrase.",
          "Identifier une information explicite.",
          "Répondre à une question simple."
        ]
      },
      {
        id: "eval_le_06",
        nom: "Vocabulaire",
        indicateurs: [
          "Comprendre les mots étudiés.",
          "Associer un mot à son sens.",
          "Réutiliser les mots appris."
        ]
      }
    ]
  },

  mathematiques: {
    domaine: "Mathématiques",
    competences: [
      {
        id: "eval_math_01",
        nom: "Structuration du milieu",
        indicateurs: [
          "Se repérer dans l'espace.",
          "Identifier une position.",
          "Exécuter une consigne spatiale."
        ]
      },
      {
        id: "eval_math_02",
        nom: "Activités pré-numériques",
        indicateurs: [
          "Trier des objets.",
          "Classer des éléments.",
          "Comparer des collections.",
          "Ranger selon un critère."
        ]
      },
      {
        id: "eval_math_03",
        nom: "Nombres",
        indicateurs: [
          "Dénombrer une collection.",
          "Reconnaître les nombres étudiés.",
          "Lire les nombres étudiés.",
          "Écrire les nombres étudiés.",
          "Comparer des quantités.",
          "Compléter une suite numérique."
        ]
      },
      {
        id: "eval_math_04",
        nom: "Calcul",
        indicateurs: [
          "Composer et décomposer des quantités.",
          "Effectuer des additions simples.",
          "Effectuer des soustractions simples.",
          "Calculer mentalement de petites quantités."
        ]
      },
      {
        id: "eval_math_05",
        nom: "Résolution de problèmes",
        indicateurs: [
          "Comprendre une situation.",
          "Identifier ce qui est demandé.",
          "Choisir une stratégie.",
          "Effectuer le calcul nécessaire.",
          "Formuler une réponse."
        ]
      },
      {
        id: "eval_math_06",
        nom: "Géométrie",
        indicateurs: [
          "Se repérer dans l'espace.",
          "Reconnaître des lignes.",
          "Reconnaître des formes.",
          "Reproduire une forme simple."
        ]
      }
    ]
  },

  niveaux_maitrise: [
    {
      niveau: 1,
      nom: "Non acquis",
      description:
        "La compétence n'est pas encore maîtrisée."
    },
    {
      niveau: 2,
      nom: "En cours d'acquisition",
      description:
        "La compétence est partiellement maîtrisée."
    },
    {
      niveau: 3,
      nom: "Acquis",
      description:
        "La compétence est maîtrisée dans les situations étudiées."
    },
    {
      niveau: 4,
      nom: "Très bien acquis",
      description:
        "La compétence est maîtrisée avec autonomie."
    }
  ],

  remediations: [
    {
      id: "remediation_01",
      titre: "Soutien individualisé",
      description:
        "Proposer des activités adaptées aux difficultés identifiées."
    },
    {
      id: "remediation_02",
      titre: "Reprise des notions",
      description:
        "Reprendre progressivement les apprentissages non maîtrisés."
    },
    {
      id: "remediation_03",
      titre: "Manipulation",
      description:
        "Utiliser des objets, images et situations concrètes pour faciliter la compréhension."
    },
    {
      id: "remediation_04",
      titre: "Entraînement",
      description:
        "Proposer des exercices progressifs et réguliers."
    }
  ]
};