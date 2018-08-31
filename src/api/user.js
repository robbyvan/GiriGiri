import axios from 'axios';

export function getSubmitVideos(mid) {
  const url = '/api/submitVideos';
  const options = {
    mid,
    page: 1,
    pagesize: 100, // 一次拿够5*20条视频
    order: 'pubdate',
    tid: 0,
  };
  return axios.get(url, { params: options });
}
