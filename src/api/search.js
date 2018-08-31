import axios from 'axios';
import { formatUrl } from './config';

export function getHotWords() {
  const url = formatUrl('/api/hotword');

  return axios.get(url);
}

export function getSuggestions(q) {
  const url = formatUrl('/api/suggest');

  const options = {
    func: 'suggest',
    suggest_type: 'accurate',
    sub_type: 'tag',
    main_ver: 'v1',
    bangumi_acc_num: 3,
    special_acc_num: 0,
    upuser_acc_num: 0,
    tag_num: 10,
    term: q,
    highlight: '',
  };
  return axios.get(url, { params: options });
}

export function searchTotal(keyword, page = 1, order = 'totalrank') {
  const url = formatUrl('/api/searchengine');
  const options = {
    keyword: encodeURIComponent(keyword),
    page,
    order,
    search_type: 'all',
    pagesize: 20,
    bangumi_num: 3,
    movie_num: 3,
    platform: 'h5',
    main_ver: 'v3',
  };
  return axios.get(url, { params: options });
}

export function searchCertainType(keyword, page = 1, type = 'bangumi') {
  const url = formatUrl('/api/searchengine');
  const options = {
    keyword: encodeURIComponent(keyword),
    page,
    search_type: type,
    order: 'totalran',
    pagesize: 20,
    platform: 'h5',
    main_ver: 'v3',
  };
  return axios.get(url, { params: options });
}
