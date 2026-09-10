// =========================================================
// ZEGBE EDUCATION CLUB
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
    id: "comprehension",
    nom: "Compréhension",
    icon: "🧠",
  },
  {
    id: "expression_orale",
    nom: "Expression orale",
    icon: "💬",
  },
  {
    id: "vocabulaire",
    nom: "Vocabulaire",
    icon: "🔤",
  },
  {
    id: "dechiffrage",
    nom: "Déchiffrage",
    icon: "🔎",
  },
  {
    id: "encodage",
    nom: "Encodage",
    icon: "🔡",
  },
  {
    id: "activites_apprentissage",
    nom: "Activités d'apprentissage",
    icon: "🎯",
  },
  {
    id: "exercices",
    nom: "Exercices",
    icon: "✏️",
  },
  {
    id: "evaluation",
    nom: "Évaluation",
    icon: "📝",
  },
];

const contenuFrancaisCP = {
  lecture: {
    description: "Reconnaître les lettres et les sons pour lire des syllabes, des mots et de petites phrases.",
    lecons: [
      {
        id: "lecture_lecon_cp1_cp2",
        titre: "Lecture : des lettres aux mots",
        objectif: "Reconnaître des lettres, les sons associés, lire des syllabes et des mots simples, puis de petites phrases.",
        contenu: "Lire, c'est regarder des signes écrits, reconnaître les lettres et les sons, puis comprendre ce qui est écrit. La lecture se construit progressivement : lettre → son → syllabe → mot → phrase → compréhension. Une lettre peut être associée à un son : m → /m/ et a → /a/. Lorsque l'on rapproche les sons, on obtient une syllabe : /m/ + /a/ → ma.",
        figures: [
          "ÉTAPE 1 : m → /m/   |   a → /a/",
          "ÉTAPE 2 : /m/ + /a/ → MA",
          "ÉTAPE 3 : MA + MA → MAMA",
          "ÉTAPE 4 : Maman a un sac. → Je lis et je comprends.",
        ],
        exemples: [
          "m + a = ma",
          "m + i = mi",
          "l + a = la",
          "l + i = li",
          "ma + ma = mama",
          "ma + li = mali",
          "la + ma = lama",
        ],
        manipulations: [
          "Observe m - a - i - l, puis associe les lettres pour former : ma, mi, la, li.",
          "Dis lentement /m/ ... /a/, puis accélère pour entendre ma.",
          "Lis ma-ma en deux syllabes, puis réunis-les pour lire mama.",
        ],
        exercices: [
          "Exercice 1 - Lis : ma - mi - la - li.",
          "Exercice 2 - Assemble : m + a = ___ ; l + i = ___.",
          "Exercice 3 - Lis : mama - mali - lama.",
          "Exercice 4 - Lis la phrase : Maman a un sac.",
        ],
        corriges: [
          "Exercice 1 : ma - mi - la - li.",
          "Exercice 2 : ma ; li.",
          "Exercice 3 : mama ; mali ; lama.",
          "Exercice 4 : l'élève lit la phrase et explique qu'une maman possède un sac.",
        ],
      },
    ],
  },
  ecriture: {
    description: "Un parcours en quatre chapitres : préparer le geste, former les lettres, écrire des syllabes et des mots, puis produire des phrases.",
    lecons: [
      {
        id: "ecriture_chapitre_1",
        titre: "CHAPITRE 1 - Préparer le geste d'écriture",
        objectif: "Adopter une posture stable, tenir correctement le crayon et contrôler les mouvements de la main pour préparer l'écriture des lettres.",
        contenu: "Avant de former une lettre, l'enfant doit installer son corps et son matériel. Il s'assoit le dos droit, les pieds posés au sol et le cahier légèrement incliné. La main qui écrit tient le crayon sans le serrer trop fort ; l'autre main maintient la feuille. Le regard suit le mouvement de la pointe. On commence par de grands gestes, puis on réduit progressivement leur taille.",
        figures: [
          "POSTURE : dos droit + pieds au sol + feuille bien placée",
          "TENUE : pouce et index guident le crayon, le majeur le soutient",
          "PROGRESSION : grand geste → geste moyen → geste précis",
          "MOTIFS : | | | |   — — — —   ○ ○ ○   ∩ ∩ ∩   / / /",
        ],
        exemples: [
          "Lignes verticales : | | | | |",
          "Lignes horizontales : — — — — —",
          "Ronds : ○ ○ ○ ○",
          "Ponts : ∩ ∩ ∩ ∩",
          "Obliques : / / / /",
        ],
        manipulations: [
          "Tracer les motifs dans l'air avec le bras, puis avec l'index sur la table.",
          "Repasser sur un modèle en suivant le sens de la flèche sans lever le crayon.",
          "Tracer une ligne continue entre deux repères en gardant une pression régulière.",
        ],
        exercices: [
          "Exercice 1 - Trace cinq lignes verticales régulières.",
          "Exercice 2 - Trace des ronds de même taille.",
          "Exercice 3 - Entoure le dessin qui respecte la ligne d'écriture.",
        ],
        corriges: [
          "Exercice 1 : les lignes doivent être droites, séparées et orientées dans le même sens.",
          "Exercice 2 : les ronds doivent être fermés et de taille proche.",
          "Exercice 3 : le modèle correct reste posé sur la ligne et ne déborde pas sans raison.",
        ],
      },
      {
        id: "ecriture_chapitre_2",
        titre: "CHAPITRE 2 - Former les lettres",
        objectif: "Reproduire les lettres étudiées en respectant leur forme, leur sens de tracé, leur taille et leur position sur la ligne.",
        contenu: "L'enfant observe d'abord la lettre entière. Il repère son point de départ, son sens de déplacement, les changements de direction et le point d'arrivée. Il suit ensuite le tracé avec le doigt, le reproduit dans l'air, puis l'écrit au crayon. Pour les premières lettres, on peut partir de formes simples : le rond de a, la grande ligne de l et le pont de m.",
        figures: [
          "a : commencer par le rond, puis ajouter la petite barre de sortie",
          "l : monter, redescendre sans trembler, puis terminer sur la ligne",
          "m : descendre, remonter, former deux ponts et revenir sur la ligne",
          "i : descendre, remonter, puis placer le point au-dessus",
        ],
        exemples: [
          "Modèle : a   →   a a a a",
          "Modèle : m   →   m m m m",
          "Modèle : l   →   l l l l",
          "Modèle : i   →   i i i i",
        ],
        manipulations: [
          "Nommer le point de départ et le sens du tracé avant d'écrire.",
          "Suivre la lettre avec le doigt, puis la tracer dans l'air en disant les étapes.",
          "Comparer deux lettres et repérer celle qui respecte la forme et la ligne.",
        ],
        exercices: [
          "Exercice 1 - Repasse sur les modèles a, m, l et i.",
          "Exercice 2 - Copie chaque lettre cinq fois sur la ligne.",
          "Exercice 3 - Barre la lettre qui ne ressemble pas au modèle.",
        ],
        corriges: [
          "Exercice 1 : le tracé suit le modèle sans rupture inutile.",
          "Exercice 2 : les lettres doivent garder la même forme, la même taille et rester posées sur la ligne.",
          "Exercice 3 : la lettre incorrecte est celle dont le sens, la forme ou la taille ne correspond pas au modèle.",
        ],
      },
      {
        id: "ecriture_chapitre_3",
        titre: "CHAPITRE 3 - Écrire des syllabes et des mots",
        objectif: "Combiner les lettres pour écrire des syllabes et des mots simples en respectant l'ordre des lettres, les espaces et la lisibilité.",
        contenu: "Après avoir appris les lettres, l'enfant les assemble pour écrire ce qu'il sait lire. Il écoute ou prononce la syllabe, identifie chaque son, choisit la lettre correspondante et les écrit dans le bon ordre. Il relit ensuite sa production. L'écriture doit être liée au sens : ma correspond à /m/ + /a/, et mama est formé de ma + ma.",
        figures: [
          "SONS : /m/ + /a/ → LETTRES : m + a → SYLLABE : ma",
          "ma + mi → m a m i",
          "ma + ma → m a m a → mama",
          "Mot : Lili → L i l i",
        ],
        exemples: [
          "ma - mi - la - li",
          "mama - mali - lama",
          "Lili",
          "un sac",
        ],
        manipulations: [
          "Dire la syllabe lentement et lever un doigt pour chaque son entendu.",
          "Construire la syllabe avec des lettres mobiles avant de la copier.",
          "Relire le mot écrit et vérifier qu'aucune lettre ne manque.",
        ],
        exercices: [
          "Exercice 1 - Écris sous la dictée : ma, mi, la, li.",
          "Exercice 2 - Assemble m + a, l + i et m + a + m + a.",
          "Exercice 3 - Copie les mots : mama, mali, lama et Lili.",
        ],
        corriges: [
          "Exercice 1 : ma ; mi ; la ; li.",
          "Exercice 2 : ma ; li ; mama.",
          "Exercice 3 : les mots sont correctement copiés sans lettre oubliée ni ajoutée.",
        ],
      },
      {
        id: "ecriture_chapitre_4",
        titre: "CHAPITRE 4 - Construire et produire une phrase",
        objectif: "Écrire une phrase lisible et compréhensible en utilisant une majuscule, des espaces entre les mots et un point final.",
        contenu: "Une phrase est une suite de mots qui transmet un message. L'enfant commence par dire la phrase à l'oral, puis compte les mots. Il écrit chaque mot dans l'ordre, laisse un espace entre deux mots, commence par une majuscule et termine par un point. Après l'écriture, il relit lentement pour vérifier le sens et la ponctuation.",
        figures: [
          "MAJUSCULE : Lili",
          "ESPACE : Lili _ a _ un _ sac.",
          "POINT FINAL : Lili a un sac.",
          "PHRASE : [Lili] [a] [un] [sac].",
        ],
        exemples: [
          "Lili a un sac.",
          "Maman lit.",
          "Awa a une poupée.",
        ],
        manipulations: [
          "Remettre les mots Lili / a / un / sac dans l'ordre.",
          "Ajouter une majuscule au début et un point à la fin.",
          "Relire la phrase en suivant chaque mot avec le doigt.",
        ],
        exercices: [
          "Exercice 1 - Copie : Lili a un sac.",
          "Exercice 2 - Remets les mots dans l'ordre : sac / un / Lili / a.",
          "Exercice 3 - Écris une phrase avec les mots Maman et lit.",
        ],
        corriges: [
          "Exercice 1 : Lili a un sac.",
          "Exercice 2 : Lili a un sac.",
          "Exercice 3 : exemple attendu : Maman lit.",
        ],
      },
    ],
  },
  comprehension: {
    description: "Comprendre des phrases, des images et de petites histoires.",
    lecons: [
      { id: "comprehension_phrase", titre: "Comprendre une phrase", objectif: "Répondre à des questions simples sur une phrase lue.", contenu: "Awa a une poupée. Qui a une poupée ? Awa. Qu'a Awa ? Une poupée." },
      { id: "comprehension_image", titre: "Comprendre une image", objectif: "Observer une scène et choisir la réponse correcte.", contenu: "L'enfant observe une image d'un enfant qui mange une banane, puis répond : Il mange." },
      { id: "comprehension_histoire", titre: "Comprendre une petite histoire", objectif: "Repérer les personnages, les lieux et les actions.", contenu: "Koffi va à l'école. Il porte son sac. Dans son sac, il a un livre et un cahier. Où va Koffi ? Que porte-t-il ? Que trouve-t-on dans son sac ?" },
    ],
  },
  expression_orale: {
    description: "Utiliser le langage pour saluer, se présenter et décrire.",
    lecons: [
      { id: "expression_se_presenter", titre: "Se présenter", objectif: "Répondre à des questions personnelles.", contenu: "Comment t'appelles-tu ? Je m'appelle Awa. Quel âge as-tu ? J'ai six ans. Où habites-tu ? J'habite à Koumassi." },
      { id: "expression_classe", titre: "Décrire une classe", objectif: "Décrire progressivement une image.", contenu: "Je vois une classe. Je vois des élèves. Les élèves sont assis dans la classe et écoutent le maître." },
    ],
  },
  vocabulaire: {
    description: "Acquérir les mots du monde réel de l'enfant.",
    lecons: [],
  },
  dechiffrage: {
    description: "Passer progressivement de la lettre à la phrase.",
    lecons: [
      { id: "dechiffrage_progressif", titre: "Les étapes du déchiffrage", objectif: "Lire en reliant lettre, son, syllabe, mot et phrase.", contenu: "m ; /m/ ; m + a = ma ; ma + mi ; mama ; Maman a un sac." },
      { id: "dechiffrage_fusion", titre: "Fusionner les sons", objectif: "Fusionner deux sons entendus lentement.", contenu: "/m/ ... /a/ = ma. Puis /l/ ... /i/ = li. L'enfant identifie aussi le mot qui commence par /m/ : maman." },
    ],
  },
  encodage: {
    description: "Passer du son entendu vers l'écriture.",
    lecons: [
      { id: "encodage_syllabes", titre: "Encoder des syllabes", objectif: "Écrire une syllabe entendue.", contenu: "L'application dit ma, puis l'enfant écrit ma. Même activité avec mi." },
      { id: "encodage_mots", titre: "Encoder un mot", objectif: "Décomposer un mot en sons puis l'écrire.", contenu: "Pour mama, entendre m - a - m - a, écrire m a m a, puis réunir les lettres pour former mama." },
    ],
  },
  activites_apprentissage: {
    description: "Écouter, trouver, associer, construire, lire et écrire.",
    lecons: [
      { id: "activite_ecouter", titre: "Écouter et trouver", objectif: "Identifier un son et sa lettre.", contenu: "L'application prononce /m/. L'enfant choisit m parmi m, l et a, puis trouve toutes les lettres a dans m - a - l - a - i - a." },
      { id: "activite_associer", titre: "Associer et construire", objectif: "Associer les lettres aux sons et construire une syllabe.", contenu: "m → /m/ ; a → /a/ ; M + A → MA." },
      { id: "activite_lire_ecrire", titre: "Lire et écrire", objectif: "Réinvestir les apprentissages dans une activité courte.", contenu: "Lire ma - mi - la - li, puis écrire ma lorsque l'application le prononce." },
    ],
  },
  exercices: {
    description: "S'entraîner en reconnaissance, sons, syllabes, encodage et compréhension.",
    lecons: [
      { id: "exercices_reconnaissance", titre: "Reconnaître et écouter", objectif: "Identifier une lettre et un son.", contenu: "Entourer a dans m - a - l - i - a - m. Quel son entends-tu au début de maman ? Réponse : /m/." },
      { id: "exercices_lecture", titre: "Lire et encoder", objectif: "Lire des syllabes et encoder des mots simples.", contenu: "Lire ma - mi - la - li. Écrire ma, mi et la. Lire : Lili a un sac. Question : Qu'a Lili ? Un sac." },
    ],
  },
  evaluation: {
    description: "Vérifier les compétences de lecture-écriture et de compréhension.",
    lecons: [
      { id: "evaluation_francais", titre: "Évaluation de Français", objectif: "Reconnaître, écouter, déchiffrer, encoder et comprendre.", contenu: "L'enfant doit reconnaître 5 lettres, identifier 5 sons, lire 5 syllabes, lire 2 ou 3 mots, lire une courte phrase et répondre à une question simple." },
    ],
  },
};

RUBRIQUES_CP.forEach((rubrique) => {
  const contenu = contenuFrancaisCP[rubrique.id];
  if (contenu) {
    Object.assign(rubrique, contenu);
  }
});

export const RUBRIQUES_FRANCAIS_CP1 = RUBRIQUES_CP;
export const RUBRIQUES_FRANCAIS_CP2 = RUBRIQUES_CP;

export const LECONS_GRAMMAIRE_CM2 = [
  "Les types de phrases",
  "Les formes de phrases",
  "La phrase simple",
  "La phrase complexe",
  "Les constituants de la phrase",
  "Le groupe nominal",
  "Le groupe verbal",
  "Le nom et les déterminants",
  "Les pronoms et l'adjectif qualificatif",
  "Le complément du nom",
  "Le verbe et les compléments",
  "Le COD, le COI et le COS",
  "Les compléments circonstanciels",
  "Les propositions coordonnées et juxtaposées",
  "Les propositions subordonnées",
  "Les propositions subordonnées relatives",
  "Les propositions subordonnées complétives",
  "Les propositions subordonnées circonstancielles",
  "Le discours direct et le discours indirect",
  "La voix active et la voix passive",
  "L'analyse grammaticale et logique",
];

export const LECONS_ORTHOGRAPHE_CM2 = [
  "Le pluriel des noms et des adjectifs",
  "Les accords dans le groupe nominal",
  "L'accord du sujet et du verbe",
  "L'accord du participe passé",
  "Les homophones grammaticaux : a/à, et/est, son/sont",
  "Les homophones grammaticaux : on/ont, ou/où, ce/se",
  "Les homophones grammaticaux : ces/ses, c'est/s'est",
  "Les mots invariables",
  "Les lettres finales muettes",
  "Les accents et le tréma",
  "Les familles de mots et les lettres muettes",
  "La révision orthographique d'un texte",
];

export const LECONS_VOCABULAIRE_CM2 = [
  "Le dictionnaire et la recherche d'un mot",
  "L'ordre alphabétique",
  "Les différents sens d'un mot",
  "Le sens propre et le sens figuré",
  "Les synonymes",
  "Les antonymes",
  "Les homonymes",
  "Les familles de mots",
  "Les préfixes",
  "Les suffixes",
  "Les mots génériques et les mots particuliers",
  "Les niveaux de langue",
  "Les expressions et les locutions",
];

export const LECONS_EXPRESSION_ECRITE_CM2 = [
  "La phrase et l'organisation des idées",
  "Décrire une personne, un lieu ou un objet",
  "Raconter un événement dans l'ordre chronologique",
  "Écrire un dialogue",
  "Rédiger une lettre personnelle",
  "Rédiger un récit avec un début, un développement et une fin",
  "Utiliser des connecteurs pour enchaîner les idées",
  "Enrichir une phrase avec des expansions",
  "Réviser et améliorer un texte",
];

// =========================================================
// RUBRIQUES MATHÉMATIQUES CP1 / CP2
// =========================================================

export const RUBRIQUES_MATHEMATIQUES_CP = [
  {
    id: "structuration_milieu",
    nom: "Structuration du milieu",
    icon: "🧭",
  },
  {
    id: "activites_prenumeriques",
    nom: "Activités pré-numériques",
    icon: "🔷",
  },
  {
    id: "nombres",
    nom: "Nombres",
    icon: "🔢",
  },
  {
    id: "calcul",
    nom: "Calcul",
    icon: "➕",
  },
  {
    id: "problemes",
    nom: "Résolution de problèmes",
    icon: "🧩",
  },
  {
    id: "geometrie",
    nom: "Géométrie",
    icon: "📐",
  },
  {
    id: "mesures",
    nom: "Grandeurs et mesures",
    icon: "📏",
  },
];

export const RUBRIQUES_MATHEMATIQUES_CP1 = RUBRIQUES_MATHEMATIQUES_CP;
export const RUBRIQUES_MATHEMATIQUES_CP2 = RUBRIQUES_MATHEMATIQUES_CP;

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
    lecons: [
      {
        id: "conjugaison_present_groupes",
        titre: "Le présent de l'indicatif des verbes du 1er, 2e et 3e groupe",
      },
      {
        id: "conjugaison_imparfait_groupes",
        titre: "L'imparfait de l'indicatif des verbes du 1er, 2e et 3e groupe",
      },
      {
        id: "conjugaison_futur_groupes",
        titre: "Le futur simple de l'indicatif des verbes du 1er, 2e et 3e groupe",
      },
      {
        id: "conjugaison_passe_compose",
        titre: "Le passé composé de l'indicatif avec avoir et être",
      },
      {
        id: "conjugaison_plus_que_parfait",
        titre: "Le plus-que-parfait de l'indicatif",
      },
      {
        id: "conjugaison_passe_simple",
        titre: "Le passé simple de l'indicatif",
      },
      {
        id: "conjugaison_imperatif_present",
        titre: "L'impératif présent",
      },
      {
        id: "conjugaison_conditionnel_present",
        titre: "Le conditionnel présent",
      },
      {
        id: "conjugaison_concordance_temps",
        titre: "La concordance des temps",
      },
      {
        id: "conjugaison_transformation_temps",
        titre: "La transformation des temps",
      },
    ],
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
  RUBRIQUES_FRANCAIS_CP1,
  RUBRIQUES_FRANCAIS_CP2,
  RUBRIQUES_MATHEMATIQUES_CP1,
  RUBRIQUES_MATHEMATIQUES_CP2,
  RUBRIQUES_CE_CM,
};