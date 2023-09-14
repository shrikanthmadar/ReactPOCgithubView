import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface viewGitRepoState {
  items: repo[];
  total_count: number;
}
interface repo {
  owner: any;
  name: string;
  description: string;
  //owner: x?.owner.login,
  created_at: string;
  updated_at: string;
}
const initialState: viewGitRepoState = {
  items: [],
  total_count: 0,
};

const reposSlice = createSlice({
  name: "viewRepo",
  initialState,
  reducers: {
    getRepos(state, action: PayloadAction<viewGitRepoState>) {
      state.items = action.payload.items;
      state.total_count = action.payload.total_count;
    },
    setTotalRepos(state, action: PayloadAction<number>) {
      state.total_count = action.payload;
    },
  },
});

export const { getRepos, setTotalRepos } = reposSlice.actions;
export default reposSlice.reducer;
