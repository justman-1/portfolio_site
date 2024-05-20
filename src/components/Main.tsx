import Image from "next/image"
import st from "../styles/Main.module.scss"
import { useEffect, useRef, useState, Suspense } from "react"
import { scroll } from "../store/scrollSlice"
import { load } from "../store/loadSlice.ts"
import { useAppDispatch } from "../store/hook.ts"

const interval1: number = 80
const interval2: number = 20
const letterInterval: number = 100

let skills: string[] = [
  "TYPESCRIPT",
  "NODE JS",
  "NEXT JS",
  "MYSQL",
  "MONGO DB",
  "MATERIAL UI",
  "REACT JS",
  "REDUX TOOLKIT",
  "GIT",
  "EXPRESS JS",
  "DOCKER",
  "SCSS",
  "REDIS",
]
let skillState: number[] = []
for (let i = 0; i < skills.length; ++i) skillState.push(0)
let minSkillState: number = 0
let minSkillStateOst: number = skills.length
let baseLetter = {
  height: "47px",
  fontSize: "1.9em",
}

export default function Main() {
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  const [text1, setText1] = useState<string>("")
  const [text2, setText2] = useState<string>("")
  const [text3, setText3] = useState<string>("")
  const [letters, setLetters] = useState<[string, boolean][]>([]) //[symbol, width]
  const [letState, setLetState] = useState<number>(0)
  const computer = useRef<HTMLImageElement>(null)
  const lettersRef = useRef<HTMLDivElement>(null)
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
      setLetState(29)
      setTimeout(() => {
        if (!lettersRef.current) return
        lettersRef.current.style.opacity = "1"
        setTimeout(() => dispatch(load(true)), 200)
      }, 200)
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
      let wid: number = lettersRef.current!.clientWidth
      let colvo: number =
        window.innerWidth < 600 ? Math.floor(wid / 40) : Math.floor(wid / 50)
      for (let i = 0; i < colvo; ++i)
        letters.push([
          String.fromCharCode(65 + Math.floor(Math.random() * 25)) + "",
          false,
        ])
      skills = skills.filter((skill) => skill.length <= colvo)
      minSkillStateOst = colvo
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
  useEffect(() => {
    let newLetters: [string, boolean][] = []
    if (letState < 30) {
      for (let i = 0; i < letters.length; ++i)
        newLetters.push([
          String.fromCharCode(65 + Math.floor(Math.random() * 25)) + "",
          false,
        ])
      setLetters(newLetters)
      setTimeout(() => {
        setLetState(letState + 1)
      }, letterInterval - letState * 2)
    } else {
      newLetters = newLetters.concat(letters)
      let skillI: number = Math.floor(Math.random() * skills.length)
      let i = 0
      let changed: boolean = false
      while (true) {
        if (skillState[i] <= minSkillState) {
          changed = true
          if (!skillI) {
            skillI = i
            break
          } else skillI--
        }
        i = i < skills.length - 1 ? i + 1 : 0
        if (i == 0 && !changed) break
      }
      skillState[skillI]++
      minSkillStateOst--
      if (!minSkillStateOst) {
        minSkillStateOst = skills.length
        minSkillState++
      }
      let pos: number = Math.floor(
        Math.random() * (letters.length - skills[skillI].length)
      )
      for (let i = 0; i < skills[skillI].length; ++i) {
        if (skills[skillI][i] != " ")
          newLetters[pos + i] = [skills[skillI][i], true]
      }
      setLetters(newLetters)
      setTimeout(() => {
        setLetState(0)
      }, 2500)
    }
  }, [letState])
  return (
    <>
      <div className={st.container}>
        <nav className={st.links} ref={linksDiv}>
          <div
            className={st.item}
            onClick={() => {
              goLink("about")
            }}
          >
            Я
          </div>
          <div
            className={st.item}
            onClick={() => {
              goLink("skills")
            }}
          >
            Навыки
          </div>
          <div
            className={st.item}
            onClick={() => {
              goLink("portfolio")
            }}
          >
            Портфолио
          </div>
          <div
            className={st.item}
            onClick={() => {
              goLink("contacts")
            }}
          >
            Контакты
          </div>
          <div className={st.bord}></div>
          <div
            className={st.item}
            onClick={() => {
              goLink("forYou")
            }}
          >
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
        <div
          className={st.randLetters}
          ref={lettersRef}
          style={{
            transition: `all ${letState == 30 ? "0.3" : "1"}s linear`,
            filter: `blur(${letState < 30 ? "2" : "0"}px)`,
          }}
        >
          {letters.map((e, key) => {
            return (
              <div
                className={st.letter}
                style={{
                  width: 100 / letters.length + "%",
                  color: e[1] ? "#1A69F3" : "white",
                }}
                key={key}
              >
                <span
                  style={{
                    transform: `scale(${e[1] ? "1.1" : "1"})`,
                    transition: "all 0.2s ease",
                  }}
                >
                  {e[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
