import '../styles/main.scss';
import { PRODUCT, formatPrice, getDiscount } from './product.js';

const variantsList = document.querySelector('[data-variants] .variants__list');
const priceEl = document.querySelector('[data-price]');
const oldPriceEl = document.querySelector('[data-old-price]');
const badgeEl = document.querySelector('[data-badge]');
const galleryBadgeEl = document.querySelector('[data-discount]');
const priceNoteEl = document.querySelector('[data-price-note]');
const skuEl = document.querySelector('[data-sku]');
const addToCartBtn = document.querySelector('[data-add-to-cart]');
const toastEl = document.querySelector('[data-toast]');
const toastTextEl = document.querySelector('[data-toast-text]');

let activeId = PRODUCT.variants[0].id;

function renderVariants() {
  variantsList.innerHTML = PRODUCT.variants
    .map(
      (variant) => `
        <button
          class="variant"
          type="button"
          role="radio"
          aria-checked="${variant.id === activeId}"
          data-variant-id="${variant.id}"
        >
          <span class="variant__weight">${variant.weight}</span>
          <span class="variant__price">${formatPrice(variant.price)}</span>
        </button>
      `,
    )
    .join('');
}

function renderSelection() {
  const variant = PRODUCT.variants.find((item) => item.id === activeId);
  const discount = getDiscount(variant);

  priceEl.textContent = formatPrice(variant.price);
  priceEl.setAttribute('content', variant.price.toFixed(2));
  oldPriceEl.textContent = formatPrice(variant.oldPrice);
  badgeEl.textContent = `−${discount}%`;
  galleryBadgeEl.textContent = `−${discount}%`;
  priceNoteEl.textContent = `за ${variant.weight}`;
  skuEl.textContent = variant.sku;

  variantsList.querySelectorAll('.variant').forEach((button) => {
    button.setAttribute('aria-checked', String(button.dataset.variantId === activeId));
  });
}

function selectVariant(id) {
  if (id === activeId) return;
  activeId = id;
  renderSelection();
}

variantsList.addEventListener('click', (event) => {
  const button = event.target.closest('.variant');
  if (button) selectVariant(button.dataset.variantId);
});

// Стрелками переключаем фасовки — ожидаемое поведение для role="radiogroup"
variantsList.addEventListener('keydown', (event) => {
  if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
  event.preventDefault();

  const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
  const currentIndex = PRODUCT.variants.findIndex((item) => item.id === activeId);
  const next = PRODUCT.variants[(currentIndex + step + PRODUCT.variants.length) % PRODUCT.variants.length];

  selectVariant(next.id);
  variantsList.querySelector(`[data-variant-id="${next.id}"]`).focus();
});

let toastTimer;

addToCartBtn.addEventListener('click', () => {
  const variant = PRODUCT.variants.find((item) => item.id === activeId);
  toastTextEl.textContent = `«${PRODUCT.name}», ${variant.weight} — добавлен в корзину`;
  toastEl.hidden = false;

  requestAnimationFrame(() => toastEl.classList.add('is-visible'));

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('is-visible');
    setTimeout(() => {
      toastEl.hidden = true;
    }, 200);
  }, 2400);
});

renderVariants();
renderSelection();
