import * as types from './mutation-types';

const mutations = {
  [types.SET_MAIN_TAB_RID](state, tab) {
    state.mainTabRid = tab;
  },
  [types.SET_SUB_TAB_RID](state, tab) {
    state.subTabRid = tab;
  }
};

export default mutations;
