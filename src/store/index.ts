import { configureStore } from "@reduxjs/toolkit"
import scrollSlice from "./scrollSlice"
import loadSlice from "./loadSlice"
import lineTopSlice from "./lineTopSlice"

export const store = configureStore({
  reducer: {
    scroll: scrollSlice,
    load: loadSlice,
    lineTop: lineTopSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
