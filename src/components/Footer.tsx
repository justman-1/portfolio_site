import { useRef, useEffect, useState } from "react"
import st from "../styles/All.module.scss"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { updateLineTopAction } from "@/store/lineTopSlice"

export default function Footer() {
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  const planeLand = useAppSelector((state) => state.load.planeLand)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineTop = useAppSelector((state) => state.lineTop.top)
  const [lineTop2, setLN] = useState<number>(0)
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      if (lineRef.current) {
        let times = 1000
        let int = setInterval(() => {
          if (!times) clearInterval(int)
          if (!lineRef.current) return
          dispatch(
            updateLineTopAction(
              lineRef.current.getBoundingClientRect().top + window.scrollY - 22
            )
          )
          times--
        }, 500)
      }
    }
  }, [])
  useEffect(() => {
    setLN(lineTop)
  }, [lineTop])
  useEffect(() => {
    if (planeLand && lineRef.current) {
      lineRef.current.className = st.lineAcivate
    }
  }, [planeLand])
  return (
    <footer className={st.mainFooter}>
      <div className={st.line} ref={lineRef}></div>
    </footer>
  )
}
