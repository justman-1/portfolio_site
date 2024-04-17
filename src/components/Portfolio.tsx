import st from "../styles/All.module.scss"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Project from "./Project"

const projectInfo = [
  {
    headText: `Лэндинг для центра недвижимости`,
    descText: `Сайт был написан на Next js, адаптивен под планшеты и
    смартфоны. Присутствует СЕО-оптимизация`,
    imgSources: ["/landing/1.png", "/landing/2.png", "/landing/3.png"],
  },
  {
    headText: `Новостной сайт`,
    descText: `Сайт написан на React js, присутствует админ панель для написания и редактирования статей`,
    imgSources: ["/news/1.png", "/news/2.png", "/news/3.png"],
  },
]

export default function Portfolio() {
  const projects = useRef<HTMLDivElement>(null)
  const loaded = useRef<boolean>(false)
  const [chosedProject, setChosedProject] = useState<number>(0)
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
    }
  }, [])
  function toggleProject(isRight: boolean) {
    projects.current!.style.filter = "blur(10px)"
    projects.current!.style.opacity = "0"
    setTimeout(() => {
      setChosedProject(
        isRight
          ? (chosedProject + 1) % projectInfo.length
          : (chosedProject - 1 + projectInfo.length) % projectInfo.length
      )
      projects.current!.style.filter = "blur(0px)"
      projects.current!.style.opacity = "1"
    }, 250)
  }
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
          onClick={() => toggleProject(false)}
        />
        <Image
          className={st.projectArrow2}
          src="/arrow.png"
          width={80}
          height={80}
          alt="arrow"
          onClick={() => toggleProject(true)}
        />
      </div>
      <div className={st.projects} ref={projects}>
        {projectInfo.map((project, key) => {
          return <Project {...project} using={key == chosedProject} key={key} />
        })}
      </div>
    </>
  )
}
