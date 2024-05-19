import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type PayloadType1 = {
  part: "about" | "skills" | "portfolio" | "forYou" | "contacts"
  val: boolean
}
type PayloadType2 = { part: "scrollY"; val: number }

type PayloadType = PayloadType1 | PayloadType2

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    about: false,
    skills: false,
    portfolio: false,
    forYou: false,
    contacts: false,
    scrollY: 0,
  },
  reducers: {
    scroll(state, action: PayloadAction<PayloadType>) {
      if (
        action.payload.part == "scrollY" &&
        typeof action.payload.val == "number"
      )
        state["scrollY"] = action.payload.val
      else state[action.payload.part] = action.payload.val
    },
  },
})

export const { scroll } = scrollSlice.actions

export default scrollSlice.reducer
