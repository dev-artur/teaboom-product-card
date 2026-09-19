export const PRODUCT = {
  name: 'Ананасовый улун',
  variants: [
    { id: '100', weight: '100 г', sku: '01306', price: 326.4, oldPrice: 349.2 },
    { id: '500', weight: '500 г', sku: '01307', price: 1432, oldPrice: 1646 },
    { id: '1000', weight: '1000 г', sku: '01308', price: 2064, oldPrice: 2592 },
    { id: '5000', weight: '5000 г', sku: '01309', price: 6320, oldPrice: 8710 },
  ],
};

const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
});

export function formatPrice(value) {
  return rubFormatter.format(value).replace(/\s?₽/, ' ₽');
}

export function getDiscount({ price, oldPrice }) {
  return Math.round((1 - price / oldPrice) * 100);
}
