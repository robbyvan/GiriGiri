const SW_VERSION = 8;

const CURRENT_CACHES = {
  prefetch: `giri_dynamic_v${SW_VERSION}`,
  prevVersion: `giri_dynamic_v${SW_VERSION - 1}`,
}

// Install: prefetch后缓存
self.addEventListener('install', event => {
  // 用于cache busting
  const now = Date.now();

  // 更新缓存. 需要缓存的文件在install阶段prefetch
  const urlsToPrefetch = [
    '/static/css/app.1e803995d143e3f88dde9aeb10f62220.css', // css
    '/static/img/icomoon.44ddd8e.svg', // iconmoon
    '/static/img/bannerTop.d651f31.png', // bannertop
    '/static/img/loading.0fae498.png', // loading
    '/static/img/lazy2.fe9e0f7.gif', // lazy loading gif
    '/static/js/0.801a49ea4f22512dbf8e.js', // vendor-async
    '/static/js/1.5f3eefc3ae46d8e233f9.js', // video
    '/static/js/2.fc5053702b173ccdf1e9.js', // user
    '/static/js/3.ecc827137a1fcf54dfce.js', // home
    '/static/js/4.f96337721576af48d494.js', // rank
    '/static/js/5.336bcbfe3f2b74ee49a8.js', // home-detail
    '/static/js/6.64942031e3ad9a7d0c23.js', // search-result
    '/static/js/7.aeffb2828b8f651de814.js', // search
    '/static/js/8.a501ce65daad2eb4b07e.js', // recent
    '/static/js/vendor.ff3a8a61d438b72ec64e.js', // vendor
    '/static/js/app.65bda4cd7d3606c419d6.js', // app
  ];

  // 缓存
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch)
      .then(cache => {
        // 每个资源产生一个cache promise
        const cachePromises = urlsToPrefetch.map(urlToPrefetch => {
          // 生成url: URL(url, [base])
          const url = new URL(urlToPrefetch, location.href);
          // no-cors: 不关心这个request的response, headers, result
          // 只关心把response作为一个black box然后cache起来(Opaque response), 之后可以响应fetch
          const request = new Request(url, { mode: 'no-cors' });
          return fetch(request)
            .then(response => {
              if (response.status >= 400) {
                // response有误
                throw new Error(`request for ${urlToPrefetch} failed with status: ${response.statusText}`);
              }
              // 把respo缓存起来
              return cache.put(urlToPrefetch, response);
            })
            // fetch promise的error
            .catch(err => console.log(`Not caching ${urlToPrefetch} due to ${err}`));
        });
        // 返回一个promise all, 执行所有cache promise来完成缓存
        return Promise.all(cachePromises)
          .then(() => console.log('Prefetching complete.'))
      })
      // cache open的error
      .catch(err => console.log('Prefetching failed.'))
  );
});

// 监听fetch事件, 先返回缓存, 之后再更新
const EXT_LISTS = ['js', 'css', 'svg', 'png', 'gif'];

function shouldCache(url) {
  for (let ext of EXT_LISTS) {
    if (url.endsWith(ext) && url.startsWith('https')) {
      return true;
    }
  }
  return false;
}

self.addEventListener('fetch', event => {
  // 响应fetch
  event.respondWith(
    caches.match(event.request)
      .then(resp => {
        if (resp) {
          return resp;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
            const url = fetchRequest.url;
            if (!shouldCache(url)) {
              // 如果不需要缓存, 直接返回response
              return response;
            }
            // 否则缓存response
            console.log('Gonna cache', event.request);
            return caches.open(CURRENT_CACHES.prefetch)
              .then(cache => {
                cache.put(fetchRequest, response.clone());
                return response;
              })
              .catch(err => console.log(`Caching ${event.request} failed due to: ${err}`))
          });
      })
  );
});

// 监听message, 更新根目录html
self.addEventListener('message', event => {
  console.log('receive message: ' + event.data);
  // 更新根目录下的index.html
  const url = event.data;
  console.log(`update root file: ${url}`);
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch)
      .then(cache =>
        fetch(url).then(res => cache.put(url, res))
      )
  )
});

// 新的sw接管, 删除掉上个版本的cache
self.addEventListener('activate', event => {
  // 需要删除的cache版本
  const cacheWhiteList = [CURRENT_CACHES.prevVersion];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      ))
  );
});
