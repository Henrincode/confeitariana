// Tamanho máximo de um texto
export function charMax(string, max) {
  if (string.length > max) {
    return `${string.slice(0, max)}...`;
  }
  return string;
}
