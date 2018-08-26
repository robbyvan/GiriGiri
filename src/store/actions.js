import * as types from './mutation-types';
import { TABS, MAIN_TABS } from 'api/config';

export function selectVideoPlay({ commit }, { aid, pageNum = 1 }) {
  commit(types.SET_VIDEO_AID, aid);
  commit(types.SET_CURRENT_VIDEO_PAGE, pageNum);
}

export function setAllTabsBySubTabRid({ commit }, { rid }) {
  if (MAIN_TABS.indexOf(rid) === -1) {
    // 有parent
    commit(types.SET_MAIN_TAB_RID, TABS[rid].parent);
  } else {
    commit(types.SET_MAIN_TAB_RID, rid);
  }
  commit(types.SET_SUB_TAB_RID, rid);
}
