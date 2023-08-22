import { all } from "redux-saga/effects";
import reposSaga from "./reposSaga";

export default function* rootSaga() {
  yield all([reposSaga()]);
}
