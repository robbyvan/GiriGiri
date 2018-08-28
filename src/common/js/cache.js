import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 6;

function addToList(list, item, checkRepeatFunc, maxLen) {
  return [
    item,
    ...list.filter(checkRepeatFunc)
  ].slice(0, maxLen);
}

export function loadSearches() {
  return storage.get(SEARCH_KEY, []);
}

export function saveSearch(q) {
  const newSearches = addToList(loadSearches(), q, item => item !== q, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, newSearches);
  return newSearches;
}

export function deleteSearch(q) {
  const newSearches = loadSearches().filter(s => s !== q);
  storage.set(SEARCH_KEY, newSearches);
  return newSearches;
}

export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}
