import st from "../styles/Projects.module.scss"
import stAll from "../styles/All.module.scss"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Project from "./Project"

const projectInfo = [
  {
    headText: `Лэндинг для центра недвижимости`,
    descText: `Сайт был написан на Next js(предпочли его обычному React'у, 
    потому что у клиента был запрос на СЕО-оптимизацию сайта), адаптивен
    под разные десктоп разрешения, под планшеты и смартфоны.`,
    imgSources: [
      "/landing/1.png",
      "/landing/3.png",
      "/landing/4.png",
      "/landing/2.png",
    ],
  },
  {
    headText: `Сайт вакансий`,
    descText: `Сайт написан на Next js + Node js(Express js). Создав профиль на сайте,
    можно добавлять свое резюме или же вакансии. Для безопасной аутентификации
    использовал JWT. Использовал кеширование информации о последних вакансиях
    при помощи Node-cache для увеличения скорости загрузки данных на сайте.`,
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
     в то же время пользователи могут оставлять отзывы о ресторане.
     Есть фильтр ресторанов по интересующим кухням и отсутствию/наличию доставки.
     Сайт написан на Node js(Express js). Клиент остался довольным и оставил
     положительный отзыв(последнее фото). `,
    imgSources: [
      "/restaurants/1.png",
      "/restaurants/2.png",
      "/restaurants/3.png",
      "/restaurants/4.png",
    ],
  },
  {
    headText: `Новостной сайт`,
    descText: `На сайте работает оптимизированная подгрузка изображений, что делает
    его производительность выше. Так же создана удобная система написания статей для их
    дальнейшей публикации. Сайт написан на Next js + Express js. Так же, как и в других проектах,
    используется кеширование данных.`,
    imgSources: ["/news/1.png", "/news/2.png", "/news/3.png"],
  },
  {
    headText: `Веб-приложение "Заметки"`,
    descText: `Данная работа содержит в себе весь функционал заметок, но при этом
    присутствует их импорт и экспорт в зарегистрированный аккаунт, что позволяет удобно
    пользоваться заметками на нескольких устройствах, синхронизируя данные. Сайт написан на Express js + React js.
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
