import st from "../styles/All.module.scss"
import Image from "next/image"
import { useEffect, useRef } from "react"
import Project from "./Project"

let loaded: boolean = false

const projectInfo = [
  {
    headText: `Лэндинг для центра недвижимости`,
    descText: `Сайт был написан на Next js, адаптивен под под планшеты и
    смартфоны. Присутствует СЕО-оптимизация`,
    imgSources: ["/landing/1.png", "/landing/2.png", "/landing/3.png"],
  },
]

export default function Portfolio() {
  const projects = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!loaded) {
      loaded = true
    }
  }, [])
  return (
    <>
      <h1 className={st.partHead}>Мои проекты</h1>
      <div className={st.arrows}>
        <Image
          className={st.projectArrow1}
          src="/arrow.png"
          width={80}
          height={80}
          alt="arrow"
        />
        <Image
          className={st.projectArrow2}
          src="/arrow.png"
          width={80}
          height={80}
          alt="arrow"
        />
      </div>
      <div className={st.projects} ref={projects}>
        <Project {...projectInfo[0]} using={true} />
      </div>
    </>
  )
}
