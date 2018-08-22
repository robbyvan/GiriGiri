import * as types from './mutation-types';

export function selectVideoPlay({ commit, state }, { aid, pageNum }) {
  commit(types.SET_VIDEO_AID, aid);
  commit(types.SET_CURRENT_VIDEO_PAGE, pageNum);
}
