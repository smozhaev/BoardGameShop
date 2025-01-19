export const CATEGORIES = [
  'Карточные игры',
  'Стратегии',
  'Вечериночные',
  'Кооперативные',
  'Ролевые',
] as const;

export const SORT_OPTIONS = [
  { value: 'rating', label: 'По рейтингу' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'name', label: 'По названию' },
] as const;

export type Category = typeof CATEGORIES[number];
export type SortOption = typeof SORT_OPTIONS[number]['value'];
