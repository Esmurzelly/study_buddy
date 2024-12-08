import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import { IActivity } from "@/app/types/types";
import axios from 'axios';
import { ActivityState } from "@/app/types/types";

const initialState: ActivityState = {
    activity: [],
    loading: false,
    error: null,
    selectedCity: null
}

export const fetchActivities = createAsyncThunk(
    'activity/fetchActivities',
    async () => {
        const { data } = await axios.get<IActivity[]>(`/api/activity`);
        return data.reverse();
    }
)

export const uploadActivity = createAsyncThunk(
    'activity/uploadActivity',
    async (activityObj: IActivity) => {
        const { data } = await axios.post<IActivity[]>(`/api/activity/`, activityObj);
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

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload
        },
        clearSelectedCity: (state) => {
            state.selectedCity = null;
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


        builder.addCase(uploadActivity.pending, (state) => {
            state.loading = true
            state.activity = []
        });
        builder.addCase(uploadActivity.fulfilled, (state, action) => {
            state.activity = state.activity.concat(action.payload);
            state.loading = false;
        });
        builder.addCase(uploadActivity.rejected, (state, action) => {
            state.loading = false;
            state.error = String(action.error.message);
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

export const { setSelectedCity, clearSelectedCity } = activitySlice.actions;
export default activitySlice.reducer;