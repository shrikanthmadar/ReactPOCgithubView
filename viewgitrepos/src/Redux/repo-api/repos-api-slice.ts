import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRepos } from "../repos/reposSlice";

interface IRepo {
  owner: { login: string; avatar_url: string };
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  watchers_count: string;
  forks_count: string;
  stargazers_count: string;
  language: string;
}

interface IRepos {
  items: IRepo[];
  total_count: number;
}

export interface IQueryParameter {
  query?: string;
  sortType?: string;
  perPage?: number;
  pageNumber?: number;
}

export interface IRouteParameters {
  owner?: string;
  name?: string;
}

export const repoApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  endpoints(builder) {
    return {
      fecthRepos: builder.query<IRepos, IQueryParameter>({
        query({ query = "", sortType = "asc", perPage = 10, pageNumber = 1 }) {
          return `/search/repositories?q=${query}&order=${sortType}&per_page=${perPage}&page=${pageNumber}`;
        },
        transformErrorResponse: (rawResponse) => {
          console.log(rawResponse);
        },
      }),
      fetchRepo: builder.query<IRepo, IRouteParameters>({
        query({ owner, name }: IRouteParameters) {
          return `/repos/${owner}/${name}`;
        },
      }),
    };
  },
});

export const { useFecthReposQuery, useFetchRepoQuery } = repoApiSlice;
