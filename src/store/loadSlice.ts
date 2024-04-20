import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const loadSlice = createSlice({
  name: "load",
  initialState: {
    all: false,
  },
  reducers: {
    load(state, action: PayloadAction<boolean>) {
      state.all = action.payload
    },
  },
})

export const { load } = loadSlice.actions

export default loadSlice.reducer
