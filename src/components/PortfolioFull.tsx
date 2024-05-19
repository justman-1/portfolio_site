import { useAppDispatch, useAppSelector } from "@/store/hook"
import st from "../styles/PortfolioFull.module.scss"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { portfolioAppear } from "@/store/loadSlice"

export default function PortfolioFull() {
  const dispatch = useAppDispatch()
  const page = useRef<HTMLDivElement>(null)
  const portAppear = useAppSelector((state) => state.load.portfolioAppear)
  useEffect(() => {
    if (!page.current) return
    if (portAppear) {
      page.current.style.top = "1.5em"
      setTimeout(() => {
        if (page.current) page.current.style.opacity = "1"
      }, 700)
    } else {
      page.current.style.opacity = "0"
      setTimeout(() => {
        if (page.current) page.current.style.top = "100%"
      }, 800)
    }
  }, [portAppear])
  return (
    <div className={st.page} ref={page}>
      <Image
        src="/port_arrow.png"
        width={100}
        height={100}
        alt=""
        className={st.portBackImg}
        onClick={() => {
          dispatch(portfolioAppear(false))
        }}
      />
      <div className={st.portTitle}>Портфолио</div>
      <div className={st.portPostTitle}>
        Здесь Вы увидите демонстрацию моих проектов и краткую информацию о них.
        Опишу, с чем именно работал и какой вклад это внесло в меня как
        специалиста.
      </div>
      <div className={st.portContainer}></div>
    </div>
  )
}
