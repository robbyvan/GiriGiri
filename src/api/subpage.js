import axios from 'axios';
import { TABS } from 'api/config';

// 一级标签
export function getMainTab7dRecommend(mainTagRid) {
  const url = '/api/mainTab7dRecommend';

  const q = {
    rid: mainTagRid,
    day: 7,
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}

export function getSubTab3dRecommend(subTagRid) {
  const url = '/api/subTab3dRecommend';

  const q = {
    rid: subTagRid,
    day: 3,
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}

export function getInitSubAll(mainTagRid) {
  const mainP = getMainTab7dRecommend(mainTagRid);
  const childrenRids = TABS[mainTagRid].children;
  const childrenP = childrenRids.map(childRid => getSubTab3dRecommend(childRid));
  return Promise.all([mainP, ...childrenP])
    .then(res => ({
      data: res.map(r => r.data.slice(0, 4)), // 推荐页每组只显示4个
      groups: [
        { ...TABS[mainTagRid], name: '热门推荐' },
        ...childrenRids.map(childRid => TABS[childRid])
      ],
    }));
}

// 二级标签
export function getSubTab7dRecommend(subTagRid) {
  const url = '/api/subTab7dRecommend';

  const q = {
    rid: subTagRid,
    day: 7,
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}

export function getSubTabLatestByPage(subTagRid, pageNum) {
  const url = '/api/subTabLatestByPage';

  const q = {
    tid: subTagRid,
    pn: pageNum
  };

  return axios.get(url, { params: q })
    .then(res => res.data);
}

export function getInitSubCategory(subTagRid) {
  const recommendP = getSubTab7dRecommend(subTagRid);
  const latestP = getSubTabLatestByPage(subTagRid, 1);
  return Promise.all([recommendP, latestP])
    .then(res => res);
}
