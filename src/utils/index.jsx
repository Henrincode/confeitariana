// Reduz o tamanho da string maior que max
export function charMax(string, max) {
  if (string.length > max) {
    return `${string.slice(0, max)}...`;
  }
  return string;
}

// Pega a ID da categoria e retorna seu nome
export function nomeCategoria(id, banco) {
  return banco.find((categoria) => categoria.id === id).nome;
}
