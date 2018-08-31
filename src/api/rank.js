import axios from 'axios';
import { formatUrl } from './config';

// 一级标签
export function getRankingsByRid(mainTagRid) {
  const url = formatUrl('/api/rankingsByRid');

  const q = {
    rid: mainTagRid,
    day: 3,
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}
