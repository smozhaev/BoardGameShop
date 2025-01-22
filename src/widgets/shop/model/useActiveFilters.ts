import { useSelector } from 'react-redux';
import { RootState } from '@app/store/types';

export const useActiveFilters = () => {
  const { categories } = useSelector((state: RootState) => state.filter);

  return {
    categoriesCount: categories.length,
    hasActiveFilters: categories.length > 0,
  };
};
