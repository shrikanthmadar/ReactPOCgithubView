import * as type from "../types";

const initialState = {
  repos: [],
  loading: false,
  error: null,
};

export default function repos(state = initialState, action) {
  switch (action.type) {
    case type.GET_REPOS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: action.payload,
      };
    case type.GET_REPOS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
