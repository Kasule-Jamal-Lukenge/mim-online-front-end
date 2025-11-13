import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit'

export const fetchSummary = createAsyncThunk('analytics/fetchSummary', async ()=>{
    const res = await api.get('/admin/analytics/summary');
    return res.data;
});

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        summary: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSummary.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchSummary.fulfilled, (state, action) => {
            state.loading = false;
            state.summary = action.payload;
        })
        .addCase(fetchSummary.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    },
});

export default analyticsSlice.reducer;