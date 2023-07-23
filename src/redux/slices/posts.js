import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async ({ page, search }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `/posts?q=${search || ""}&_limit=10&_page=${page || ""}`
            );
            const { data, headers } = res;
            const totalCount = Number(headers["x-total-count"]);
            return { data, totalCount, page };
        } catch (error) {
            const { message } = error;
            return rejectWithValue(message);
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: null,
        error: null,
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        sortBy: {
            path: "",
            order: "desc",
        },
    },
    reducers: {
        sorting: (state, action) => {
            state.sortBy.order === "desc"
                ? (state.posts = [...current(state.posts)].sort((a, b) =>
                      a[action.payload] < b[action.payload] ? 1 : -1
                  ))
                : (state.posts = [...current(state.posts)].sort((a, b) =>
                      a[action.payload] > b[action.payload] ? 1 : -1
                  ));
            state.sortBy.order = state.sortBy.order === "desc" ? "asc" : "desc";
            state.sortBy.path = action.payload;
        },
        searchByPosts: (state, action) => {
            state.posts = action.payload;
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.error = null;
            state.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.posts = action.payload.data;
            state.totalCount = action.payload.totalCount;
            state.currentPage = action.payload.page;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = "reject";
            state.error = action.payload;
        },
    },
});

export const postReducer = postSlice.reducer;
export const { sorting, searchByPosts } = postSlice.actions;
