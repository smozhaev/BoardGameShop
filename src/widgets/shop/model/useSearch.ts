import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { setSearchQuery } from '@app/store/filterSlice';

export const useSearch = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.filter.searchQuery);

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  return {
    searchQuery,
    handleSearch,
  };
};
