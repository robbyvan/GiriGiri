import axios from 'axios';

export function getHomepageVideos() {
  const url = '/api/homepageList';

  const q = {
    rid: 1,
    day: 3,
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}
