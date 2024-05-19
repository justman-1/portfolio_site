import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const loadSlice = createSlice({
  name: "load",
  initialState: {
    all: false,
    portfolioAppear: false,
    planeLand: false,
  },
  reducers: {
    load(state, action: PayloadAction<boolean>) {
      state.all = action.payload
    },
    portfolioAppear(state, action: PayloadAction<boolean>) {
      state.portfolioAppear = action.payload
    },
    planeLandSlice(state, action: PayloadAction<true>) {
      state.planeLand = action.payload
    },
  },
})

export const { load, portfolioAppear, planeLandSlice } = loadSlice.actions

export default loadSlice.reducer
