import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import st from "../styles/All.module.scss"

interface propsType {
  headText: string
  descText: string
  imgSources: string[]
  using: boolean
}

let changeImgI: number = 0

export default function Project(props: propsType): JSX.Element {
  const [imgI, setImgI] = useState<number>(0)
  const line = useRef<HTMLDivElement>(null)
  useEffect(() => {
    console.log("using: " + props.using)
    if (props.using) {
      line.current!.style.transition = "all 7s linear"
      line.current!.style.width = "95%"
      let saveChangeImgI: number = changeImgI
      setTimeout(() => {
        if (saveChangeImgI == changeImgI) {
          changeImgI++
          line.current!.style.transition = "all 0s linear"
          line.current!.style.width = "0%"
          setTimeout(
            () => setImgI(imgI != props.imgSources.length - 1 ? imgI + 1 : 0),
            10
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
        <div className={st.projectImgsFlex}>
          {props.imgSources.map((e, i) => {
            return (
              <Image
                className={st.projectImg}
                loading="lazy"
                src={`/portfolio${e}`}
                style={{ display: imgI == i ? "block" : "none" }}
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
