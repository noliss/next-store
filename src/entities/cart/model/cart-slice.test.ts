import { describe, expect, it } from 'vitest';
import {
  addToCart,
  cartReducer,
  hydrateCart,
  removeFromCart,
  setCartItemQuantity,
} from './cart-slice';
import type { CartState } from './types';

const emptyState: CartState = { items: [] };

describe('cartReducer', () => {
  it('добавляет товар с количеством 1', () => {
    expect(cartReducer(emptyState, addToCart({ productId: 'a' })).items).toEqual([
      { productId: 'a', quantity: 1 },
    ]);
  });

  it('увеличивает количество уже добавленного товара', () => {
    const state: CartState = { items: [{ productId: 'a', quantity: 1 }] };

    expect(cartReducer(state, addToCart({ productId: 'a' })).items).toEqual([
      { productId: 'a', quantity: 2 },
    ]);
  });

  it('не превышает остаток на складе', () => {
    const state: CartState = { items: [{ productId: 'a', quantity: 2 }] };

    expect(cartReducer(state, addToCart({ productId: 'a', maxQuantity: 2 })).items).toEqual([
      { productId: 'a', quantity: 2 },
    ]);
  });

  it('удаляет позицию при количестве меньше единицы', () => {
    const state: CartState = { items: [{ productId: 'a', quantity: 1 }] };

    expect(cartReducer(state, setCartItemQuantity({ productId: 'a', quantity: 0 })).items).toEqual(
      []
    );
  });

  it('ограничивает заданное количество остатком', () => {
    const state: CartState = { items: [{ productId: 'a', quantity: 1 }] };
    const next = cartReducer(
      state,
      setCartItemQuantity({ productId: 'a', quantity: 9, maxQuantity: 3 })
    );

    expect(next.items).toEqual([{ productId: 'a', quantity: 3 }]);
  });

  it('игнорирует изменение количества отсутствующей позиции', () => {
    expect(
      cartReducer(emptyState, setCartItemQuantity({ productId: 'a', quantity: 2 })).items
    ).toEqual([]);
  });

  it('удаляет товар', () => {
    const state: CartState = {
      items: [
        { productId: 'a', quantity: 1 },
        { productId: 'b', quantity: 2 },
      ],
    };

    expect(cartReducer(state, removeFromCart('a')).items).toEqual([
      { productId: 'b', quantity: 2 },
    ]);
  });

  it('восстанавливает состояние из хранилища', () => {
    const restored = [{ productId: 'a', quantity: 4 }];

    expect(cartReducer(emptyState, hydrateCart(restored)).items).toEqual(restored);
  });
});
