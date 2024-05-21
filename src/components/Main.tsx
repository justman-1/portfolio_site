import Image from "next/image"
import st from "../styles/Main.module.scss"
import { useEffect, useRef, useState } from "react"
import { scroll } from "../store/scrollSlice"
import { load } from "../store/loadSlice.ts"
import { useAppDispatch } from "../store/hook.ts"
import Casino from "./Casino.tsx"

const interval1: number = 80
const interval2: number = 20

export default function Main() {
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  const [text1, setText1] = useState<string>("")
  const [text2, setText2] = useState<string>("")
  const [text3, setText3] = useState<string>("")
  const [siteLoaded, setSiteLoaded] = useState<boolean>(false)
  const computer = useRef<HTMLImageElement>(null)
  const linksDiv = useRef<HTMLDivElement>(null)
  function changeLetter(s: string, i: number, n: number): void {
    setTimeout(() => {
      if (n == 1) setText1(s)
      if (n == 2) setText2(s)
      if (n == 3) setText3(s)
    }, interval1 * i)
  }
  function changeLetter3(s: string, i: number): void {
    setTimeout(() => {
      setText3(s)
    }, interval2 * i)
  }
  function addComponentsAfterLoad(s3: string) {
    setTimeout(() => {
      if (!linksDiv.current) return
      linksDiv.current.style.opacity = "1"
      setSiteLoaded(true)
      setTimeout(() => dispatch(load(true)), 200)
    }, interval2 * s3.length + 100)
  }
  function goLink(
    linkStr: "about" | "skills" | "portfolio" | "forYou" | "contacts"
  ) {
    dispatch(scroll({ val: true, part: linkStr }))
  }
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      let s1: string = "Fullstack JavaScript"
      let s2: string = "Разработчик"
      let s3: string = `Доброго времени суток! Меня зовут Роман, и я специализируюсь на
      разработке веб-сайтов абсолютно разной направленности и масштаба.
      Создам сайт исходя из вашего запроса, не доставив лишних хлопот :)`
      setText1("")
      setText2("")
      setText3("")
      setTimeout(() => {
        for (let i = 0; i < s1.length; ++i)
          changeLetter(s1.substring(0, i + 1), i, 1)
        setTimeout(() => {
          for (let i = 0; i < s2.length; ++i)
            changeLetter(s2.substring(0, i + 1), i, 2)
          setTimeout(() => {
            if (!computer.current) return
            computer.current.style.opacity = "1"
            computer.current.style.transition = "all 5s ease"
            if (window.innerWidth > 800)
              computer.current.style.filter = "blur(0)"
            else computer.current.style.filter = "brightness(20) blur(0.001)"
            for (let i = 0; i < s3.length; ++i)
              changeLetter3(s3.substring(0, i + 1), i)
            addComponentsAfterLoad(s3)
          }, s2.length * interval1 + 100)
        }, s1.length * interval1)
      }, 700)
    }
  }, [])
  return (
    <>
      <div className={st.container}>
        <nav className={st.links} ref={linksDiv}>
          <div className={st.item} onClick={() => goLink("about")}>
            Я
          </div>
          <div className={st.item} onClick={() => goLink("skills")}>
            Навыки
          </div>
          <div className={st.item} onClick={() => goLink("portfolio")}>
            Портфолио
          </div>
          <div className={st.item} onClick={() => goLink("contacts")}>
            Контакты
          </div>
          <div className={st.bord}></div>
          <div className={st.item} onClick={() => goLink("forYou")}>
            Для Вас
          </div>
        </nav>
        <div className={st.dev1}>{text1}</div>
        <div className={st.main}>
          <div className={st.main1}>
            <div className={st.dev2}>{text2}</div>
            <div className={st.mainText}>{text3}</div>
          </div>
          <Image
            src="/computer_main.png"
            alt=""
            width={800}
            height={800}
            className={st.computer}
            ref={computer}
            priority
          />
        </div>
        <Casino siteLoaded={siteLoaded} />
      </div>
    </>
  )
}
