import { actions as notifActions } from 'redux-notifications';
import { CURRENT_BRANCH_KEY } from 'netlify-cms-lib-util';

import { currentBackend } from '../backend';
import { loadEntries, loadEntry } from './entries';

import type { State } from '../types/redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';


const { notifSend } = notifActions;

export const CONTRIBUTIONS_LIST_OPEN = 'CONTRIBUTIONS_LIST_OPEN';
export const CONTRIBUTIONS_LIST_CLOSE = 'CONTRIBUTIONS_LIST_CLOSE';
export const CONTRIBUTION_CREATE = 'CONTRIBUTION_CREATE';
export const CONTRIBUTION_CREATE_SUCCESS = 'CONTRIBUTION_CREATE_SUCCESS';
export const CONTRIBUTION_CREATE_FAILURE = 'CONTRIBUTION_CREATE_FAILURE';
export const CONTRIBUTION_DELETE = 'CONTRIBUTION_DELETE';
export const CONTRIBUTION_DELETE_SUCCESS = 'CONTRIBUTION_DELETE_SUCCESS';
export const CONTRIBUTION_DELETE_FAILURE = 'CONTRIBUTION_DELETE_FAILURE';
export const CONTRIBUTION_SELECT = 'CONTRIBUTION_SELECT';

export function openContributionsList() {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const branches = await currentBackend(getState().config).listBranches();
    dispatch(contributionsListOpened(branches));
  };
}

export function closeContributionsList() {
  return (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    dispatch(contributionsListClosed());
  };
}

export function createContributionOpen(branchName) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    const state = getState();
    const backend = currentBackend(state.config)
    await backend.createBranch(branchName);
    const branches = await backend.listBranches();
    dispatch(contributionsListOpened(branches));
  };
}

export function contributionChange(newBranchName) {
  return (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    localStorage.setItem(CURRENT_BRANCH_KEY, newBranchName)
    const state = getState();

    currentBackend(state.config).changeBranch(newBranchName);
    state.config.collections.forEach((collection) => {
      dispatch(loadEntries(state.collections.get(collection.name), 0));
    });

    const entry = state.entryDraft.get("entry")
    if (entry) {
      const collection = state.collections.get(entry.get("collection"));

      if (collection) {
        dispatch(loadEntry(collection, entry.get("slug")));
      }
    }

    dispatch(contributionChanged(newBranchName));
  };
}

function contributionsListOpened(branches) {
  return { type: CONTRIBUTIONS_LIST_OPEN, payload: branches } as const;
}

function contributionsListClosed() {
  return { type: CONTRIBUTIONS_LIST_CLOSE } as const;
}

function contributionChanged(branchName) {
  return { type: CONTRIBUTION_SELECT, payload: branchName }
}
export type ContributionsAction = ReturnType<
  | typeof contributionsListOpened
  | typeof contributionsListClosed
  | typeof contributionChanged
>;

