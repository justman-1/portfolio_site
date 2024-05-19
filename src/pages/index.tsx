import dynamic from "next/dynamic"
import Head from "next/head"
import st from "../styles/Index.module.scss"
import Header from "@/components/Header"
import Plane from "../components/Plane"
import Main from "../components/Main"
import { useRef, useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"
import Particles from "../components/Particles"
import About from "../components/About"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
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
const PortfolioFull = dynamic(() => import("../components/PortfolioFull"), {
  ssr: false,
  loading: () => <div className={st.loadingText}>Загружаюсь...</div>,
})

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  /* const scrollY = useAppSelector((state) => state.scroll.scrollY) */
  const loaded = useRef<boolean>(false)
  const windowLoaded = useRef<boolean>(false)
  /* const isAllApeared = useRef<boolean>(false) */
  const allAppear = useAppSelector((state) => state.load.all)
  const portAppear = useAppSelector((state) => state.load.portfolioAppear)
  const aboutScroll = useAppSelector((state) => state.scroll.about)
  const skillsScroll = useAppSelector((state) => state.scroll.skills)
  const portfolioScroll = useAppSelector((state) => state.scroll.portfolio)
  const forYouScroll = useAppSelector((state) => state.scroll.forYou)
  const contactsScroll = useAppSelector((state) => state.scroll.contacts)
  const mainRef = useRef<HTMLDivElement>(null)
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
    let y: number = elem.offsetTop - window.scrollY - 50
    window.scrollBy({ top: y, behavior: "smooth" })
  }

  /* useEffect(() => {
    //APPEARING BLOCKS WHEN SCROLLING
    if (isAllApeared.current) return
    console.log("asgd")
    let refs: HTMLDivElement[] = [
      mainRef.current!,
      aboutRef.current!,
      skillsRef.current!,
      portfolioRef.current!,
      forYouRef.current!,
      contactsRef.current!,
    ]
    for (let i = 0; i < refs.length; ++i) {
      const ref = refs[i]
      const rect = ref.getBoundingClientRect()
      if (rect.y < 820) {
        ref.style.opacity = "1"
        ref.style.filter = "blur(0px)"
        if (i == 5) isAllApeared.current = true
      }
    }
  }, [scrollY]) */
  useEffect(() => {
    if (!windowLoaded.current) {
      windowLoaded.current = true
      document.body.className = st.indexBody
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
    if (portAppear) {
      if (!allRef.current) return
      allRef.current.style.opacity = "0"
      allRef.current.style.filter = "blur(10px)"
      document.body.style.overflowY = "hidden"
    } else {
      if (!allRef.current || !allAppear) return
      setTimeout(() => {
        if (!allRef.current) return
        allRef.current.style.opacity = "1"
        allRef.current.style.filter = ""
        document.body.style.overflowY = "scroll"
      }, 600)
    }
  }, [portAppear])
  useEffect(() => {
    if (allAppear) {
      allRef.current!.style.opacity = "1"
      document.body.style.overflowY = "scroll"
    }
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
      <Head>
        <title>Roman Malneu | Fullstack JavaScript Разработчик</title>
      </Head>
      <Header was={false} />
      <div className={st.blockStylesForAppear} ref={mainRef}>
        <Main />
      </div>
      <Plane />
      <Particles />
      <div className={st.all} ref={allRef}>
        <div className={st.blockStylesForAppear} ref={aboutRef}>
          <About />
        </div>
        <div className={st.blockStylesForAppear} ref={skillsRef}>
          <Skills />
        </div>
        <div className={st.blockStylesForAppear} ref={portfolioRef}>
          <Portfolio />
        </div>
        <div className={st.blockStylesForAppear} ref={forYouRef}>
          <ForYou />
        </div>
        <div className={st.blockStylesForAppear} ref={contactsRef}>
          <Contacts />
        </div>
      </div>
      <PortfolioFull />
      <Footer />
    </>
  )
}
