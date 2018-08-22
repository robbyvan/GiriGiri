'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const axios = require('axios');
const bodyParser = require('body-parser');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(apiRoutes) {
      apiRoutes.use(bodyParser.urlencoded({ extended: true }));
      const queryString = require('querystring');
      // 获取首页数据
      apiRoutes.get('/api/homepageList', (req, res) => {
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
      apiRoutes.get('/api/mainTab7dRecommend', (req, res) => {
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
      apiRoutes.get('/api/subTab3dRecommend', (req, res) => {
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
      apiRoutes.get('/api/subTab7dRecommend', (req, res) => {
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
      apiRoutes.get('/api/subTabLatestByPage', (req, res) => {
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
      apiRoutes.get('/api/rankingsByRid', (req, res) => {
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
      apiRoutes.get('/api/video_url', (req, res) => {
        // 模拟获取视频地址
        const url = 'https://api.bilibili.com/x/web-interface/ranking';
        const fakeResponse = {
          from: "local",
          result: "suee",
          quality: 6,
          format: "mp4",
          timelength: 573600,
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
              length: 909300,
              size: 27840724,
              url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            }
          ],
          img: "https://i1.hdslb.com/bfs/archive/37cc39abd87a8ca3730740d4ccdc0d66573e08be.jpg",
          cid: "https://comment.bilibili.com/50403051.xml",
          fromview: "vupload"
        };
        axios.get(url, {
          headers: {
            referer: 'https://m.bilibili.com/index.html/',
            host: 'api.bilibili.com'
          },
          params: req.query
        })
          .then(response => res.json(fakeResponse))
          .catch(e => console.log(e));
        // const url = 'https://api.bilibili.com/playurl';
        // // 三方api
        // console.log(req.query);
        // axios.get(url, {
        //   headers: {
        //     referer: 'https://m.bilibili.com/index.html/',
        //     host: 'api.bilibili.com'
        //   },
        //   params: req.query,
        // })
        // .then(response => res.json(response.data))
        // .catch(e => console.log(e));
      });

      // 获取view信息: 分集 描述
      apiRoutes.get('/api/video_view', (req, res) => {
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
      apiRoutes.get('/api/video_tags', (req, res) => {
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

      // 获取推荐
      apiRoutes.get('/api/video_recommendnew', (req, res) => {
        const url = `https://comment.bilibili.com/recommendnew,${req.query.aid}`;
        // console.log(url);
        axios.get(url, {
          headers: {
            referer: 'https://m.bilibili.com/index.html/',
            // host: 'api.bilibili.com' // 不能加host
          },
          // params: req.query,
        })
        .then(response => {
          return res.json(response.data)
        })
        .catch(e => console.log(e));
      });

      // 获取评论
      apiRoutes.get('/api/video_tags', (req, res) => {
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
      apiRoutes.get('/api/video_danmu', (req, res) => {
        const url = `https://comment.bilibili.com/${req.query.aid}.xml`;
        axios.get(url, {
          headers: {
            referer: 'https://m.bilibili.com/index.html/',
            host: 'api.bilibili.com'
          },
          // params: req.query,
        })
        .then(response => res) // 返回xml
        .catch(e => console.log(e));
      });

    },

    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
