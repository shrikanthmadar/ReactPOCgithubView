import { call, put, takeEvery } from "redux-saga/effects";

const apiUrl = "https://api.github.com";

async function getApi(
  repoName,
  language,
  userName,
  sortBy,
  sortType,
  perPage,
  pageNumber
) {
  let query = repoName;
  query += language ? `+language:${language}` : "A";
  query += userName ? `+user:${userName}` : "A";
  query += ` sort:${sortBy}-${sortType}`;
  const url = `${apiUrl}/search/repositories?q=${query}&order=${sortType}&per_page=${perPage}&page=${pageNumber}`;
  try {
    const res = await fetch(url);
    const repoData = await res.json();
    if (res && repoData) {
      let data = repoData.items.map((x) => {
        let repo = {
          Name: x?.name,
          Description: x?.description,
          Owner: x?.owner.login,
          CreatedAt: x?.created_at,
          UpdatedAt: x?.updated_at,
        };
        return repo;
      });
    }
  } catch (error) {
    console.log(error, "catched error");
  }
}

function* fetchRepos(action) {
  try {
    const repos = yield call(getApi);
    yield put({ type: "GET_REPOS_SUCCESS", repos: repos });
  } catch (e) {
    yield put({ type: "GET_USERS_FAILED", message: e.message });
  }
}

function* reposSaga() {
  yield takeEvery("GET_REPOS_REQUESTED", fetchRepos);
}

export default reposSaga;
