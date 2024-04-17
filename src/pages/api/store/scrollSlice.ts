import { createSlice } from "@reduxjs/toolkit"

const sm = createSlice({
  name: "goPortfolio",
  initialState: false,
  reducers: {
    changeNeed(state, action) {
      state = action.payload
    },
  },
})
