import Image from "next/image"
import { memo, useEffect, useRef, useState } from "react"
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

interface ImgPropsType{
  src: string
}

const ImgMemo = memo(function comp(props: ImgPropsType){
  return(
    <Image src={"/portfolio" + props.src} width={900} height={900} alt="Загружаюсь..." className={st.projectImgIn}/>
  )
})

export default function Project(props: propsType): JSX.Element {
  const line = useRef<HTMLDivElement>(null)
  const imgsRef = useRef<HTMLDivElement>(null)
  const [imgSources, setImgSources] = useState<string[]>([])
  const [imgAnim, setImgAnim] = useState<string>("")
  function toggleImg(isRight: boolean){
    imgChanging = false
    if(isRight)
      imgLast = imgLast == props.imgSources.length-1 ? 0 : imgLast+1
    else
      imgLast = imgLast == 0 ? props.imgSources.length-1 : imgLast-1
    console.log("add: " + imgLast)
    line.current!.style.transition = "all 0s linear"
    line.current!.style.width = "0%"
    let preSources: string[] = imgSourcesCopy
    let empty: string[] = []
    if(isRight){
      preSources.push(props.imgSources[imgLast])
      preSources.splice(0, 1)
    }
    else{//5 1 2 3 4 5 1
      let imgStart: number = (imgLast - 2 + props.imgSources.length) % props.imgSources.length 
      console.log("imgStart: " + imgStart)
      preSources.unshift(props.imgSources[imgStart])
      preSources.splice(preSources.length-1, 1)
    } 
    imgSourcesCopy = preSources
    console.log(imgSources)
    console.log(preSources)
    setImgAnim("")
    if(isRight)
      setImgAnim("imgToRight 1s ease")
    else
      setImgAnim("imgToLeft 1s ease")
    console.log("anim: " + imgAnim)
    setImgSources(empty.concat(preSources))
  }
  useEffect(()=>{
    if(!loaded){
      loaded = true;
      imgWid = imgsRef.current!.offsetWidth;
      console.log(imgWid)
      console.log("props: ")
      console.log(props)
      let empty: string[] = []
      let preSources: string[] = props.imgSources.slice(1)
      preSources.unshift(props.imgSources[props.imgSources.length-1])
      console.log(props.imgSources)
      console.log(preSources)
      setImgSources(empty.concat(preSources))
      imgSourcesCopy = preSources
      imgLast = 1
    }
  }, [])
  useEffect(() => {
    console.log("using: " + props.using)
    if (props.using && !imgChanging) {
      imgChanging = true
      setImgAnim("")
      setImgAnim("imgToRight 1s ease")
      line.current!.style.transition = "all 7s linear"
      line.current!.style.width = "95%"
      let saveChangeImgI: number = changeImgI
      setTimeout(() => {
        if (saveChangeImgI == changeImgI) {
          changeImgI++
          toggleImg(true)
        }
      }, 7000)
    }
  }, [imgSources])
  return (
    <div className={st.project}>
      <div className={st.projectText}>
        <div className={st.projectTextHead}>{props.headText}</div>
        <div className={st.projectTextDesc}>{props.descText}</div>
      </div>
      <div className={st.projectImages}>
        <div className={st.projectImgsFlex} ref={imgsRef}>
          {imgSources.map((src, i) => {
            if(i ==0 )
              console.log("rerender")
            return (
              <div className={st.projectImg} style={{animation: i == 0 ? imgAnim : ""}} key={i+changeImgI}>
                <ImgMemo src={src}/>
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
