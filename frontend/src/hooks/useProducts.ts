import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services';

export const PRODUCTS_KEYS = {
  all: ['products'] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEYS.all,
    queryFn: () => productsService.getProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

