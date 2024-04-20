import dynamic from "next/dynamic"
import st from "../styles/Index.module.scss"
import Plane from "../components/Plane"
import Main from "../components/Main"
import { useRef, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"
const Particles = dynamic(() => import("../components/Particles"))
const About = dynamic(() => import("../components/About"), {
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})
const Skills = dynamic(() => import("../components/Skills"))
const Portfolio = dynamic(() => import("../components/Portfolio"))

export default function Home() {
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  const allAppear = useAppSelector((state) => state.load.all)
  const aboutScroll = useAppSelector((state) => state.scroll.about)
  const skillsScroll = useAppSelector((state) => state.scroll.skills)
  const portfolioScroll = useAppSelector((state) => state.scroll.portfolio)
  const allRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  function loadSave(): boolean {
    if (loaded.current) return true
    loaded.current = true
    return false
  }
  function scrollTo(elem: HTMLDivElement) {
    let y: number = elem.offsetTop - 50
    window.scrollBy({ top: y, behavior: "smooth" })
  }
  useEffect(() => {
    if (allAppear) allRef.current!.style.opacity = "1"
  }, [allAppear])
  useEffect(() => {
    if (!loadSave()) return
    if (aboutScroll) {
      scrollTo(aboutRef.current!)
      dispatch(scroll({ part: "about", val: false }))
    }
  }, [aboutScroll])
  useEffect(() => {
    if (!loadSave()) return
    if (skillsScroll) {
      scrollTo(skillsRef.current!)
      dispatch(scroll({ part: "skills", val: false }))
    }
  }, [skillsScroll])
  useEffect(() => {
    if (!loadSave()) return
    if (portfolioScroll) {
      scrollTo(portfolioRef.current!)
      dispatch(scroll({ part: "portfolio", val: false }))
    }
  }, [portfolioScroll])
  return (
    <>
      {/* <Image
        src="/back1.jpg"
        width={1700}
        height={1700}
        alt=""
        className={st.back1}
      /> */}
      <Main />
      <Plane />
      <Particles />
      <div className={st.all} ref={allRef}>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={skillsRef}>
          <Skills />
        </div>
        <div ref={portfolioRef}>
          <Portfolio />
        </div>
      </div>
    </>
  )
}
