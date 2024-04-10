import st from "../styles/All.module.scss"

let frontendSkills: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "Next JS",
  "Redux",
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
      <div className={st.partHead}>Используемый стек технологий</div>
      <div className={st.stackList}>
        <div className={st.stackPart}>
          <div className={st.stackPartHead}>FRONTEND</div>
          {frontendSkills.map((e, key) => (
            <div className={st.stackPartText} key={key}>
              {e}
            </div>
          ))}
        </div>
        <div className={st.stackPart}>
          <div className={st.stackPartHead}>BACKEND</div>
          {backendSkills.map((e, key) => (
            <div className={st.stackPartText} key={key}>
              {e}
            </div>
          ))}
        </div>
        <div className={st.stackPart}>
          <div className={st.stackPartHead}>А ТАКЖЕ</div>
          {additionalSkills.map((e, key) => (
            <div className={st.stackPartText} key={key}>
              {e}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
