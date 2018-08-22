import * as types from './mutation-types';

const mutations = {
  [types.SET_MAIN_TAB_RID](state, tab) {
    state.mainTabRid = tab;
  },
  [types.SET_SUB_TAB_RID](state, tab) {
    state.subTabRid = tab;
  },
  [types.SET_VIDEO_AID](state, aid) {
    state.videoAid = aid;
  },
  [types.SET_CURRENT_VIDEO_PAGE](state, pn) {
    state.currentVideoPage = pn;
  }
};

export default mutations;
