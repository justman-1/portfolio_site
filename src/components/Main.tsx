import Image from "next/image"
import st from "../styles/Main.module.scss"
import { use, useEffect, useRef, useState } from "react"

let loaded: boolean = false

let skills: string[] = [
  "TYPESCRIPT",
  "NODE JS",
  "NEXT JS",
  "MYSQL",
  "MONGO DB",
  "MATERIAL UI",
  "REACT JS",
  "REDUX",
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

export default function Main() {
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
    }, 80 * i)
  }
  function changeLetter3(s: string, i: number): void {
    setTimeout(() => {
      setText3(s)
    }, 20 * i)
  }
  useEffect(() => {
    if (!loaded) {
      loaded = true
      let wid: number = lettersRef.current!.clientWidth
      let colvo: number = Math.floor(wid / 50)
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
            computer.current!.style.opacity = "1"
            computer.current!.style.transition = "all 5s ease"
            if (window.innerWidth > 800)
              computer.current!.style.filter = "blur(0)"
            else computer.current!.style.filter = "blur(4)"
            for (let i = 0; i < s3.length; ++i)
              changeLetter3(s3.substring(0, i + 1), i)
            setTimeout(() => {
              linksDiv.current!.style.opacity = "1"
            }, 20 * s3.length + 100)
          }, s2.length * 80 + 100)
        }, s1.length * 80)
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
      }, 100 - letState * 3)
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
      <div className={st.header}>Roman Malneu</div>
      <div className={st.container}>
        <div className={st.links} ref={linksDiv}>
          <div className={st.item}>Я</div>
          <div className={st.item}>Навыки</div>
          <div className={st.item}>Портфолио</div>
          <div className={st.item}>Контакты</div>
          <div className={st.bord}></div>
          <div className={st.item}>Дополнительно</div>
        </div>
        <div className={st.dev1}>{text1}</div>
        <div className={st.main}>
          <div className={st.main1}>
            <div className={st.dev2}>{text2}</div>
            <div className={st.mainText}>{text3}</div>
          </div>
          <Image
            src="/computer_main.png"
            alt=""
            width={1200}
            height={1200}
            className={st.computer}
            ref={computer}
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
                  color: e[1] ? "#E50A0A" : "white",
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
