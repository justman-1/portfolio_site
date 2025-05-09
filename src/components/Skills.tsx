import st from "../styles/All.module.scss"
import Image from "next/image"

let frontendSkills: [string, string][] = [
  ["HTML", "html.png"],
  ["CSS", "css.png"],
  ["JavaScript", "js.png"],
  ["React.js", "reactjs.png"],
  ["Next.js", "nextjs.png"],
  ["Sass", "sass.png"],
  ["Tailwind", "tailwind.svg"],
  ["Redux Toolkit", "rtk.png"],
  ["Zustand", "zustand.png"],
  ["Material UI", "materialui.png"],
  ["Chakra UI", "chakraui.png"],
]
let backendSkills: [string, string][] = [
  ["Node JS", "nodejs.png"],
  /* ["Nest js", "nest.png"], */
  ["Express JS", "express.png"],
  ["MySQL", "mysql.png"],
  ["MongoDB", "mongo.png"],
  ["Node-cache", "nodecache.png"],
  ["Redis", "redis.png"],
]
let additionalSkills: [string, string][] = [
  ["TypeScript", "ts.png"],
  ["GIT", "git.png"],
  ["Docker", "docker.png"],
  ["JWT", "jwt.png"],
]

let info: [string, [string, string][]][] = [
  ["FRONTEND", frontendSkills],
  ["BACKEND", backendSkills],
  ["А ТАКЖЕ", additionalSkills],
]

export default function Skills() {
  return (
    <>
      <h1 className={st.partHead}>Основной стек используемых технологий</h1>
      <div className={st.stackList}>
        {info.map((e1, key1) => {
          return (
            <div className={st.stackPart} key={key1}>
              <h2 className={st.stackPartHead}>{e1[0]}</h2>
              {e1[1].map((e, key) => (
                <div className={st.stackPartText} key={key}>
                  <Image
                    src={"/icons/" + e[1]}
                    width={60}
                    height={60}
                    style={{ width: "30px", height: "30px" }}
                    alt=""
                    priority
                  />
                  {e[0]}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
