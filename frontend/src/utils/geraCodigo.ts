// utils/geraCodigo.ts
//função que gera um cogido aleatorio com 6 digitos
export function geraCodigo() {
  return Math.floor(100000 + Math.random() * 900000);
}