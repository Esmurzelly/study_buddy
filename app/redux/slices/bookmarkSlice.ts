import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBookmark, BookmarkState } from "@/app/types/types";
import axios from 'axios';


const initialState: BookmarkState = {
    bookmarks: [],
    loading: false,
    error: null,
};

export const fetchBookmarks = createAsyncThunk(
    'bookmark/fetchBookmarks',
    async () => {
        const { data } = await axios.get<IBookmark[]>(`/api/bookmark`);
        return data;
    }
)


export const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookmarks.pending, (state => {
            state.loading = true
            state.bookmarks = []
        }));
        builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
            state.loading = false;
            state.bookmarks = action.payload;
        });
        builder.addCase(fetchBookmarks.rejected, (state => {
            state.loading = false
            state.bookmarks = []
            state.error = 'fetchActivities.rejected error';
        }))
    }
});

export const {  } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;