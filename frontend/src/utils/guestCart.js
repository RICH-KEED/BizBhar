const KEY = 'bizbhar_guest_cart';

export function getGuestCart() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setGuestCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addGuestItem(productId, qty = 1) {
  const items = getGuestCart();
  const idx = items.findIndex((x) => Number(x.productId) === Number(productId));
  if (idx >= 0) {
    items[idx].quantity = Number(items[idx].quantity || 0) + Number(qty);
  } else {
    items.push({ productId: Number(productId), quantity: Number(qty) });
  }
  setGuestCart(items);
}

export function updateGuestQty(productId, quantity) {
  const items = getGuestCart().filter((x) => Number(x.productId) !== Number(productId));
  if (quantity > 0) {
    items.push({ productId: Number(productId), quantity: Number(quantity) });
  }
  setGuestCart(items);
}

export function removeGuestItem(productId) {
  setGuestCart(getGuestCart().filter((x) => Number(x.productId) !== Number(productId)));
}

export function clearGuestCart() {
  localStorage.removeItem(KEY);
}

/** After JWT is stored; merges guest lines into server cart. */
export async function mergeGuestCartToServer(cartAPI) {
  const items = getGuestCart();
  if (!items.length) return;
  await cartAPI.sync({ items });
  clearGuestCart();
}
