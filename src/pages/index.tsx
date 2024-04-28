import dynamic from "next/dynamic"
import st from "../styles/Index.module.scss"
import Plane from "../components/Plane"
import Main from "../components/Main"
import { useRef, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"
import Particles from "../components/Particles"
import About from "../components/About"
const Skills = dynamic(() => import("../components/Skills"), {
  ssr: false,
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})
const Portfolio = dynamic(() => import("../components/Portfolio"), {
  ssr: false,
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})
const ForYou = dynamic(() => import("../components/ForYou"), {
  ssr: false,
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})
const Contacts = dynamic(() => import("../components/Contacts"), {
  ssr: false,
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})

export default function Home() {
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  const windowLoaded = useRef<boolean>(false)
  const allAppear = useAppSelector((state) => state.load.all)
  const aboutScroll = useAppSelector((state) => state.scroll.about)
  const skillsScroll = useAppSelector((state) => state.scroll.skills)
  const portfolioScroll = useAppSelector((state) => state.scroll.portfolio)
  const forYouScroll = useAppSelector((state) => state.scroll.forYou)
  const contactsScroll = useAppSelector((state) => state.scroll.contacts)
  const allRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const forYouRef = useRef<HTMLDivElement>(null)
  const contactsRef = useRef<HTMLDivElement>(null)
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
    if (allAppear) {
      allRef.current!.style.opacity = "1"
      document.body.style.overflowY = "scroll"
    }
  }, [allAppear])
  useEffect(() => {
    if (!windowLoaded.current) {
      windowLoaded.current = true
      //scroll disable
      for (let i = 0; i < 70; ++i) {
        setTimeout(() => {
          window.scrollBy({ top: -100000 })
        }, i * 100)
      }
      setTimeout(() => {
        document.body.style.overflowY = "hidden"
      }, 10)
    }
  }, [])
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
  useEffect(() => {
    if (!loadSave()) return
    if (forYouScroll) {
      scrollTo(forYouRef.current!)
      dispatch(scroll({ part: "forYou", val: false }))
    }
  }, [forYouScroll])
  useEffect(() => {
    if (!loadSave()) return
    if (contactsScroll) {
      scrollTo(contactsRef.current!)
      dispatch(scroll({ part: "contacts", val: false }))
    }
  }, [contactsScroll])
  return (
    <>
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
        <div ref={forYouRef}>
          <ForYou />
        </div>
        <div ref={contactsRef}>
          <Contacts />
        </div>
      </div>
    </>
  )
}
