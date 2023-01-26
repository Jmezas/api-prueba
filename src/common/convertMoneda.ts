export function ConvertMoneda(moneda) {
  let currency;
  switch (moneda) {
    case 'PEN':
      currency = 'SOLES';
      break;
    case 'USD':
      currency = 'DOLARES';
      break;
    default:
      break;
  }
  return currency;
}
