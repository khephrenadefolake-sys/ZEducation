const GRAPHIES=["a","i","o","u","é","è","e","m","l","r","s","t","p","d","n","f","v","b","c","k","j","g","ch","ou","on","an","en","in","un","oi","ai","ei","au","eau","eu","oeu","gn","ill","qu","gu","ph","th","tion"];
export const LETTRES_GROUPES_CP2=GRAPHIES.map((graphie,i)=>({
 id:`cp2_graphie_${i+1}`,
 numero:i+1,
 graphie,
 type:graphie.length===1?"lettre":"groupe_de_lettres",
 activites:["Identifier","Prononcer","Lire des syllabes","Lire des mots","Écrire","Réinvestir"]
}));
export default LETTRES_GROUPES_CP2;
