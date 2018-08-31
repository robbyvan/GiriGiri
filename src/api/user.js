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

export function getUserStat(mid) {
  const url = '/api/userstat';
  const options = {
    vmid: mid,
    jsonp: 'jsonp'
  };
  return axios.get(url, { params: options });
}

export function loadSpaceData(mid) {
  const svP = getSubmitVideos(mid);
  const usP = getUserStat(mid);
  return Promise.all([svP, usP])
    .then(res => {
      const sv = res[0].data.data;
      const us = res[1].data.data;
      return { submitVideos: sv, userStat: us };
    });
}
