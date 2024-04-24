import Image from "next/image"
import st from "../styles/All.module.scss"
import { useEffect, useRef } from "react"

let currTopStart: number = 700
let vec: boolean = false
let prevScroll: number = 0
let currTop: number = currTopStart
let isPlaneReverse = false
let startLeft: number = 0

export default function Plane() {
  const plane = useRef<HTMLImageElement>(null)
  const loaded = useRef<boolean>(false)
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      currTopStart = (window.innerHeight - 50) * 0.5
      startLeft = window.innerWidth < 1500 ? 0 : (window.innerWidth - 1500) / 2
      plane.current!.style.left = startLeft + "px"
      setTimeout(() => {
        plane.current!.style.top = currTopStart + "px"
        window.onscroll = () => {
          let currScroll: number = window.scrollY
          currTop = currTopStart + currScroll
          if (isPlaneReverse) return
          if (currScroll > prevScroll) {
            //to bottom
            let interval: number = 0
            if (vec) {
              interval = 350
              isPlaneReverse = true
              plane.current!.style.transition = "0.3s all linear"
              plane.current!.style.transform = "rotateZ(270deg)"
            }
            setTimeout(() => {
              isPlaneReverse = false
              plane.current!.style.transition =
                "all 2s cubic-bezier(0.215, 0.61, 0.355, 1)"
              plane.current!.style.top = currTop + "px"
            }, interval)
            vec = false
          } else {
            //to top
            let interval: number = 0
            if (!vec) {
              interval = 350
              isPlaneReverse = true
              plane.current!.style.transition = "0.3s all linear"
              plane.current!.style.transform = "rotateZ(90deg)"
            }
            setTimeout(() => {
              isPlaneReverse = false
              plane.current!.style.transition =
                "all 2s cubic-bezier(0.215, 0.61, 0.355, 1)"
              plane.current!.style.top = currTop + "px"
            }, interval)
            vec = true
          }
          prevScroll = currScroll
        }
      }, 8100)
    }
  }, [])
  return (
    <>
      <Image
        ref={plane}
        src="/plane.png"
        width={100}
        height={100}
        alt=""
        className={st.plane}
        priority
      />
    </>
  )
}
