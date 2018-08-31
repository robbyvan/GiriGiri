import axios from 'axios';
import convert from 'xml-js';
import { formatUrl } from './config';

export function loadVideoScreenData(aid, pn = 1) {
  const playUrlP = getVideoUrl(aid, pn); // 盗链限制, mock data
  const viewP = getVideoView(aid);
  const tagsP = getVideoTags(aid);
  const recommendsP = getVideoRecommend(aid);
  return Promise.all([playUrlP, viewP, tagsP, recommendsP])
    .then(res => {
      // console.log(res);
      const playUrlInfo = {
        // 盗链限制, mock data
        timelength: res[0].data.timelength,
        playUrl: res[0].data.durl[0].url,
        img: res[1].data.data.pic,
        aid: res[1].data.data.aid,
        tid: res[1].data.data.tid,
        cid: res[0].data.cid,
      };
      const videoViewInfo = {
        pic: res[1].data.data.pic,
        title: res[1].data.data.title,
        owner: res[1].data.data.owner,
        stat: res[1].data.data.stat,
        pubdate: res[1].data.data.pubdate,
        copyright: res[1].data.data.copyright,
        desc: res[1].data.data.desc,
        tid: res[1].data.data.tid,
        aid: res[1].data.data.aid,
        cid: res[1].data.data.cid,
      };
      const tags = res[2].data.data;
      const recommendVideos = res[3].data.data;
      const videoPages = res[1].data.data.pages;
      return { playUrlInfo, videoViewInfo, tags, recommendVideos, videoPages };
    });
}

// 获取视频相关信息: 播放相关地址(mock)
export function getVideoUrl(aid, page = 1) {
  const url = formatUrl('/api/video_url');
  const options = {
    cid: aid,
    page,
    quality: 3,
    type: 'json',
  };
  return axios.get(url, { params: options });
}

// 获取view信息: 分集 描述
export function getVideoView(aid) {
  const url = formatUrl('/api/video_view');
  const options = {
    aid
  };
  return axios.get(url, { params: options });
}

// 获取视频tags
export function getVideoTags(aid) {
  const url = formatUrl('/api/video_tags');
  const options = {
    aid,
  };
  return axios.get(url, { params: options });
}

// 获取首页推荐
export function getVideoRecommend(aid) {
  const url = formatUrl('/api/video_recommendnew');
  const options = { aid };
  return axios.get(url, { params: options });
}

// 获取结束推荐
export function getFinishedRecommend(tid) {
  const url = formatUrl('/api/finished_recommend');
  const options = {
    rid: tid,
    day: 7,
  };
  return axios.get(url, { params: options });
}

// 获取评论
export function getVideoReplies(aid, pageNum = 1) {
  const url = formatUrl('/api/video_reply');
  const options = {
    oid: aid,
    pn: pageNum,
    sort: 2,
    nohot: 1,
    type: 1,
  };
  return axios.get(url, { params: options });
}

// 获取弹幕
export function getVideoDanmu(cid) {
  const url = formatUrl('/api/video_danmu');
  // console.log(cid);
  const options = {
    cid
  };
  return new Promise((resolve, reject) => {
    axios.get(url, { params: options })
      .then(res => {
        // console.log(res.data);
        // console.log(typeof res.data);
        const formatedData = convert.xml2json(res.data, { compact: true, spaces: 2 });
        // console.log(formatedData);
        resolve(formatedData);
      })
      .catch(e => {
        console.log(e);
      });
  });
}
