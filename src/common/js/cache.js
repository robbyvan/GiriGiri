import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 6;

const WATCH_KEY = '__watch__';
const WATCH_MAX_LENGTH = 5;

function addToList(list, item, checkRepeatFunc, maxLen) {
  if (list.length === 0) {
    return [item];
  }
  return [
    item,
    ...list.filter(checkRepeatFunc)
  ].slice(0, maxLen);
}

// 搜索
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

// 观看
export function loadWatches() {
  return storage.get(WATCH_KEY, []);
}

export function saveWatch(video) {
  const newWatches = addToList(loadWatches(), video, item => item.aid !== video.aid, WATCH_MAX_LENGTH);
  storage.set(WATCH_KEY, newWatches);
  return newWatches;
}

export function clearWatches() {
  storage.remove(WATCH_KEY);
  return [];
}
