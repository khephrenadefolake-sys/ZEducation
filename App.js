import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

/* =========================================================
   ZEGBE CLUB EDUCATION
   CP1 → CM2
   VERSION STABLE EXPO GO
   ========================================================= */

const NIVEAUX = ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2"];

/* =========================================================
   MATIÈRES
   ========================================================= */

const MATIERES_CP = [
  {
    id: "francais",
    nom: "Français",
    icon: "📚",
    description: "Lecture, grammaire, conjugaison et expression",
  },
  {
    id: "maths",
    nom: "Mathématiques",
    icon: "🔢",
    description: "Calcul, nombres, problèmes et géométrie",
  },
  {
    id: "eveil",
    nom: "Éveil au milieu",
    icon: "🌍",
    description: "Découverte du monde et culture générale",
  },
];

const MATIERES_CE_CM = [
  {
    id: "francais",
    nom: "Français",
    icon: "📚",
    description:
      "Orthographe, conjugaison, grammaire, vocabulaire et expression écrite",
  },
  {
    id: "maths",
    nom: "Mathématiques",
    icon: "🔢",
    description: "Nombres, calcul, problèmes et géométrie",
  },
  {
    id: "histoire",
    nom: "Histoire et Géographie",
    icon: "🌍",
    description: "Histoire, géographie et découverte des territoires",
  },
  {
    id: "sciences",
    nom: "Sciences et Technologies",
    icon: "🔬",
    description: "Le vivant, la matière, l'environnement et les technologies",
  },
  {
    id: "anglais",
    nom: "Anglais (Initiation)",
    icon: "🇬🇧",
    description: "Premiers mots, expressions et communication en anglais",
  },
];

/* =========================================================
   RUBRIQUES FRANÇAIS
   ========================================================= */

const RUBRIQUES_CP = [
  {
    id: "grammaire",
    nom: "Grammaire",
    icon: "📝",
  },
  {
    id: "conjugaison",
    nom: "Conjugaison",
    icon: "🔤",
  },
  {
    id: "orthographe",
    nom: "Orthographe",
    icon: "✍️",
  },
  {
    id: "vocabulaire",
    nom: "Vocabulaire",
    icon: "📖",
  },
  {
    id: "lecture",
    nom: "Lecture / Compréhension",
    icon: "👀",
  },
  {
    id: "expression_ecrite",
    nom: "Expression écrite",
    icon: "📄",
  },
  {
    id: "expression_orale",
    nom: "Expression orale",
    icon: "🎤",
  },
];

const RUBRIQUES_CE_CM = [
  {
    id: "orthographe",
    nom: "ORTHOGRAPHE",
    icon: "✍️",
  },
  {
    id: "conjugaison",
    nom: "CONJUGAISON",
    icon: "🔤",
  },
  {
    id: "grammaire",
    nom: "GRAMMAIRE",
    icon: "📝",
  },
  {
    id: "vocabulaire",
    nom: "VOCABULAIRE",
    icon: "📖",
  },
  {
    id: "expression_ecrite",
    nom: "EXPRESSION ÉCRITE",
    icon: "📄",
  },
];

/* =========================================================
   PROGRAMMES GRAMMAIRE
   ========================================================= */

const PROGRAMMES_GRAMMAIRE = {
  CP1: [
    "La phrase",
    "Les mots",
    "Les voyelles",
    "Les consonnes",
  ],

  CP2: [
    "La phrase simple",
    "Le nom",
    "Le verbe",
    "Le déterminant",
  ],

  CE1: [
    "La phrase",
    "Les types de phrases",
    "Le nom",
    "Le verbe",
    "Le sujet",
    "Le groupe nominal",
  ],

  CE2: [
    "La phrase affirmative",
    "La phrase négative",
    "Le nom",
    "Le déterminant",
    "L'adjectif qualificatif",
    "Le COD",
  ],

  CM1: [
    "Nature et fonction",
    "Le groupe nominal étendu",
    "Les compléments circonstanciels",
    "Les propositions indépendantes",
    "Le sujet et le prédicat",
  ],
};

/* =========================================================
   GRAMMAIRE CM2
   11 CHAPITRES — 72 LEÇONS
   ========================================================= */

const CHAPITRES_CM2 = [
  {
    id: 1,
    titre: "CHAPITRE 1 — LA PHRASE",
    lecons: [
      "Les types de phrases",
      "Les formes de phrases",
      "La phrase simple",
      "La phrase complexe",
      "Les constituants de la phrase",
      "Le groupe nominal",
      "Le groupe verbal",
    ],
  },

  {
    id: 2,
    titre: "CHAPITRE 2 — LE GROUPE NOMINAL",
    lecons: [
      "Le nom",
      "Les différents types de déterminants",
      "Les pronoms",
      "L'adjectif qualificatif",
      "Les fonctions de l'adjectif qualificatif",
      "Le complément du nom",
      "L'expansion du nom",
    ],
  },

  {
    id: 3,
    titre: "CHAPITRE 3 — LE GROUPE VERBAL ET LES COMPLÉMENTS",
    lecons: [
      "Le verbe et le groupe verbal",
      "Le complément d'objet direct (COD)",
      "Le complément d'objet indirect (COI)",
      "Le complément d'objet second (COS)",
      "Les compléments circonstanciels",
      "Identifier et analyser les compléments dans la phrase",
    ],
  },

  {
    id: 4,
    titre: "CHAPITRE 4 — LES PRONOMS",
    lecons: [
      "Les différents types de pronoms",
      "Les pronoms personnels",
      "Les pronoms relatifs",
      "Le rôle et la fonction des pronoms",
      "Remplacer un groupe nominal par un pronom",
    ],
  },

  {
    id: 5,
    titre: "CHAPITRE 5 — LES PROPOSITIONS",
    lecons: [
      "La proposition",
      "La proposition indépendante",
      "L'analyse de la proposition indépendante",
      "Les propositions coordonnées",
      "Les propositions juxtaposées",
      "Les propositions subordonnées",
      "Les conjonctions de subordination",
    ],
  },

  {
    id: 6,
    titre: "CHAPITRE 6 — LES PROPOSITIONS SUBORDONNÉES RELATIVES",
    lecons: [
      "La proposition subordonnée relative",
      "Les pronoms relatifs",
      "Identifier une proposition subordonnée relative",
      "Le rôle de la proposition subordonnée relative",
      "L'analyse d'une proposition subordonnée relative",
      "Exercices d'analyse de propositions relatives",
    ],
  },

  {
    id: 7,
    titre: "CHAPITRE 7 — LES PROPOSITIONS SUBORDONNÉES COMPLÉTIVES",
    lecons: [
      "La proposition subordonnée complétive",
      "Identifier une proposition subordonnée complétive",
      "Les conjonctions de subordination utilisées dans les complétives",
      "La fonction de la proposition subordonnée complétive",
      "L'analyse d'une proposition subordonnée complétive",
      "Exercices d'analyse de propositions complétives",
    ],
  },

  {
    id: 8,
    titre: "CHAPITRE 8 — LES PROPOSITIONS SUBORDONNÉES CIRCONSTANCIELLES",
    lecons: [
      "Les propositions subordonnées circonstancielles",
      "Les différentes circonstances exprimées",
      "Les conjonctions et locutions conjonctives de subordination",
      "Identifier une proposition subordonnée circonstancielle",
      "Analyser une proposition subordonnée circonstancielle",
    ],
  },

  {
    id: 9,
    titre: "CHAPITRE 9 — LE DISCOURS",
    lecons: [
      "Le discours direct",
      "Le discours indirect",
      "Les caractéristiques du discours direct",
      "Les caractéristiques du discours indirect",
      "Transformer le discours direct en discours indirect",
      "Transformer le discours indirect en discours direct",
      "Les changements de pronoms, de temps et de repères",
    ],
  },

  {
    id: 10,
    titre: "CHAPITRE 10 — LA VOIX DU VERBE",
    lecons: [
      "La voix active",
      "La voix passive",
      "Reconnaître la voix active et la voix passive",
      "Transformer une phrase active en phrase passive",
      "Transformer une phrase passive en phrase active",
      "Identifier le complément d'agent",
    ],
  },

  {
    id: 11,
    titre: "CHAPITRE 11 — ANALYSE GRAMMATICALE ET LOGIQUE",
    lecons: [
      "Analyse grammaticale des mots",
      "Nature et fonction des mots",
      "Analyse du groupe nominal",
      "Analyse du groupe verbal",
      "Analyse des compléments",
      "Analyse de la proposition indépendante",
      "Analyse de la proposition subordonnée relative",
      "Analyse de la proposition subordonnée complétive",
      "Analyse des propositions subordonnées circonstancielles",
      "Analyse complète d'une phrase complexe",
    ],
  },
];

/* =========================================================
   CONVERSION DES 72 LEÇONS
   ========================================================= */

const LECONS_CM2 = [];

CHAPITRES_CM2.forEach((chapitre) => {
  chapitre.lecons.forEach((titre) => {
    LECONS_CM2.push({
      numero: LECONS_CM2.length + 1,
      titre,
      chapitre: chapitre.titre,
    });
  });
});

/* =========================================================
   CONTENU PÉDAGOGIQUE
   ========================================================= */

const CONTENU_LECONS = {
  "Les types de phrases": {
    objectif:
      "Reconnaître les quatre types de phrases et comprendre leur rôle.",
    explication:
      "Une phrase peut donner une information, poser une question, exprimer une émotion ou donner un ordre.",
    regle:
      "La phrase déclarative donne une information. La phrase interrogative pose une question. La phrase exclamative exprime une émotion. La phrase impérative donne un ordre ou un conseil.",
    exemples: [
      "Les élèves travaillent.",
      "Est-ce que tu viens ?",
      "Quelle belle journée !",
      "Ferme la porte !",
    ],
    corriges: [
      "Les élèves travaillent. → phrase déclarative.",
      "Est-ce que tu viens ? → phrase interrogative.",
      "Quelle belle journée ! → phrase exclamative.",
      "Ferme la porte ! → phrase impérative.",
    ],
    retenir:
      "Je regarde le sens de la phrase et sa ponctuation pour reconnaître son type.",
  },

  "Les formes de phrases": {
    objectif:
      "Reconnaître et transformer les principales formes de phrases.",
    explication:
      "Une phrase peut être affirmative ou négative. Elle peut aussi être active ou passive.",
    regle:
      "La forme affirmative affirme quelque chose. La forme négative nie quelque chose. À la voix active, le sujet fait l'action. À la voix passive, le sujet subit l'action.",
    exemples: [
      "Awa mange une orange.",
      "Awa ne mange pas d'orange.",
      "Le maître corrige les cahiers.",
      "Les cahiers sont corrigés par le maître.",
    ],
    corriges: [
      "Awa mange une orange. → affirmative et active.",
      "Awa ne mange pas d'orange. → négative.",
      "Le maître corrige les cahiers. → active.",
      "Les cahiers sont corrigés par le maître. → passive.",
    ],
    retenir:
      "Je regarde les mots de négation et la relation entre le sujet et l'action.",
  },

  "La phrase simple": {
    objectif: "Reconnaître une phrase simple.",
    explication:
      "Une phrase simple contient généralement un seul verbe conjugué.",
    regle:
      "Pour reconnaître une phrase simple, je cherche le nombre de verbes conjugués.",
    exemples: [
      "Koffi joue au ballon.",
      "Les enfants chantent.",
    ],
    corriges: [
      "Koffi joue au ballon. → un seul verbe conjugué : joue.",
      "Les enfants chantent. → un seul verbe conjugué : chantent.",
    ],
    retenir:
      "Une phrase simple contient un seul verbe conjugué.",
  },

  "La phrase complexe": {
    objectif: "Reconnaître une phrase complexe.",
    explication:
      "Une phrase complexe contient plusieurs verbes conjugués et donc plusieurs propositions.",
    regle:
      "Pour reconnaître une phrase complexe, je cherche plusieurs verbes conjugués.",
    exemples: [
      "Koffi joue et Awa chante.",
      "Je travaille parce que je veux réussir.",
    ],
    corriges: [
      "Koffi joue et Awa chante. → deux verbes conjugués.",
      "Je travaille parce que je veux réussir. → deux verbes conjugués.",
    ],
    retenir:
      "Plusieurs verbes conjugués peuvent former plusieurs propositions dans une phrase complexe.",
  },

  "Les constituants de la phrase": {
    objectif: "Identifier les principales parties d'une phrase.",
    explication:
      "Dans une phrase, on peut distinguer le groupe sujet et le groupe verbal.",
    regle:
      "Le groupe sujet indique qui fait l'action. Le groupe verbal contient le verbe et les éléments qui le complètent.",
    exemples: [
      "Les élèves travaillent sérieusement.",
      "La petite fille lit un livre.",
    ],
    corriges: [
      "Les élèves → groupe sujet ; travaillent sérieusement → groupe verbal.",
      "La petite fille → groupe sujet ; lit un livre → groupe verbal.",
    ],
    retenir:
      "Je cherche d'abord le sujet puis le groupe verbal.",
  },

  "Le groupe nominal": {
    objectif: "Identifier un groupe nominal.",
    explication:
      "Le groupe nominal est organisé autour d'un nom.",
    regle:
      "Un groupe nominal peut être formé d'un déterminant et d'un nom, avec éventuellement un adjectif ou un complément du nom.",
    exemples: [
      "La maison.",
      "La grande maison de mon voisin.",
    ],
    corriges: [
      "La maison → déterminant + nom.",
      "La grande maison de mon voisin → groupe nominal développé.",
    ],
    retenir:
      "Le nom est le noyau du groupe nominal.",
  },

  "Le groupe verbal": {
    objectif: "Identifier le groupe verbal.",
    explication:
      "Le groupe verbal est organisé autour du verbe.",
    regle:
      "Le groupe verbal comprend le verbe et les compléments qui dépendent de lui.",
    exemples: [
      "mange une mangue",
      "travaille sérieusement",
    ],
    corriges: [
      "mange une mangue → verbe + COD.",
      "travaille sérieusement → verbe + complément.",
    ],
    retenir:
      "Je repère le verbe puis les éléments qui dépendent de lui.",
  },

  "Le nom": {
    objectif: "Reconnaître le nom et déterminer son genre et son nombre.",
    explication:
      "Le nom sert à désigner une personne, un animal, une chose, un lieu ou une idée.",
    regle:
      "Le nom peut être commun ou propre, masculin ou féminin, singulier ou pluriel.",
    exemples: [
      "une fille",
      "Abidjan",
      "des cahiers",
    ],
    corriges: [
      "fille → nom commun féminin singulier.",
      "Abidjan → nom propre.",
      "cahiers → nom commun masculin pluriel.",
    ],
    retenir:
      "Le nom désigne et possède un genre et un nombre.",
  },

  "L'adjectif qualificatif": {
    objectif: "Identifier et accorder l'adjectif qualificatif.",
    explication:
      "L'adjectif qualificatif donne une précision sur un nom.",
    regle:
      "L'adjectif qualificatif s'accorde en genre et en nombre avec le nom qu'il accompagne.",
    exemples: [
      "une grande maison",
      "des maisons grandes",
    ],
    corriges: [
      "grande s'accorde avec maison : féminin singulier.",
      "grandes s'accorde avec maisons : féminin pluriel.",
    ],
    retenir:
      "L'adjectif qualificatif s'accorde avec le nom.",
  },

  "Le complément d'objet direct (COD)": {
    objectif: "Identifier le complément d'objet direct.",
    explication:
      "Le COD complète directement le verbe sans préposition.",
    regle:
      "Pour trouver le COD, je pose la question « qui ? » ou « quoi ? » après le verbe.",
    exemples: [
      "Awa mange une mangue.",
      "Le maître corrige les cahiers.",
    ],
    corriges: [
      "Awa mange quoi ? → une mangue : COD.",
      "Le maître corrige quoi ? → les cahiers : COD.",
    ],
    retenir:
      "Le COD complète directement le verbe.",
  },

  "Le complément d'objet indirect (COI)": {
    objectif: "Identifier le complément d'objet indirect.",
    explication:
      "Le COI complète le verbe à l'aide d'une préposition.",
    regle:
      "Le COI est souvent introduit par à, de, pour ou une autre préposition.",
    exemples: [
      "Je parle à mon frère.",
      "Il pense à son travail.",
    ],
    corriges: [
      "à mon frère → COI.",
      "à son travail → COI.",
    ],
    retenir:
      "Le COI complète indirectement le verbe.",
  },

  "Les compléments circonstanciels": {
    objectif:
      "Identifier les compléments circonstanciels et reconnaître les circonstances exprimées.",
    explication:
      "Les compléments circonstanciels donnent des informations sur les circonstances de l'action.",
    regle:
      "Ils peuvent exprimer le temps, le lieu, la manière, la cause, le but, etc.",
    exemples: [
      "Nous travaillons le matin.",
      "Les élèves jouent dans la cour.",
    ],
    corriges: [
      "le matin → complément circonstanciel de temps.",
      "dans la cour → complément circonstanciel de lieu.",
    ],
    retenir:
      "Je demande où, quand, comment, pourquoi ou dans quel but l'action se réalise.",
  },

  "Les pronoms personnels": {
    objectif: "Identifier et utiliser les pronoms personnels.",
    explication:
      "Les pronoms personnels remplacent souvent des noms ou groupes nominaux.",
    regle:
      "Les pronoms personnels sont notamment : je, tu, il, elle, nous, vous, ils, elles.",
    exemples: [
      "Awa travaille. Elle travaille.",
      "Koffi et Paul jouent. Ils jouent.",
    ],
    corriges: [
      "Elle remplace Awa.",
      "Ils remplace Koffi et Paul.",
    ],
    retenir:
      "Le pronom personnel peut remplacer un groupe nominal.",
  },

  "Les pronoms relatifs": {
    objectif: "Reconnaître les principaux pronoms relatifs.",
    explication:
      "Les pronoms relatifs introduisent une proposition subordonnée relative.",
    regle:
      "Les principaux pronoms relatifs sont qui, que, dont et où.",
    exemples: [
      "Le livre qui est sur la table est à moi.",
      "La maison que tu vois est grande.",
    ],
    corriges: [
      "qui introduit la relative « qui est sur la table ».",
      "que introduit la relative « que tu vois ».",
    ],
    retenir:
      "Qui, que, dont et où sont des pronoms relatifs courants.",
  },

  "La proposition": {
    objectif: "Comprendre ce qu'est une proposition.",
    explication:
      "Une proposition est un groupe de mots organisé autour d'un verbe conjugué.",
    regle:
      "Dans une phrase complexe, chaque proposition possède généralement son propre verbe conjugué.",
    exemples: [
      "Awa travaille.",
      "Awa travaille et Koffi lit.",
    ],
    corriges: [
      "Awa travaille. → une proposition.",
      "Awa travaille et Koffi lit. → deux propositions.",
    ],
    retenir:
      "Je repère les verbes conjugués pour identifier les propositions.",
  },

  "La proposition indépendante": {
    objectif: "Identifier une proposition indépendante.",
    explication:
      "Une proposition indépendante peut constituer une phrase complète.",
    regle:
      "Elle ne dépend d'aucune autre proposition.",
    exemples: [
      "Le soleil brille.",
      "Les enfants jouent.",
    ],
    corriges: [
      "Le soleil brille. → proposition indépendante.",
      "Les enfants jouent. → proposition indépendante.",
    ],
    retenir:
      "Une proposition indépendante ne dépend d'aucune autre proposition.",
  },

  "Le discours direct": {
    objectif: "Reconnaître et utiliser le discours direct.",
    explication:
      "Le discours direct rapporte exactement les paroles d'une personne.",
    regle:
      "Il est souvent introduit par un verbe de parole et utilise des guillemets ou des tirets.",
    exemples: [
      "Awa dit : « Je suis contente. »",
      "Paul demande : « Où vas-tu ? »",
    ],
    corriges: [
      "Les paroles d'Awa sont rapportées directement.",
      "La question de Paul est conservée telle qu'elle a été prononcée.",
    ],
    retenir:
      "Le discours direct rapporte les paroles telles qu'elles ont été prononcées.",
  },

  "Le discours indirect": {
    objectif: "Reconnaître et utiliser le discours indirect.",
    explication:
      "Le discours indirect rapporte les paroles sans les reproduire exactement.",
    regle:
      "Les paroles sont intégrées dans une autre phrase et certains pronoms, temps ou repères peuvent changer.",
    exemples: [
      "Awa dit qu'elle est contente.",
      "Paul demande où je vais.",
    ],
    corriges: [
      "« Je suis contente » devient « qu'elle est contente ».",
      "La question est intégrée dans la phrase.",
    ],
    retenir:
      "Le discours indirect rapporte les paroles en les intégrant dans une autre phrase.",
  },

  "La voix active": {
    objectif: "Reconnaître une phrase à la voix active.",
    explication:
      "À la voix active, le sujet réalise l'action exprimée par le verbe.",
    regle:
      "Le sujet est présenté comme celui qui fait l'action.",
    exemples: [
      "Le maître corrige les cahiers.",
      "Awa prépare le repas.",
    ],
    corriges: [
      "Le maître fait l'action de corriger.",
      "Awa fait l'action de préparer.",
    ],
    retenir:
      "À la voix active, le sujet fait l'action.",
  },

  "La voix passive": {
    objectif: "Reconnaître une phrase à la voix passive.",
    explication:
      "À la voix passive, le sujet subit l'action.",
    regle:
      "La voix passive se forme généralement avec l'auxiliaire être et le participe passé.",
    exemples: [
      "Les cahiers sont corrigés par le maître.",
      "Le repas est préparé par Awa.",
    ],
    corriges: [
      "Les cahiers subissent l'action de corriger.",
      "Le repas subit l'action de préparer.",
    ],
    retenir:
      "À la voix passive, le sujet subit l'action.",
  },

  "Nature et fonction des mots": {
    objectif:
      "Distinguer la nature d'un mot de sa fonction dans la phrase.",
    explication:
      "La nature indique ce qu'est un mot. La fonction indique le rôle qu'il joue dans la phrase.",
    regle:
      "La nature peut être nom, verbe, adjectif, pronom, déterminant, etc. La fonction peut être sujet, COD, COI, attribut, complément, etc.",
    exemples: [
      "Paul mange une mangue.",
      "Paul est sujet de « mange ».",
    ],
    corriges: [
      "Paul → nom propre ; fonction : sujet.",
      "mangue → nom commun ; fonction : COD.",
    ],
    retenir:
      "Nature = ce que le mot est. Fonction = son rôle dans la phrase.",
  },

  "Analyse complète d'une phrase complexe": {
    objectif:
      "Analyser progressivement une phrase complexe.",
    explication:
      "Pour analyser une phrase complexe, il faut repérer les verbes, découper les propositions puis identifier leurs relations.",
    regle:
      "Je repère les verbes conjugués, je délimite les propositions, puis j'identifie leur nature et leur relation.",
    exemples: [
      "Je travaille parce que je veux réussir.",
      "Le garçon qui court est mon frère.",
    ],
    corriges: [
      "« Je travaille » est la proposition principale et « parce que je veux réussir » est une proposition subordonnée circonstancielle.",
      "« qui court » est une proposition subordonnée relative.",
    ],
    retenir:
      "Une analyse complète se fait étape par étape : verbes, propositions, relations et fonctions.",
  },
};

/* =========================================================
   CONTENU PAR DÉFAUT POUR LES AUTRES LEÇONS
   ========================================================= */

function obtenirContenu(lecon) {
  if (CONTENU_LECONS[lecon.titre]) {
    return CONTENU_LECONS[lecon.titre];
  }

  return {
    objectif:
      `Comprendre la notion « ${lecon.titre} » et savoir l'identifier dans une phrase.`,
    explication:
      `Cette leçon permet de comprendre la notion de « ${lecon.titre} ». Observe attentivement les phrases et les mots concernés.`,
    regle:
      "Pour réussir, je lis la phrase, je repère les indices importants, puis j'applique la règle étudiée.",
    exemples: [
      "Les élèves travaillent sérieusement.",
      "Nous lisons une phrase.",
    ],
    corriges: [
      "On commence par identifier la notion étudiée.",
      "On vérifie ensuite sa fonction ou son rôle dans la phrase.",
    ],
    retenir:
      "Je lis, j'identifie la notion, j'applique la règle et je vérifie ma réponse.",
  };
}

/* =========================================================
   EXERCICES
   ========================================================= */

const EXERCICES = [
  {
    niveau: "FACILE",
    question:
      "Quel est le type de la phrase : « Tu viens demain. »",
    options: [
      "Déclarative",
      "Interrogative",
      "Exclamative",
      "Impérative",
    ],
    reponse: 0,
    correction:
      "La phrase donne une information. Elle est donc déclarative.",
  },

  {
    niveau: "FACILE",
    question:
      "Quel est le verbe dans : « Les élèves travaillent. »",
    options: [
      "Les",
      "élèves",
      "travaillent",
      "Les élèves",
    ],
    reponse: 2,
    correction:
      "« travaillent » est le verbe de la phrase.",
  },

  {
    niveau: "FACILE",
    question:
      "Quel est le sujet dans : « Awa lit un livre. »",
    options: [
      "Awa",
      "lit",
      "un livre",
      "livre",
    ],
    reponse: 0,
    correction:
      "Awa réalise l'action de lire. Awa est donc le sujet.",
  },

  {
    niveau: "FACILE",
    question:
      "Dans « une grande maison », quel est l'adjectif ?",
    options: [
      "une",
      "grande",
      "maison",
      "une grande",
    ],
    reponse: 1,
    correction:
      "« grande » précise le nom « maison ». C'est un adjectif qualificatif.",
  },

  {
    niveau: "MOYEN",
    question:
      "Dans « Paul mange une orange », quel est le COD ?",
    options: [
      "Paul",
      "mange",
      "une orange",
      "Paul mange",
    ],
    reponse: 2,
    correction:
      "Paul mange quoi ? Une orange. « une orange » est donc le COD.",
  },

  {
    niveau: "MOYEN",
    question:
      "Quel pronom remplace « Awa et Fatou » ?",
    options: [
      "Il",
      "Elle",
      "Ils",
      "Elles",
    ],
    reponse: 3,
    correction:
      "Awa et Fatou sont deux personnes féminines. Le pronom « elles » convient.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Dans « Je travaille parce que je veux réussir », combien y a-t-il de propositions ?",
    options: [
      "Une",
      "Deux",
      "Trois",
      "Quatre",
    ],
    reponse: 1,
    correction:
      "Il y a deux verbes conjugués : « travaille » et « veux ». Il y a donc deux propositions.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Dans « Le livre que tu lis est intéressant », « que tu lis » est :",
    options: [
      "Une proposition indépendante",
      "Une proposition coordonnée",
      "Une proposition subordonnée relative",
      "Une proposition juxtaposée",
    ],
    reponse: 2,
    correction:
      "« que tu lis » complète le nom « livre » et commence par le pronom relatif « que ». C'est une proposition subordonnée relative.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Dans « Les cahiers sont corrigés par le maître », quelle est la voix ?",
    options: [
      "Active",
      "Passive",
      "Interrogative",
      "Exclamative",
    ],
    reponse: 1,
    correction:
      "Le sujet « les cahiers » subit l'action. La phrase est donc à la voix passive.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Dans « Awa prépare le repas », quelle est la fonction de « le repas » ?",
    options: [
      "Sujet",
      "COI",
      "COD",
      "Attribut",
    ],
    reponse: 2,
    correction:
      "Awa prépare quoi ? Le repas. « le repas » est donc COD.",
  },
];

/* =========================================================
   QUIZ
   ========================================================= */

const QUIZ = [
  {
    niveau: "FACILE",
    question: "Quelle phrase est interrogative ?",
    options: [
      "Le garçon joue.",
      "Est-ce que tu viens ?",
      "Quelle belle journée !",
      "Ferme la porte !",
    ],
    reponse: 1,
    correction:
      "« Est-ce que tu viens ? » pose une question. C'est une phrase interrogative.",
  },

  {
    niveau: "FACILE",
    question: "Quel mot est un verbe ?",
    options: [
      "maison",
      "rapidement",
      "manger",
      "le",
    ],
    reponse: 2,
    correction:
      "« manger » est un verbe.",
  },

  {
    niveau: "FACILE",
    question:
      "Quel pronom remplace « Fatou » ?",
    options: [
      "Il",
      "Elle",
      "Ils",
      "Nous",
    ],
    reponse: 1,
    correction:
      "Fatou est une personne féminine singulière. Le pronom est « elle ».",
  },

  {
    niveau: "MOYEN",
    question:
      "Dans « Les enfants jouent dans la cour », quel est le sujet ?",
    options: [
      "Les",
      "enfants",
      "Les enfants",
      "jouent",
    ],
    reponse: 2,
    correction:
      "« Les enfants » réalise l'action de jouer. C'est le groupe sujet.",
  },

  {
    niveau: "MOYEN",
    question:
      "Dans « Marie prépare le repas », quel est le COD ?",
    options: [
      "Marie",
      "prépare",
      "le repas",
      "repas",
    ],
    reponse: 2,
    correction:
      "Marie prépare quoi ? Le repas. C'est le COD.",
  },

  {
    niveau: "MOYEN",
    question:
      "Quel mot est un pronom relatif ?",
    options: [
      "qui",
      "dans",
      "très",
      "mais",
    ],
    reponse: 0,
    correction:
      "« qui » est un pronom relatif.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Combien de propositions contient : « Je lis parce que j'aime les livres » ?",
    options: [
      "Une",
      "Deux",
      "Trois",
      "Quatre",
    ],
    reponse: 1,
    correction:
      "Il y a deux verbes conjugués : « lis » et « aime ». Il y a donc deux propositions.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "« Le ballon est lancé par Paul » est une phrase à la voix :",
    options: [
      "Active",
      "Passive",
      "Interrogative",
      "Impérative",
    ],
    reponse: 1,
    correction:
      "Le sujet « le ballon » subit l'action. La phrase est passive.",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Dans « Le garçon qui court est mon frère », « qui court » est :",
    options: [
      "Une proposition relative",
      "Une proposition indépendante",
      "Un COD",
      "Un COI",
    ],
    reponse: 0,
    correction:
      "« qui court » commence par le pronom relatif « qui » et complète le nom « garçon ».",
  },

  {
    niveau: "DIFFICILE",
    question:
      "Quelle est la fonction de « à son frère » dans « Il parle à son frère » ?",
    options: [
      "COD",
      "COI",
      "Sujet",
      "Attribut",
    ],
    reponse: 1,
    correction:
      "Le groupe « à son frère » complète indirectement le verbe « parle ». C'est un COI.",
  },
];

/* =========================================================
   APPLICATION
   ========================================================= */

export default function App() {
  const [ecran, setEcran] = useState("BIENVENUE");

  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [niveau, setNiveau] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");

  const [niveauOuvert, setNiveauOuvert] = useState(false);

  const [emailConnexion, setEmailConnexion] = useState("");
  const [motDePasseConnexion, setMotDePasseConnexion] = useState("");

  const [eleveConnecte, setEleveConnecte] = useState(null);

  const [rubrique, setRubrique] = useState("ACCUEIL");
  const [matiereSelectionnee, setMatiereSelectionnee] = useState(null);
  const [rubriqueFrancaisSelectionnee, setRubriqueFrancaisSelectionnee] =
    useState(null);
  const [chapitreSelectionne, setChapitreSelectionne] = useState(null);
  const [leconSelectionnee, setLeconSelectionnee] = useState(null);

  const [ongletLecon, setOngletLecon] = useState("COURS");

  const [questionExercice, setQuestionExercice] = useState(0);
  const [scoreExercice, setScoreExercice] = useState(0);
  const [exerciceTermine, setExerciceTermine] = useState(false);

  const [questionQuiz, setQuestionQuiz] = useState(0);
  const [scoreQuiz, setScoreQuiz] = useState(0);
  const [quizTermine, setQuizTermine] = useState(false);

  const [reponseSelectionnee, setReponseSelectionnee] = useState(null);
  const [correctionVisible, setCorrectionVisible] = useState(false);

  const estCECM =
    eleveConnecte &&
    ["CE1", "CE2", "CM1", "CM2"].includes(eleveConnecte.niveau);

  const matieresActuelles = estCECM
    ? MATIERES_CE_CM
    : MATIERES_CP;

  const rubriquesActuelles = estCECM
    ? RUBRIQUES_CE_CM
    : RUBRIQUES_CP;

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const retourAccueil = () => {
    setRubrique("ACCUEIL");
    setMatiereSelectionnee(null);
    setRubriqueFrancaisSelectionnee(null);
    setChapitreSelectionne(null);
    setLeconSelectionnee(null);
    setOngletLecon("COURS");
    setCorrectionVisible(false);
    setReponseSelectionnee(null);
  };

  const ouvrirMatiere = (matiere) => {
    setMatiereSelectionnee(matiere);
    setRubriqueFrancaisSelectionnee(null);
    setChapitreSelectionne(null);
    setLeconSelectionnee(null);

    if (matiere.id === "francais") {
      setRubrique("FRANCAIS");
    } else {
      setRubrique("MATIERE");
    }
  };

  const ouvrirRubriqueFrancais = (item) => {
    setRubriqueFrancaisSelectionnee(item);

    if (item.id === "grammaire") {
      setRubrique("GRAMMAIRE");
    } else {
      setRubrique("RUBRIQUE_FRANCAIS");
    }
  };

  const ouvrirChapitre = (chapitre) => {
    setChapitreSelectionne(chapitre);
    setRubrique("LECONS");
  };

  const ouvrirLecon = (lecon) => {
    setLeconSelectionnee(lecon);
    setOngletLecon("COURS");
    setCorrectionVisible(false);
    setReponseSelectionnee(null);
    setRubrique("LECON");
  };

  /* =======================================================
     COMPTE
     ======================================================= */

  const creerCompte = () => {
    const n = nom.trim();
    const p = prenoms.trim();
    const e = email.trim().toLowerCase();
    const ce = confirmationEmail.trim().toLowerCase();

    if (
      !n ||
      !p ||
      !niveau ||
      !e ||
      !ce ||
      !motDePasse ||
      !confirmationMotDePasse
    ) {
      Alert.alert(
        "Champs incomplets",
        "Veuillez remplir tous les champs."
      );
      return;
    }

    if (!e.includes("@") || !e.includes(".")) {
      Alert.alert(
        "Email incorrect",
        "Veuillez saisir une adresse email valide."
      );
      return;
    }

    if (e !== ce) {
      Alert.alert(
        "Erreur",
        "Les deux adresses email ne correspondent pas."
      );
      return;
    }

    if (motDePasse.length < 6) {
      Alert.alert(
        "Mot de passe",
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (motDePasse !== confirmationMotDePasse) {
      Alert.alert(
        "Erreur",
        "Les deux mots de passe ne correspondent pas."
      );
      return;
    }

    const compte = {
      nom: n,
      prenoms: p,
      niveau,
      email: e,
      motDePasse,
    };

    setEleveConnecte(compte);
    setEmailConnexion(e);
    setMotDePasseConnexion("");

    Alert.alert(
      "Compte créé",
      "Votre compte a été créé avec succès.",
      [
        {
          text: "Se connecter",
          onPress: () => setEcran("CONNEXION"),
        },
      ]
    );
  };

  const seConnecter = () => {
    const e = emailConnexion.trim().toLowerCase();

    if (!e || !motDePasseConnexion) {
      Alert.alert(
        "Connexion",
        "Veuillez renseigner votre email et votre mot de passe."
      );
      return;
    }

    if (!eleveConnecte) {
      Alert.alert(
        "Aucun compte",
        "Veuillez créer un compte avant de vous connecter."
      );
      return;
    }

    if (e !== eleveConnecte.email) {
      Alert.alert(
        "Erreur",
        "Cette adresse email ne correspond pas au compte créé."
      );
      return;
    }

    if (motDePasseConnexion !== eleveConnecte.motDePasse) {
      Alert.alert(
        "Erreur",
        "Mot de passe incorrect."
      );
      return;
    }

    retourAccueil();
    setEcran("MENU");
  };

  const seDeconnecter = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: () => {
            setEcran("BIENVENUE");
            setRubrique("ACCUEIL");
            setMatiereSelectionnee(null);
            setRubriqueFrancaisSelectionnee(null);
            setChapitreSelectionne(null);
            setLeconSelectionnee(null);
            setQuestionExercice(0);
            setScoreExercice(0);
            setExerciceTermine(false);
            setQuestionQuiz(0);
            setScoreQuiz(0);
            setQuizTermine(false);
            setCorrectionVisible(false);
            setReponseSelectionnee(null);
          },
        },
      ]
    );
  };

  /* =======================================================
     EXERCICES
     ======================================================= */

  const demarrerExercices = () => {
    setQuestionExercice(0);
    setScoreExercice(0);
    setExerciceTermine(false);
    setCorrectionVisible(false);
    setReponseSelectionnee(null);
    setRubrique("EXERCICES");
  };

  const repondreExercice = (index) => {
    if (correctionVisible) return;

    setReponseSelectionnee(index);
    setCorrectionVisible(true);
  };

  const continuerExercice = () => {
    const question = EXERCICES[questionExercice];

    if (!question) return;

    if (reponseSelectionnee === question.reponse) {
      setScoreExercice((ancien) => ancien + 1);
    }

    setCorrectionVisible(false);
    setReponseSelectionnee(null);

    if (questionExercice === EXERCICES.length - 1) {
      setExerciceTermine(true);
    } else {
      setQuestionExercice((ancien) => ancien + 1);
    }
  };

  /* =======================================================
     QUIZ
     ======================================================= */

  const demarrerQuiz = () => {
    setQuestionQuiz(0);
    setScoreQuiz(0);
    setQuizTermine(false);
    setCorrectionVisible(false);
    setReponseSelectionnee(null);
    setRubrique("QUIZ");
  };

  const repondreQuiz = (index) => {
    if (correctionVisible) return;

    setReponseSelectionnee(index);
    setCorrectionVisible(true);
  };

  const continuerQuiz = () => {
    const question = QUIZ[questionQuiz];

    if (!question) return;

    if (reponseSelectionnee === question.reponse) {
      setScoreQuiz((ancien) => ancien + 1);
    }

    setCorrectionVisible(false);
    setReponseSelectionnee(null);

    if (questionQuiz === QUIZ.length - 1) {
      setQuizTermine(true);
    } else {
      setQuestionQuiz((ancien) => ancien + 1);
    }
  };

  /* =======================================================
     HEADER
     ======================================================= */

  const Header = ({
    title,
    subtitle,
    backText = "Accueil",
    onBack = retourAccueil,
  }) => (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backButtonText}>
          ← {backText}
        </Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>
        {title}
      </Text>

      {subtitle ? (
        <Text style={styles.screenSubtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );

  /* =======================================================
     ÉCRAN BIENVENUE
     ======================================================= */

  if (ecran === "BIENVENUE") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView
          contentContainerStyle={styles.centerContainer}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Z</Text>
          </View>

          <Text style={styles.appTitle}>
            ZEGBE CLUB EDUCATION
          </Text>

          <Text style={styles.subtitle}>
            L'excellence scolaire commence ici
          </Text>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>
              Bienvenue 👋
            </Text>

            <Text style={styles.welcomeText}>
              Une application éducative destinée aux élèves du CP1 au CM2.
            </Text>

            <Text style={styles.welcomeText}>
              Cours • Exercices • Quiz • Progression
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setEcran("INSCRIPTION")}
          >
            <Text style={styles.primaryButtonText}>
              CRÉER UN COMPTE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setEcran("CONNEXION")}
          >
            <Text style={styles.secondaryButtonText}>
              SE CONNECTER
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     INSCRIPTION
     ======================================================= */

  if (ecran === "INSCRIPTION") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.formContainer}>
          <Header
            title="Créer un compte"
            subtitle="Inscription de l'élève"
            backText="Retour"
            onBack={() => setEcran("BIENVENUE")}
          />

          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Prénoms"
            value={prenoms}
            onChangeText={setPrenoms}
            autoCapitalize="words"
          />

          <Text style={styles.label}>
            Niveau scolaire
          </Text>

          <TouchableOpacity
            style={styles.selectInput}
            onPress={() =>
              setNiveauOuvert(!niveauOuvert)
            }
          >
            <Text
              style={
                niveau
                  ? styles.selectText
                  : styles.placeholderText
              }
            >
              {niveau || "Sélectionner le niveau"}
            </Text>

            <Text style={styles.arrowText}>
              {niveauOuvert ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {niveauOuvert && (
            <View style={styles.dropdown}>
              {NIVEAUX.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setNiveau(item);
                    setNiveauOuvert(false);
                  }}
                >
                  <Text style={styles.dropdownText}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmer l'adresse email"
            value={confirmationEmail}
            onChangeText={setConfirmationEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={motDePasse}
            onChangeText={setMotDePasse}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            value={confirmationMotDePasse}
            onChangeText={setConfirmationMotDePasse}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={creerCompte}
          >
            <Text style={styles.primaryButtonText}>
              CRÉER MON COMPTE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setEcran("CONNEXION")}
          >
            <Text style={styles.linkText}>
              J'ai déjà un compte
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     CONNEXION
     ======================================================= */

  if (ecran === "CONNEXION") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.formContainer}>
          <Header
            title="Connexion"
            subtitle="Accéder à mon espace élève"
            backText="Retour"
            onBack={() => setEcran("BIENVENUE")}
          />

          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            value={emailConnexion}
            onChangeText={setEmailConnexion}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={motDePasseConnexion}
            onChangeText={setMotDePasseConnexion}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={seConnecter}
          >
            <Text style={styles.primaryButtonText}>
              SE CONNECTER
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setEcran("INSCRIPTION")}
          >
            <Text style={styles.linkText}>
              Créer un nouveau compte
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     MENU PRINCIPAL
     ======================================================= */

  if (ecran === "MENU") {
    const prenom =
      eleveConnecte?.prenoms?.split(" ")[0] ||
      "Élève";

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView
          contentContainerStyle={styles.dashboardContainer}
        >
          <View style={styles.dashboardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {prenom.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.headerInfo}>
              <Text style={styles.helloText}>
                Bonjour {prenom} 👋
              </Text>

              <Text style={styles.levelBadge}>
                NIVEAU {eleveConnecte?.niveau}
              </Text>
            </View>
          </View>

          <Text style={styles.dashboardTitle}>
            MON ESPACE ÉLÈVE
          </Text>

          <Text style={styles.dashboardSubtitle}>
            Choisis une activité pour commencer.
          </Text>

          <View style={styles.dashboardGrid}>
            <TouchableOpacity
              style={styles.dashboardCard}
              onPress={() => setRubrique("MATIERES")}
            >
              <Text style={styles.cardIcon}>📚</Text>
              <Text style={styles.cardTitle}>
                MATIÈRES
              </Text>
              <Text style={styles.cardDescription}>
                Découvre les cours de ton niveau
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dashboardCard}
              onPress={demarrerExercices}
            >
              <Text style={styles.cardIcon}>📝</Text>
              <Text style={styles.cardTitle}>
                EXERCICES
              </Text>
              <Text style={styles.cardDescription}>
                Entraîne-toi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dashboardCard}
              onPress={demarrerQuiz}
            >
              <Text style={styles.cardIcon}>🧠</Text>
              <Text style={styles.cardTitle}>
                QUIZ
              </Text>
              <Text style={styles.cardDescription}>
                Teste tes connaissances
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dashboardCard}
              onPress={() => setRubrique("PROGRESSION")}
            >
              <Text style={styles.cardIcon}>📊</Text>
              <Text style={styles.cardTitle}>
                PROGRESSION
              </Text>
              <Text style={styles.cardDescription}>
                Consulte tes résultats
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>
              🎓 Mon niveau
            </Text>

            <Text style={styles.infoText}>
              {eleveConnecte?.niveau}
            </Text>

            <Text style={styles.infoSmall}>
              Les contenus sont adaptés au niveau sélectionné.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={seDeconnecter}
          >
            <Text style={styles.logoutText}>
              🚪 SE DÉCONNECTER
            </Text>
          </TouchableOpacity>

          {rubrique === "MATIERES" && (
            <View style={styles.inlineSection}>
              <Text style={styles.sectionTitle}>
                📚 MATIÈRES
              </Text>

              {matieresActuelles.map((matiere) => (
                <TouchableOpacity
                  key={matiere.id}
                  style={styles.listCard}
                  onPress={() =>
                    ouvrirMatiere(matiere)
                  }
                >
                  <Text style={styles.listIcon}>
                    {matiere.icon}
                  </Text>

                  <View style={styles.listContent}>
                    <Text style={styles.listTitle}>
                      {matiere.nom}
                    </Text>

                    <Text style={styles.listDescription}>
                      {matiere.description}
                    </Text>
                  </View>

                  <Text style={styles.chevron}>
                    ›
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.smallBackButton}
                onPress={() =>
                  setRubrique("ACCUEIL")
                }
              >
                <Text style={styles.smallBackText}>
                  ← Retour à l'accueil
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {rubrique === "PROGRESSION" && (
            <View style={styles.inlineSection}>
              <Text style={styles.sectionTitle}>
                📊 MA PROGRESSION
              </Text>

              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>
                  Niveau
                </Text>

                <Text style={styles.progressValue}>
                  {eleveConnecte?.niveau}
                </Text>
              </View>

              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>
                  Score exercices
                </Text>

                <Text style={styles.progressValue}>
                  {scoreExercice} / {EXERCICES.length}
                </Text>
              </View>

              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>
                  Score quiz
                </Text>

                <Text style={styles.progressValue}>
                  {quizTermine
                    ? `${Math.round(
                        (scoreQuiz / QUIZ.length) * 100
                      )}%`
                    : "0%"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.smallBackButton}
                onPress={() =>
                  setRubrique("ACCUEIL")
                }
              >
                <Text style={styles.smallBackText}>
                  ← Retour à l'accueil
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     MATIÈRES
     ======================================================= */

  if (rubrique === "MATIERES") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title="📚 MATIÈRES"
            subtitle={`Niveau ${eleveConnecte?.niveau}`}
          />

          {matieresActuelles.map((matiere) => (
            <TouchableOpacity
              key={matiere.id}
              style={styles.listCard}
              onPress={() => ouvrirMatiere(matiere)}
            >
              <Text style={styles.listIcon}>
                {matiere.icon}
              </Text>

              <View style={styles.listContent}>
                <Text style={styles.listTitle}>
                  {matiere.nom}
                </Text>

                <Text style={styles.listDescription}>
                  {matiere.description}
                </Text>
              </View>

              <Text style={styles.chevron}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     FRANÇAIS
     ======================================================= */

  if (rubrique === "FRANCAIS") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title="📚 FRANÇAIS"
            subtitle={`Niveau ${eleveConnecte?.niveau}`}
            backText="Matières"
            onBack={() => setRubrique("MATIERES")}
          />

          {rubriquesActuelles.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listCard}
              onPress={() =>
                ouvrirRubriqueFrancais(item)
              }
            >
              <Text style={styles.listIcon}>
                {item.icon}
              </Text>

              <View style={styles.listContent}>
                <Text style={styles.listTitle}>
                  {item.nom}
                </Text>

                <Text style={styles.listDescription}>
                  Cours • Exercices • Quiz
                </Text>
              </View>

              <Text style={styles.chevron}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     GRAMMAIRE
     ======================================================= */

  if (rubrique === "GRAMMAIRE") {
    const niveauActuel =
      eleveConnecte?.niveau || "CM2";

    if (niveauActuel === "CM2") {
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#123C69"
          />

          <ScrollView
            contentContainerStyle={styles.pageContainer}
          >
            <Header
              title="📝 GRAMMAIRE"
              subtitle="Programme CM2 — 72 leçons"
              backText="Français"
              onBack={() => setRubrique("FRANCAIS")}
            />

            {CHAPITRES_CM2.map((chapitre) => (
              <TouchableOpacity
                key={chapitre.id}
                style={styles.chapterCard}
                onPress={() =>
                  ouvrirChapitre(chapitre)
                }
              >
                <View style={styles.chapterNumber}>
                  <Text
                    style={styles.chapterNumberText}
                  >
                    {chapitre.id}
                  </Text>
                </View>

                <View style={styles.chapterContent}>
                  <Text style={styles.chapterTitle}>
                    {chapitre.titre}
                  </Text>

                  <Text
                    style={styles.chapterSubtitle}
                  >
                    {chapitre.lecons.length} leçons
                  </Text>
                </View>

                <Text style={styles.chevron}>
                  ›
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    }

    const programme =
      PROGRAMMES_GRAMMAIRE[niveauActuel] || [];

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title="📝 GRAMMAIRE"
            subtitle={`Programme ${niveauActuel}`}
            backText="Français"
            onBack={() => setRubrique("FRANCAIS")}
          />

          {programme.map((titre, index) => (
            <TouchableOpacity
              key={`${niveauActuel}-${index}`}
              style={styles.chapterCard}
              onPress={() =>
                ouvrirLecon({
                  numero: index + 1,
                  titre,
                  chapitre: titre,
                })
              }
            >
              <View style={styles.chapterNumber}>
                <Text
                  style={styles.chapterNumberText}
                >
                  {index + 1}
                </Text>
              </View>

              <View style={styles.chapterContent}>
                <Text style={styles.chapterTitle}>
                  {titre}
                </Text>

                <Text
                  style={styles.chapterSubtitle}
                >
                  Cours • Exercices • Quiz
                </Text>
              </View>

              <Text style={styles.chevron}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     LISTE DES LEÇONS
     ======================================================= */

  if (rubrique === "LECONS") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title="📚 LEÇONS"
            subtitle={chapitreSelectionne?.titre}
            backText="Grammaire"
            onBack={() => setRubrique("GRAMMAIRE")}
          />

          {chapitreSelectionne?.lecons.map(
            (titre, index) => {
              const numero =
                LECONS_CM2.find(
                  (lecon) =>
                    lecon.titre === titre &&
                    lecon.chapitre ===
                      chapitreSelectionne.titre
                )?.numero ||
                index + 1;

              return (
                <TouchableOpacity
                  key={`${chapitreSelectionne.id}-${index}`}
                  style={styles.lessonListCard}
                  onPress={() =>
                    ouvrirLecon({
                      numero,
                      titre,
                      chapitre:
                        chapitreSelectionne.titre,
                    })
                  }
                >
                  <View style={styles.lessonNumber}>
                    <Text
                      style={styles.lessonNumberText}
                    >
                      {numero}
                    </Text>
                  </View>

                  <View style={styles.listContent}>
                    <Text style={styles.listTitle}>
                      {titre}
                    </Text>

                    <Text
                      style={styles.listDescription}
                    >
                      Cours • Exercices • Quiz
                    </Text>
                  </View>

                  <Text style={styles.chevron}>
                    ›
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     LEÇON
     ======================================================= */

  if (rubrique === "LECON") {
    const lecon =
      LECONS_CM2.find(
        (item) =>
          item.numero ===
          leconSelectionnee?.numero
      ) ||
      leconSelectionnee;

    const contenu = obtenirContenu(
      lecon || {
        titre: "Leçon",
      }
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title={`📖 LEÇON ${lecon?.numero || ""}`}
            subtitle={lecon?.chapitre}
            backText="Leçons"
            onBack={() => setRubrique("LECONS")}
          />

          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>
              {lecon?.titre}
            </Text>

            <Text style={styles.lessonHeading}>
              🎯 Objectif
            </Text>

            <Text style={styles.lessonText}>
              {contenu.objectif}
            </Text>

            <Text style={styles.lessonHeading}>
              📘 Explication
            </Text>

            <Text style={styles.lessonText}>
              {contenu.explication}
            </Text>

            <Text style={styles.lessonHeading}>
              📌 Règle
            </Text>

            <View style={styles.ruleBox}>
              <Text style={styles.lessonText}>
                {contenu.regle}
              </Text>
            </View>

            <Text style={styles.lessonHeading}>
              ✏️ Exemples
            </Text>

            <View style={styles.exampleBox}>
              {contenu.exemples.map(
                (exemple, index) => (
                  <Text
                    key={index}
                    style={styles.exampleText}
                  >
                    • {exemple}
                  </Text>
                )
              )}
            </View>

            <Text style={styles.lessonHeading}>
              ✅ Exemples corrigés
            </Text>

            <View style={styles.correctionBox}>
              {contenu.corriges.map(
                (correction, index) => (
                  <Text
                    key={index}
                    style={styles.exampleText}
                  >
                    {index + 1}. {correction}
                  </Text>
                )
              )}
            </View>

            <Text style={styles.lessonHeading}>
              🧠 À retenir
            </Text>

            <Text style={styles.lessonText}>
              {contenu.retenir}
            </Text>
          </View>

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                ongletLecon === "COURS" &&
                  styles.tabButtonActive,
              ]}
              onPress={() =>
                setOngletLecon("COURS")
              }
            >
              <Text
                style={[
                  styles.tabText,
                  ongletLecon === "COURS" &&
                    styles.tabTextActive,
                ]}
              >
                COURS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                ongletLecon === "EXERCICES" &&
                  styles.tabButtonActive,
              ]}
              onPress={() =>
                setOngletLecon("EXERCICES")
              }
            >
              <Text
                style={[
                  styles.tabText,
                  ongletLecon === "EXERCICES" &&
                    styles.tabTextActive,
                ]}
              >
                EXERCICES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                ongletLecon === "QUIZ" &&
                  styles.tabButtonActive,
              ]}
              onPress={() =>
                setOngletLecon("QUIZ")
              }
            >
              <Text
                style={[
                  styles.tabText,
                  ongletLecon === "QUIZ" &&
                    styles.tabTextActive,
                ]}
              >
                QUIZ
              </Text>
            </TouchableOpacity>
          </View>

          {ongletLecon === "COURS" && (
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                📖 Cours terminé
              </Text>

              <Text style={styles.infoSmall}>
                Lis attentivement le cours puis
                passe aux exercices.
              </Text>
            </View>
          )}

          {ongletLecon === "EXERCICES" && (
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                📝 Exercices
              </Text>

              <Text style={styles.infoSmall}>
                10 exercices avec trois niveaux :
                facile, moyen et difficile.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={demarrerExercices}
              >
                <Text
                  style={styles.primaryButtonText}
                >
                  COMMENCER LES EXERCICES
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {ongletLecon === "QUIZ" && (
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                🧠 Quiz
              </Text>

              <Text style={styles.infoSmall}>
                10 questions avec correction
                immédiate.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={demarrerQuiz}
              >
                <Text
                  style={styles.primaryButtonText}
                >
                  COMMENCER LE QUIZ
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     AUTRES RUBRIQUES FRANÇAIS
     ======================================================= */

  if (rubrique === "RUBRIQUE_FRANCAIS") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title={`${
              rubriqueFrancaisSelectionnee?.icon || "📚"
            } ${
              rubriqueFrancaisSelectionnee?.nom ||
              "Français"
            }`}
            subtitle={`Niveau ${eleveConnecte?.niveau}`}
            backText="Français"
            onBack={() => setRubrique("FRANCAIS")}
          />

          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderIcon}>
              📚
            </Text>

            <Text style={styles.placeholderTitle}>
              Contenu pédagogique
            </Text>

            <Text style={styles.placeholderText}>
              Cette rubrique est prête à recevoir
              ses cours, exercices et quiz.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     AUTRES MATIÈRES
     ======================================================= */

  if (rubrique === "MATIERE") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title={`${
              matiereSelectionnee?.icon || "📚"
            } ${
              matiereSelectionnee?.nom || "Matière"
            }`}
            subtitle={`Niveau ${eleveConnecte?.niveau}`}
            backText="Matières"
            onBack={() => setRubrique("MATIERES")}
          />

          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderIcon}>
              🚧
            </Text>

            <Text style={styles.placeholderTitle}>
              Contenu en préparation
            </Text>

            <Text style={styles.placeholderText}>
              Les cours, exercices et quiz de cette
              matière seront ajoutés progressivement.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     EXERCICES
     ======================================================= */

  if (rubrique === "EXERCICES") {
    if (exerciceTermine) {
      const pourcentage = Math.round(
        (scoreExercice / EXERCICES.length) * 100
      );

      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#123C69"
          />

          <ScrollView
            contentContainerStyle={styles.pageContainer}
          >
            <Text style={styles.screenTitle}>
              📝 RÉSULTAT
            </Text>

            <View style={styles.resultCard}>
              <Text style={styles.resultEmoji}>
                {pourcentage >= 70 ? "🎉" : "💪"}
              </Text>

              <Text style={styles.resultTitle}>
                Exercices terminés
              </Text>

              <Text style={styles.resultScore}>
                {scoreExercice} / {EXERCICES.length}
              </Text>

              <Text style={styles.resultPercentage}>
                {pourcentage}%
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={demarrerExercices}
            >
              <Text
                style={styles.primaryButtonText}
              >
                🔄 RECOMMENCER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                retourAccueil();
                setEcran("MENU");
              }}
            >
              <Text
                style={styles.secondaryButtonText}
              >
                ← RETOUR À L'ACCUEIL
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    }

    const question =
      EXERCICES[questionExercice];

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title="📝 EXERCICES"
            backText="Accueil"
            onBack={() => {
              retourAccueil();
              setEcran("MENU");
            }}
          />

          <Text style={styles.questionCounter}>
            {question.niveau} — Question{" "}
            {questionExercice + 1} / {EXERCICES.length}
          </Text>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {question.question}
            </Text>
          </View>

          {question.options.map(
            (option, index) => {
              const estBonne =
                index === question.reponse;

              const estChoisie =
                index === reponseSelectionnee;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    correctionVisible &&
                      estBonne &&
                      styles.correctOption,
                    correctionVisible &&
                      estChoisie &&
                      !estBonne &&
                      styles.wrongOption,
                  ]}
                  onPress={() =>
                    repondreExercice(index)
                  }
                >
                  <Text
                    style={styles.optionLetter}
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                  </Text>

                  <Text style={styles.optionText}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}

          {correctionVisible && (
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackTitle}>
                {reponseSelectionnee ===
                question.reponse
                  ? "✅ Bonne réponse"
                  : "❌ Réponse incorrecte"}
              </Text>

              <Text style={styles.feedbackText}>
                {question.correction}
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={continuerExercice}
              >
                <Text
                  style={styles.primaryButtonText}
                >
                  {questionExercice ===
                  EXERCICES.length - 1
                    ? "VOIR LE RÉSULTAT"
                    : "QUESTION SUIVANTE →"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     QUIZ
     ======================================================= */

  if (rubrique === "QUIZ") {
    if (quizTermine) {
      const pourcentage = Math.round(
        (scoreQuiz / QUIZ.length) * 100
      );

      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#123C69"
          />

          <ScrollView
            contentContainerStyle={styles.pageContainer}
          >
            <Text style={styles.screenTitle}>
              🧠 RÉSULTAT DU QUIZ
            </Text>

            <View style={styles.resultCard}>
              <Text style={styles.resultEmoji}>
                {pourcentage >= 70 ? "🏆" : "📚"}
              </Text>

              <Text style={styles.resultTitle}>
                Quiz terminé
              </Text>

              <Text style={styles.resultScore}>
                {scoreQuiz} / {QUIZ.length}
              </Text>

              <Text style={styles.resultPercentage}>
                {pourcentage}%
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={demarrerQuiz}
            >
              <Text
                style={styles.primaryButtonText}
              >
                🔄 RECOMMENCER LE QUIZ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                retourAccueil();
                setEcran("MENU");
              }}
            >
              <Text
                style={styles.secondaryButtonText}
              >
                ← RETOUR À L'ACCUEIL
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    }

    const question = QUIZ[questionQuiz];

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#123C69"
        />

        <ScrollView contentContainerStyle={styles.pageContainer}>
          <Header
            title="🧠 QUIZ"
            backText="Accueil"
            onBack={() => {
              retourAccueil();
              setEcran("MENU");
            }}
          />

          <Text style={styles.questionCounter}>
            {question.niveau} — Question{" "}
            {questionQuiz + 1} / {QUIZ.length}
          </Text>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {question.question}
            </Text>
          </View>

          {question.options.map(
            (option, index) => {
              const estBonne =
                index === question.reponse;

              const estChoisie =
                index === reponseSelectionnee;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    correctionVisible &&
                      estBonne &&
                      styles.correctOption,
                    correctionVisible &&
                      estChoisie &&
                      !estBonne &&
                      styles.wrongOption,
                  ]}
                  onPress={() =>
                    repondreQuiz(index)
                  }
                >
                  <Text
                    style={styles.optionLetter}
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                  </Text>

                  <Text style={styles.optionText}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}

          {correctionVisible && (
            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackTitle}>
                {reponseSelectionnee ===
                question.reponse
                  ? "✅ Bonne réponse"
                  : "❌ Réponse incorrecte"}
              </Text>

              <Text style={styles.feedbackText}>
                {question.correction}
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={continuerQuiz}
              >
                <Text
                  style={styles.primaryButtonText}
                >
                  {questionQuiz === QUIZ.length - 1
                    ? "VOIR LE RÉSULTAT"
                    : "QUESTION SUIVANTE →"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* =======================================================
     SÉCURITÉ NAVIGATION
     ======================================================= */

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Une erreur de navigation est survenue.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            setEcran("BIENVENUE");
            retourAccueil();
          }}
        >
          <Text style={styles.primaryButtonText}>
            RETOUR À L'ACCUEIL
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  centerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  pageContainer: {
    padding: 20,
    paddingBottom: 50,
  },

  dashboardContainer: {
    padding: 18,
    paddingBottom: 50,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#123C69",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "bold",
  },

  appTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#123C69",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    color: "#607080",
    fontSize: 15,
    textAlign: "center",
  },

  welcomeCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    marginTop: 30,
    marginBottom: 20,
    elevation: 3,
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#123C69",
    marginBottom: 12,
  },

  welcomeText: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 23,
    marginBottom: 8,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#123C69",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  secondaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#123C69",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "bold",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    marginBottom: 15,
  },

  backButtonText: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "600",
  },

  screenTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#123C69",
    marginBottom: 6,
  },

  screenSubtitle: {
    color: "#687585",
    fontSize: 15,
    marginBottom: 22,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE8",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 13,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 7,
  },

  selectInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE8",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectText: {
    color: "#1F2937",
    fontSize: 16,
  },

  placeholderText: {
    color: "#9AA4B2",
    fontSize: 16,
  },

  arrowText: {
    color: "#123C69",
    fontWeight: "bold",
  },

  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7DEE8",
    borderRadius: 12,
    marginBottom: 13,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F5",
  },

  dropdownText: {
    fontSize: 16,
    color: "#1F2937",
  },

  linkButton: {
    alignItems: "center",
    marginTop: 18,
  },

  linkText: {
    color: "#123C69",
    fontSize: 15,
    fontWeight: "600",
  },

  dashboardHeader: {
    backgroundColor: "#123C69",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#123C69",
  },

  headerInfo: {
    flex: 1,
  },

  helloText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 7,
  },

  levelBadge: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },

  dashboardTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#123C69",
    marginBottom: 5,
  },

  dashboardSubtitle: {
    color: "#64748B",
    marginBottom: 18,
  },

  dashboardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  dashboardCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 17,
    marginBottom: 14,
    minHeight: 145,
    elevation: 2,
  },

  cardIcon: {
    fontSize: 34,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#123C69",
    marginBottom: 7,
  },

  cardDescription: {
    color: "#64748B",
    fontSize: 12,
    lineHeight: 17,
  },

  infoBox: {
    backgroundColor: "#EAF2FA",
    borderRadius: 15,
    padding: 17,
    marginTop: 10,
  },

  infoTitle: {
    color: "#123C69",
    fontSize: 16,
    fontWeight: "bold",
  },

  infoText: {
    color: "#123C69",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },

  infoSmall: {
    color: "#526579",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },

  logoutButton: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 13,
  },

  logoutText: {
    color: "#B42318",
    fontWeight: "bold",
    fontSize: 14,
  },

  inlineSection: {
    width: "100%",
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#123C69",
    marginBottom: 14,
  },

  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  listIcon: {
    fontSize: 30,
    marginRight: 14,
  },

  listContent: {
    flex: 1,
  },

  listTitle: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 4,
  },

  listDescription: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },

  chevron: {
    fontSize: 30,
    color: "#94A3B8",
    marginLeft: 8,
  },

  smallBackButton: {
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 12,
  },

  smallBackText: {
    color: "#123C69",
    fontWeight: "600",
  },

  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
  },

  progressLabel: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 5,
  },

  progressValue: {
    color: "#123C69",
    fontSize: 25,
    fontWeight: "bold",
  },

  chapterCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  chapterNumber: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#123C69",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  chapterNumberText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  chapterContent: {
    flex: 1,
  },

  chapterTitle: {
    color: "#123C69",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 21,
  },

  chapterSubtitle: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },

  lessonListCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF2FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  lessonNumberText: {
    color: "#123C69",
    fontWeight: "bold",
  },

  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 19,
    elevation: 2,
    marginBottom: 18,
  },

  lessonTitle: {
    color: "#123C69",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 18,
  },

  lessonHeading: {
    color: "#123C69",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 13,
    marginBottom: 7,
  },

  lessonText: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 23,
  },

  ruleBox: {
    backgroundColor: "#FFF8E7",
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },

  exampleBox: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 14,
    marginTop: 5,
  },

  correctionBox: {
    backgroundColor: "#EEF8F0",
    borderRadius: 12,
    padding: 14,
    marginTop: 5,
  },

  exampleText: {
    color: "#334155",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 5,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
    elevation: 2,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 9,
  },

  tabButtonActive: {
    backgroundColor: "#123C69",
  },

  tabText: {
    color: "#123C69",
    fontSize: 12,
    fontWeight: "bold",
  },

  tabTextActive: {
    color: "#FFFFFF",
  },

  placeholderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    elevation: 2,
    marginTop: 10,
  },

  placeholderIcon: {
    fontSize: 45,
    marginBottom: 15,
  },

  placeholderTitle: {
    color: "#123C69",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  placeholderText: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  questionCounter: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  questionCard: {
    backgroundColor: "#123C69",
    borderRadius: 17,
    padding: 22,
    marginBottom: 17,
  },

  questionText: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "bold",
  },

  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  optionLetter: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#EAF2FA",
    color: "#123C69",
    textAlign: "center",
    paddingTop: 8,
    fontWeight: "bold",
    marginRight: 12,
  },

  optionText: {
    flex: 1,
    color: "#1F2937",
    fontSize: 15,
    lineHeight: 21,
  },

  correctOption: {
    borderWidth: 2,
    borderColor: "#18864B",
  },

  wrongOption: {
    borderWidth: 2,
    borderColor: "#B42318",
  },

  feedbackCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginTop: 4,
    elevation: 2,
  },

  feedbackTitle: {
    color: "#123C69",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
  },

  feedbackText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 21,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 3,
    marginTop: 15,
    marginBottom: 20,
  },

  resultEmoji: {
    fontSize: 55,
    marginBottom: 10,
  },

  resultTitle: {
    color: "#123C69",
    fontSize: 22,
    fontWeight: "bold",
  },

  resultScore: {
    color: "#123C69",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 15,
  },

  resultPercentage: {
    color: "#64748B",
    fontSize: 18,
    marginTop: 5,
  },

  errorText: {
    color: "#B42318",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 15,
  },
});