import { useRef, useEffect, useState } from "react"
import st from "../styles/All.module.scss"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { updateLineTopAction } from "@/store/lineTopSlice"

export default function Footer() {
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineTop = useAppSelector((state) => state.lineTop.top)
  const [lineTop2, setLN] = useState<number>(0)
  useEffect(() => {
    setLN(lineTop)
  }, [lineTop])
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      if (lineRef.current) {
        let times = 80 * 2
        let int = setInterval(() => {
          if (!times || !lineRef.current) clearInterval(int)
          dispatch(
            updateLineTopAction(
              lineRef.current!.getBoundingClientRect().top + window.scrollY - 22
            )
          )
          times--
        }, 500)
      }
    }
  }, [])
  return (
    <footer className={st.mainFooter}>
      <div className={st.line} ref={lineRef}></div>
    </footer>
  )
}
