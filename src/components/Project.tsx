import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import st from "../styles/All.module.scss"

interface propsType {
  headText: string
  descText: string
  imgSources: string[]
  using: boolean
}

let loaded: boolean = false
let imgChanging: boolean = false
let changeImgI: number = 0
let imgWid: number = 1;
let imgSourcesCopy: string[] = []
let imgLast = -1

export default function Project(props: propsType): JSX.Element {
  const [imgI, setImgI] = useState<number>(0)
  const line = useRef<HTMLDivElement>(null)
  const imgsRef = useRef<HTMLDivElement>(null)
  const [imgSources, setImgSources] = useState<string[]>([])
  const [imgTrans, setImgTrans] = useState<number>(1)
  useEffect(()=>{
    if(!loaded){
      loaded = true;
      imgWid = imgsRef.current!.offsetWidth;
      console.log(imgWid)
      console.log("props: ")
      console.log(props)
      let empty: string[] = []
      let preSources: string[] = props.imgSources
      preSources.unshift(preSources[preSources.length-1])
      preSources.push(preSources[1])
      console.log(props.imgSources)
      console.log(preSources)
      setImgSources(empty.concat(preSources))
      imgSourcesCopy = preSources
      imgLast = 0
    }
  }, [])
  useEffect(() => {
    console.log("using: " + props.using)
    if (props.using && !imgChanging) {
      imgChanging = true
      line.current!.style.transition = "all 7s linear"
      line.current!.style.width = "95%"
      let saveChangeImgI: number = changeImgI
      setTimeout(() => {
        if (saveChangeImgI == changeImgI) {
          changeImgI++
          imgLast = imgLast == props.imgSources.length-1 ? 0 : imgLast+1
          line.current!.style.transition = "all 0s linear"
          line.current!.style.width = "0%"
          let preSources: string[] = imgSourcesCopy
          let empty: string[] = []
          preSources.push(props.imgSources[imgLast])
          preSources.splice(0, 1)
          imgSourcesCopy = preSources
          console.log(imgSources)
          console.log(preSources)
          setImgTrans(0)
          setImgSources(empty.concat(preSources))
          setImgI(imgI-1)
          setTimeout(
            () => {
              imgChanging = false
              setImgTrans(1)
              setImgI(prev => prev != props.imgSources.length - 3 ? prev + 1 : 0)
            },
            50
          )
        }
      }, 7000)
    } else if (imgI != 0) setImgI(0)
  }, [imgI])
  return (
    <div className={st.project}>
      <div className={st.projectText}>
        <div className={st.projectTextHead}>{props.headText}</div>
        <div className={st.projectTextDesc}>{props.descText}</div>
      </div>
      <div className={st.projectImages}>
        <div className={st.projectImgsFlex} ref={imgsRef}>
          {imgSources.map((e, i) => {
            return (
              <Image
                className={st.projectImg}
                loading="lazy"
                src={`/portfolio${e}`}
                style={{marginLeft: i == 0 ? -(imgI+1) * imgWid + "px" : "0px", transition: `all ${imgTrans}s ease`}}
                key={i}
                width={900}
                height={900}
                alt="Загружаюсь..."
              />
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
          />
          <Image
            src="/arrow2.png"
            width={40}
            height={40}
            alt=""
            className={`${st.photoToggle} ${st.arr2}`}
          />
        </div>
      </div>
    </div>
  )
}
