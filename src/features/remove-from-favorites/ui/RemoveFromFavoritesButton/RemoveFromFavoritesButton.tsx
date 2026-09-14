'use client';

import { useAppDispatch } from '@/_app/store';
import { removeFromFavorites } from '@/entities/favorites';
import { Button, Icon } from '@/shared/ui';

interface RemoveFromFavoritesButtonProps {
  productId: string;
}

export function RemoveFromFavoritesButton({ productId }: RemoveFromFavoritesButtonProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => dispatch(removeFromFavorites(productId))}
    >
      <Icon name="trash" size={16} />
      Удалить из избранного
    </Button>
  );
}
