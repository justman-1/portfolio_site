import st from "../styles/All.module.scss"

let frontendSkills: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "Next JS",
  "Redux Toolkit",
  "Sass",
  "Material UI",
]
let backendSkills: string[] = [
  "Node JS",
  "Express JS",
  "MySQL",
  "MongoDB",
  "Node-cache",
  "Redis",
]
let additionalSkills: string[] = ["TypeScript", "GIT", "Docker", "JWT"]

export default function Skills() {
  return (
    <>
      <h1 className={st.partHead}>Используемый стек технологий</h1>
      <div className={st.stackList}>
        <div className={st.stackPart}>
          <h2 className={st.stackPartHead}>FRONTEND</h2>
          {frontendSkills.map((e, key) => (
            <li className={st.stackPartText} key={key}>
              {e}
            </li>
          ))}
        </div>
        <div className={st.stackPart}>
          <h2 className={st.stackPartHead}>BACKEND</h2>
          {backendSkills.map((e, key) => (
            <li className={st.stackPartText} key={key}>
              {e}
            </li>
          ))}
        </div>
        <div className={st.stackPart}>
          <h2 className={st.stackPartHead}>А ТАКЖЕ</h2>
          {additionalSkills.map((e, key) => (
            <li className={st.stackPartText} key={key}>
              {e}
            </li>
          ))}
        </div>
      </div>
    </>
  )
}
