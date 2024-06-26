import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import st from "../styles/Projects.module.scss"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/store/hook"
import { portfolioAppear } from "@/store/loadSlice"

interface propsType {
  headText: string
  descText: string
  imgSources: string[]
  using: boolean
}

export default function Project(props: propsType): JSX.Element {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const line = useRef<HTMLDivElement>(null)
  const imgsRef = useRef<HTMLDivElement>(null)
  const loaded = useRef<boolean>(false)
  const changeImgI = useRef<number>(0)
  const isImgChanging = useRef<boolean>(false)
  const changedByClick = useRef<boolean>(false)
  const [imgCurr, setImgCurr] = useState<number>(-1)
  const [imgSources, setImgSources] = useState<string[]>([])

  function changeImgEvent(isRight: boolean) {
    changeImg(isRight, true)
    lineAnimation(false)
    changedByClick.current = true
  }
  function lineAnimation(on: boolean) {
    if (!line.current) return
    line.current.style.transition = on ? "all 7s linear" : "all 0s linear"
    line.current.style.width = on ? "95%" : "0%"
  }
  function changeImg(toRight: boolean, isButton: boolean) {
    if (isImgChanging.current || !imgsRef.current) return
    changeImgI.current++
    isImgChanging.current = true
    imgsRef.current.style.transition = `all ${isButton ? 0.5 : 1}s ease`
    setTimeout(() => (isImgChanging.current = false), isButton ? 100 : 800)
    if (toRight) return setImgCurr((prev) => (prev + 1) % imgSources.length)
    setImgCurr((prev) => (imgSources.length + prev - 1) % imgSources.length)
  }
  function goToPortfolioPage() {
    dispatch(portfolioAppear(true))
  }

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      let preSources: string[] = props.imgSources
      setImgSources(preSources)
      setImgCurr(0)
    }
  }, [])
  useEffect(() => {
    if (!props.using) {
      if (imgCurr != 0) setImgCurr(0)
      return
    }
    if (changedByClick.current) {
      changedByClick.current = false
      let saveImgChangeI: number = changeImgI.current
      setTimeout(() => {
        if (saveImgChangeI == changeImgI.current)
          setImgCurr((prev) => (prev + 1) % imgSources.length)
      }, 10000)
      return
    }
    if (imgSources.length) {
      lineAnimation(false)
      setTimeout(() => {
        lineAnimation(true)
        changeImgI.current++
        let saveImgChangeI: number = changeImgI.current
        setTimeout(async () => {
          if (saveImgChangeI == changeImgI.current) {
            setTimeout(() => changeImg(true, false), 30)
          }
        }, 7000)
      }, 50)
    }
  }, [imgCurr, props.using])
  return (
    <>
      <div
        className={st.project}
        style={{ display: props.using ? " " : "none" }}
      >
        {props.imgSources.length ? (
          <>
            <div
              className={st.projectText}
              style={{
                display: props.imgSources.length ? " " : "none",
              }}
            >
              <div className={st.projectTextHead}>{props.headText}</div>
              <div className={st.projectTextDesc}>{props.descText}</div>
            </div>
            <div
              className={st.projectImages}
              style={{
                display: props.imgSources.length ? " " : "none",
              }}
            >
              <div
                className={st.projectImgsFlex}
                ref={imgsRef}
                style={{
                  left: -100 * imgCurr + "%",
                  width: props.imgSources.length * 100 + "%",
                }}
              >
                {imgSources.map((src, i) => {
                  return (
                    <div className={st.projectImg} key={i}>
                      <Image
                        src={"/portfolio" + src}
                        width={900}
                        height={900}
                        alt="Демонстрация проекта не загрузилась :("
                        className={st.projectImgIn}
                        priority
                      />
                    </div>
                  )
                })}
              </div>
              <div className={st.photoLine} ref={line}></div>
              <div className={st.photoArrows}>
                <Image
                  src="/arrow2.png"
                  width={40}
                  height={40}
                  alt=""
                  className={`${st.photoToggle} ${st.arr1}`}
                  onClick={() => changeImgEvent(false)}
                  priority
                />
                <Image
                  src="/arrow2.png"
                  width={40}
                  height={40}
                  alt=""
                  className={`${st.photoToggle} ${st.arr2}`}
                  onClick={() => changeImgEvent(true)}
                  priority
                />
              </div>
            </div>
            <div className={st.projectTextDescMob}>{props.descText}</div>
          </>
        ) : (
          <div className={st.projectSeeAllButton} onClick={goToPortfolioPage}>
            <div className={st.projectSeeAllButtonText}>
              Просмотреть все проекты
            </div>
            <Image
              src="/gallery.svg"
              width={150}
              height={150}
              alt=""
              className={st.projectSeeAllButtonImg}
              priority
            />
          </div>
        )}
      </div>
    </>
  )
}
