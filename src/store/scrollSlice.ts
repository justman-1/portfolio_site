import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    about: false,
    skills: false,
    portfolio: false,
    forYou: false,
    contacts: false,
  },
  reducers: {
    scroll(
      state,
      action: PayloadAction<{
        part: "about" | "skills" | "portfolio" | "forYou" | "contacts"
        val: boolean
      }>
    ) {
      state[action.payload.part] = action.payload.val
    },
  },
})

export const { scroll } = scrollSlice.actions

export default scrollSlice.reducer
