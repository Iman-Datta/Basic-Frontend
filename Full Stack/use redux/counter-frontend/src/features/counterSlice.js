import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000";

// Fetch counter from backend
export const fetchCounter = createAsyncThunk(
  "counter/fetchCounter",
  async () => {
    const res = await axios.get(`${API}/counter`);
    return res.data.value;
  }
);

// Increment counter
export const incrementCounter = createAsyncThunk(
  "counter/incrementCounter",
  async () => {
    const res = await axios.post(`${API}/increment`);
    return res.data.value;
  }
);

// Decrement counter
export const decrementCounter = createAsyncThunk(
  "counter/decrementCounter",
  async () => {
    const res = await axios.post(`${API}/decrement`);
    return res.data.value;
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(incrementCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(decrementCounter.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export default counterSlice.reducer;