import { Map } from 'immutable';
import produce from 'immer';
import { CURRENT_BRANCH_KEY } from 'netlify-cms-lib-util';

import { CONTRIBUTIONS_LIST_CLOSE, CONTRIBUTIONS_LIST_OPEN, CONTRIBUTION_SELECT } from '../actions/contributions';

import type { ContributionsAction } from '../actions/contributions';


export type Contributions = {
  currentBranch: string;
  branchList: string[];
  isVisible: boolean;
  isLoading: boolean;
};

export const defaultState = {
  newBranchName:'',
  contributions: [],
  currentBranch: localStorage.getItem(CURRENT_BRANCH_KEY),
  isVisible: true,
  isLoading: false
};

const contributions = produce((state: Contributions, action: ContributionsAction) => {
  switch (action.type) {

    case CONTRIBUTIONS_LIST_OPEN:
      state.isVisible = true;
      state.isLoading = true;
      state.branchList = action.payload
      return state;
      break;

    case CONTRIBUTIONS_LIST_CLOSE:
      state.isVisible = false;
      return state;
      break;

    case CONTRIBUTION_SELECT:
      state.isVisible = false;
      state.currentBranch = action.payload
      return state;
      break

    default:
      return state;
  }
}, defaultState);

export default contributions;
