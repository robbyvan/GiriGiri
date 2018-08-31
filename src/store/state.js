import { loadWatches } from 'common/js/cache';

const state = {
  mainTabRid: 0,
  subTabRid: 0,
  videoAid: '', // 29845764
  currentVideoPage: 1,
  playUrlInfo: null,
  spaceInfo: null,
  watchHistory: loadWatches(),
};

export default state;
