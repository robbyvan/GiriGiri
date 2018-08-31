import axios from 'axios';
import { formatUrl } from './config';

export function getHomepageVideos() {
  const url = formatUrl('/api/homepageList');

  const q = {
    rid: 1,
    day: 3,
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}
