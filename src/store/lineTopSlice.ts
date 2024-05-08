import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const lineTopSlice = createSlice({
  name: "lineTop",
  initialState: {
    top: 0,
  },
  reducers: {
    updateLineTopAction(state, action: PayloadAction<number>) {
      state.top = action.payload
    },
  },
})

export const { updateLineTopAction } = lineTopSlice.actions

export default lineTopSlice.reducer
