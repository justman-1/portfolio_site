import { configureStore } from "@reduxjs/toolkit"
import scrollSlice from "./scrollSlice"
import loadSlice from "./loadSlice"

export const store = configureStore({
  reducer: {
    scroll: scrollSlice,
    load: loadSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
