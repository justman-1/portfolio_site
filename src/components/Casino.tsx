import st from "../styles/Main.module.scss"
import { useEffect, useRef, useState } from "react"

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
  "CHAKRA UI",
  "ZUSTAND",
]
let skillState: number[] = []
for (let i = 0; i < skills.length; ++i) skillState.push(0)
let minSkillState: number = 0
let minSkillStateOst: number = skills.length
const letterInterval: number = 100

interface PropsType {
  siteLoaded: boolean
}

export default function Casino(props: PropsType) {
  const loaded = useRef<boolean>(false)
  const [letters, setLetters] = useState<[string, boolean][]>([]) //[symbol, width]
  const lettersRef = useRef<HTMLDivElement>(null)
  const [letState, setLetState] = useState<number>(0)
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
    }
  }, [])
  useEffect(() => {
    if (props.siteLoaded) {
      setLetState(29)
      setTimeout(() => {
        if (!lettersRef.current) return
        lettersRef.current.style.opacity = "1"
      }, 200)
    }
  }, [props.siteLoaded])
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
              }}
            >
              {e[0]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
