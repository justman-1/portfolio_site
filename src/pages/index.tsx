import { use, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import st from "../styles/Index.module.scss"
import Plane from "../components/Plane"
import Main from "../components/Main"
const Particles = dynamic(() => import("../components/Particles"))
const About = dynamic(() => import("../components/About"), {
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})
const Skills = dynamic(() => import("../components/Skills"))
const Portfolio = dynamic(() => import("../components/Portfolio"))

export default function Home() {
  return (
    <>
      <Main />
      <Plane />
      <Particles />
      <div className={st.all}>
        <About />
        <Skills />
        <Portfolio />
      </div>
    </>
  )
}
