/**
 * Renvoie une fonction qui génère un nouvel id à chaque appel
 */
export const handleId = () => {
  let id = 1;
  
  return () => id++
}