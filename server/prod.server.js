const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const request = require('./request');
const config = require('../config/index');

const app = express();
const apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));

// 获取首页数据
apiRoutes.get('/homepageList', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/ranking';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
});

// 一级7天推荐
apiRoutes.get('/mainTab7dRecommend', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/ranking/region';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
});
// 二级3天推荐
apiRoutes.get('/subTab3dRecommend', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/ranking/region';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
});

// 二级7天推荐
apiRoutes.get('/subTab7dRecommend', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/ranking/region';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
});
// 按页查询最新
apiRoutes.get('/subTabLatestByPage', (req, res) => {
  const url = 'https://api.bilibili.com/archive_rank/getarchiverankbypartion';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
});

// ranking列表
apiRoutes.get('/rankingsByRid', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/ranking';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
});

// 获取视频相关信息: 播放相关地址
const fakeResponse1 = {
    from: "local",
    result: "suee",
    quality: 6,
    format: "mp4",
    timelength: 596504,
    accept_format: "mp4",
    accept_quality: [
      6
    ],
    video_codecid: 7,
    video_project: false,
    seek_param: "start",
    seek_type: "second",
    durl: [
      {
        order: 1,
        length: 83349,
        size: 2433530,
        url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
      }
    ],
    img: "https://i0.hdslb.com/bfs/archive/13621bff1dd94ea78acb91e9ce1ae9530aa43651.jpg",
    cid: "https://comment.bilibili.com/51636117.xml",
    fromview: "vupload"
  };
const fakeResponse2 = {
  from: "local",
  result: "suee",
  quality: 6,
  format: "mp4",
  timelength: 888064,
  accept_format: "mp4",
  accept_quality: [
    6
  ],
  video_codecid: 7,
  video_project: false,
  seek_param: "start",
  seek_type: "second",
  durl: [
    {
      order: 1,
      length: 888064,
      size: 27840724,
      url: "https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4"
    }
  ],
  img: "https://i0.hdslb.com/bfs/archive/339c8e9883a197d2acc9cef57695bfa556e0d250.jpg",
  cid: "https://comment.bilibili.com/51967819.xml",
  fromview: "vupload"
};
function* FSM() {
  while (true) {
    yield fakeResponse1;
    yield fakeResponse2;
  }
}
const fsm = FSM();
apiRoutes.get('/video_url', (req, res) => {
  // 模拟获取视频地址
  const url = 'https://api.bilibili.com/x/web-interface/view';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: { aid: req.query.cid }
  })
    .then(response => {
      const cidArr = response.data.data.pages.filter(p => p.page === Number(req.query.page));
      const r = {
        ...fsm.next().value,
        cid: cidArr[0].cid
      };
      res.json(r);
    })
    .catch(e => console.log(e));
});

// 获取view信息: 分集 描述
apiRoutes.get('/video_view', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/view';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

// 获取视频tags
apiRoutes.get('/video_tags', (req, res) => {
  const url = 'https://api.bilibili.com/x/tag/archive/tags';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

// 获取首页推荐
apiRoutes.get('/video_recommendnew', (req, res) => {
  const url = `https://comment.bilibili.com/recommendnew,${req.query.aid}`;
  // console.log(url);
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      // host: 'api.bilibili.com' // 不能加host
    },
    // params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

// 获取结束推荐
apiRoutes.get('/finished_recommend', (req, res) => {
  const url = 'https://api.bilibili.com/x/web-interface/ranking/region';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query
  })
    .then(response => res.json(response.data))
    .catch(e => console.log(e));
  });

// 获取评论
apiRoutes.get('/video_reply', (req, res) => {
  const url = 'https://api.bilibili.com/x/v2/reply';
  axios.get(url, {
    headers: {
      referer: 'https://m.bilibili.com/index.html/',
      host: 'api.bilibili.com'
    },
    params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

// 获取弹幕: xml
apiRoutes.get('/video_danmu', (req, res) => {
  const url = `http://api.bilibili.com/x/v1/dm/list.so?oid=${req.query.cid}`;
  // console.log(url);
  let completeRes = '';
  request({ method: 'GET', url: url, gzip: true, multipart: { chunked: true, data: []} }, (error, response, body) => {
    console.log('error', error);
    // console.log('statusCode', response && response.statusCode);
    // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
    // console.log('the decoded data is: ' + body)
    // console.log(typeof body);
    res.send(body);
    // res.end();
  }).on('data', chunk => {
    // decompressed data as it is received
    // console.log('decoded chunk: ');
    completeRes += chunk;
    // res.write(chunk);
  }).on('response', response => {
    // unmodified http.IncomingMessage object
    // response.on('data', chunk => {
      // console.log('received ' + chunk.length + ' bytes of compressed data');
    // });
  })
});

//获取热搜词
apiRoutes.get('/hotword', (req, res) => {
  const url = 'https://s.search.bilibili.com/main/hotword';
  axios.get(url, {
    headers: {
      'referer': 'https://m.bilibili.com/search.html',
      'host': 's.search.bilibili.com',
    }
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

// 获取当前搜索推荐
apiRoutes.get('/suggest', (req, res) => {
  const url = 'https://s.search.bilibili.com/main/suggest';
  // console.log(url);
  // console.log(req.query);
  axios.get(url, {
    headers: {
      'referer': 'https://m.bilibili.com/search.html',
      'host': 's.search.bilibili.com',
    },
    params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e))
});

// 搜索
apiRoutes.get('/searchengine', (req, res) => {
  // console.log(req.query);
  const url = 'https://m.bilibili.com/search/searchengine';
  const options = {
    url: url,
    method: 'POST',
    json: {
      ...req.query,
    },
  };
  request(options, (err, response, body) => res.json(body));
});

// 投稿视频
apiRoutes.get('/submitVideos', (req, res) => {
  const url = 'https://space.bilibili.com/ajax/member/getSubmitVideos';
  axios.get(url, {
    headers: {
      'referer': 'https://m.bilibili.com/space',
      'host': 'space.bilibili.com',
    },
    params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

// 关注&粉丝
apiRoutes.get('/userstat', (req, res) => {
  const url = 'https://api.bilibili.com/x/relation/stat';
  axios.get(url, {
    headers: {
      'referer': 'https://m.bilibili.com/space',
    },
    params: req.query,
  })
  .then(response => res.json(response.data))
  .catch(e => console.log(e));
});

app.use(express.static('../dist'));
app.use('/api', apiRoutes);

const port = process.env.PORT || config.build.port;

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('App running at http://localhost:' + port + '\n');
});
