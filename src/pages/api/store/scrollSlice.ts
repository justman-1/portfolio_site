import { createSlice } from "@reduxjs/toolkit"

const sm = createSlice({
  name: "goPortfolio",
  initialState: false,
  reducers: {
    changeNeed(state, action) {
      console.log("action: " + action)
      state = action.payload
    },
  },
})
