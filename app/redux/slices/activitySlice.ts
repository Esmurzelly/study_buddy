import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { IActivity } from "@/app/types/types";
import axios from 'axios';

interface ActivityState {
    activity: IActivity[];
    loading: boolean;
    error: string | null;
};

const initialState: ActivityState = {
    activity: [],
    loading: false,
    error: null,
}

export const fetchActivities = createAsyncThunk(
    'activity/fetchActivities',
    async () => {
        const { data } = await axios.get<IActivity[]>(`/api/activity`);
        return data;
    }
)

export const deleteActivities = createAsyncThunk(
    'activity/deleteActivities',
    async (id: string) => {
        const { data } = await axios.delete<IActivity[]>(`/api/activity/${id}`);
        return data;
    }
)

export const counterSlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setActivity: (state) => {
            try {
            } catch (error) {
                console.log('redux issue', error);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchActivities.pending, (state) => {
            state.loading = true
            state.activity = []
        });
        builder.addCase(fetchActivities.fulfilled, (state, action) => {
            state.activity = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchActivities.rejected, (state) => {
            state.loading = false
            state.error = 'fetchActivities.rejected error'
            state.activity = []
        });
        

        builder.addCase(deleteActivities.pending, (state) => {
            state.loading = true
            state.activity = []
        });
        builder.addCase(deleteActivities.fulfilled, (state, action) => {
            const deletedActivityId = action.meta.arg; // свойство, которое содержит аргументы, переданные в созданный thunk action
            state.activity = state.activity.filter(activity => activity.id !== deletedActivityId)
            state.loading = false;
        });
        builder.addCase(deleteActivities.rejected, (state) => {
            state.loading = false
            state.error = 'deleteActivities.rejected error'
            state.activity = []
        });
    }
});

export const { setActivity } = counterSlice.actions;
export default counterSlice.reducer;