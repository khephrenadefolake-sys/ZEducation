const MOTS=["le","la","les","un","une","des","du","de","à","au","aux","et","est","dans","sur","avec","pour","qui","que","ce","cette","ces","mon","ma","mes","son","sa","ses","je","tu","il","elle","nous","vous","ils","elles","mais","car","où"];
export const MOTS_OUTILS_CP2=MOTS.map((mot,i)=>({
 id:`mot_${i+1}`,
 mot,
 activites:["Lire","Reconnaître dans une phrase","Recopier","Utiliser dans une phrase"]
}));
export default MOTS_OUTILS_CP2;
