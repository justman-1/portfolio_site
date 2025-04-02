import st from "../styles/Projects.module.scss"
import stAll from "../styles/All.module.scss"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Project from "./Project"

const projectInfo = [
  {
    headText: `Лэндинг для центра недвижимости`,
    descText: `Сайт был написан на Next.js(предпочли его обычному React'у, 
    т.к. у клиента был запрос на СЕО-оптимизацию сайта), верстка адаптивная. Отображение некоторых элементов зависит от геолокации пользователя.`,
    imgSources: [
      "/landing/1.png",
      "/landing/3.png",
      "/landing/4.png",
      "/landing/2.png",
    ],
  },
  {
    headText: `Сайт вакансий`,
    descText: `Сайт написан на Next.js + Node.js(Express.js). JWT обеспечивает безопасную аутентификацию на сайте. Использовалось кеширование
    при помощи Node-cache с целью увеличения производительности сайта. Изображения при загрузке сжимаются до необходимого размера.`,
    imgSources: [
      "/vacancy/1.png",
      "/vacancy/2.png",
      "/vacancy/3.png",
      "/vacancy/4.png",
    ],
  },
  {
    headText: `Сайт с ресторанами`,
    descText: `Создавался для публикации ресторанов с информацией о них,
     в то же время пользователи могут оставлять отзывы о ресторанах.
     Есть фильтр ресторанов по интересующим кухням и отсутствию/наличию доставки.
     Сайт написан на Node.js(Express.js). Клиент остался доволен выполненной работой и оставил
     положительный отзыв.`,
    imgSources: [
      "/restaurants/4.png",
      "/restaurants/1.png",
      "/restaurants/2.png",
      "/restaurants/3.png",
    ],
  },
  {
    headText: `Новостной сайт`,
    descText: `На сайте работает оптимизированная подгрузка изображений. Также создана удобная система написания статей для их
    дальнейшей публикации. Сайт написан на Next.js + Express.js, MySQL. 
    Используется кеширование данных.`,
    imgSources: ["/news/1.png", "/news/2.png", "/news/3.png"],
  },
  {
    headText: `Веб-приложение "Заметки"`,
    descText: `Данная работа содержит в себе весь функционал заметок, также
    присутствует их импорт и экспорт в зарегистрированный аккаунт, что позволяет удобно
    пользоваться заметками на нескольких устройствах. Сайт написан на React.js + Express.js, MongoDB.
    Используется JWT.`,
    imgSources: ["/notes/1.png", "/notes/2.png"],
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
      <h1 className={stAll.partHead}>Мои работы</h1>
      <div className={st.arrows}>
        <Image
          className={st.projectArrow1}
          src="/arrow.png"
          width={80}
          height={80}
          alt="arrow"
          onClick={() => toggleProject(false)}
          priority
        />
        <Image
          className={st.projectArrow2}
          src="/arrow.png"
          width={80}
          height={80}
          alt="arrow"
          onClick={() => toggleProject(true)}
          priority
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
