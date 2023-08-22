import * as type from "../types";

export function getRepos(repos) {
  return {
    type: type.GET_REPOS_REQUESTED,
    payload: repos,
  };
}

export function getReposSuccess(repos) {
  return {
    type: type.GET_REPOS_SUCCESS,
    payload: repos,
  };
}
