import Image from "next/image"
import st from "../styles/All.module.scss"
import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "@/store/hook"

function isDeviceMobileTest(): boolean {
  return window.innerWidth <= 600
}

function funcTop(k: number): number {
  //will return 0 < y <= 1
  return Math.log(k * 124) / Math.log(2) / 7
}
function funcLeft(k: number, isMobile: boolean): number {
  //will return 0 < y <= 1
  return Math.pow(k, isMobile ? 8 : 4)
}

function planeV(k: number): number {
  let ms = 0.06
  return ((-1.08 * k * k + k + 0.13) * 2.7) / ms
}

export default function Plane() {
  let currTopStart: number = 700
  let vec: boolean = false //false - bottom, true - top
  let prevScroll: number = 0
  let currTop: number = currTopStart
  let isPlaneReverse = false
  let isPlaneEnd = false
  let isScrollEnd: boolean = false
  let startLeft: number = 0
  const plane = useRef<HTMLImageElement>(null)
  const loaded = useRef<boolean>(false)
  const lineTopRedux = useAppSelector((state) => state.lineTop.top)
  const [lineTop, setLineTop] = useState<number>(0)

  useEffect(() => {
    setLineTop(lineTopRedux)
  }, [lineTopRedux])

  function reversePlane(toBottom: boolean): number {
    let interval: number = 0
    if (toBottom && vec) {
      interval = 350
      isPlaneReverse = true
      plane.current!.style.transition = "0.3s all linear"
      plane.current!.style.transform = "rotateZ(270deg)"
    } else if (!toBottom && !vec) {
      interval = 350
      isPlaneReverse = true
      plane.current!.style.transition = "0.3s all linear"
      plane.current!.style.transform = "rotateZ(90deg)"
    }
    vec = false
    return interval
  }
  function planeToBottom() {
    let interval = reversePlane(true)
    setTimeout(() => {
      isPlaneReverse = false
      plane.current!.style.transition =
        "all 1s cubic-bezier(0.215, 0.61, 0.355, 1)"
      plane.current!.style.top = currTop + "px"
      vec = false
    }, interval)
  }
  function planeToTop() {
    let interval = reversePlane(false)
    setTimeout(() => {
      isPlaneReverse = false
      plane.current!.style.transition =
        "all 1s cubic-bezier(0.215, 0.61, 0.355, 1)"
      plane.current!.style.top = currTop + "px"
      vec = true
    }, interval)
  }
  function planeLand() {
    let needTop: number = -1
    //get needTop:
    setLineTop((lineTop1) => {
      needTop = lineTop1 + (isDeviceMobileTest() ? 4.5 : 0)
      return lineTop1
    })
    isPlaneEnd = true
    let interval = reversePlane(true) + 20
    setTimeout(() => {
      let ost: number = needTop - currTop
      let ostLeft: number = 75 - (startLeft / window.innerWidth) * 100
      plane.current!.style.transition = "all 0.35s linear"
      let wasTime: number = 0
      let j: number = 10
      let k: number = 0.005
      while (k <= 1) {
        let K = k
        let wasTop: number = parseInt(plane.current!.style.top)
        let newTop: number = currTop + ost * funcTop(K)
        let wasLeft: number = parseInt(plane.current!.style.left)
        let newLeft: number =
          (startLeft / window.innerWidth) * 100 +
          funcLeft(K, isDeviceMobileTest()) * ostLeft
        let newDeg: number = 270 - funcTop(K) * 90
        let dist = Math.sqrt(
          Math.pow(newTop - wasTop, 2) + Math.pow(wasLeft - newLeft, 2)
        )
        wasTime += dist / planeV(K)
        let t: number = wasTime
        setTimeout(() => {
          plane.current!.style.top = newTop + "px"
          plane.current!.style.left = newLeft + "%"
          plane.current!.style.transform = `rotateZ(${newDeg}deg)`
        }, t)
        k += k < 0.94 ? 0.03 : 0.005
        j++
      }
      setTimeout(() => {
        plane.current!.style.transition = "all 0.8s ease-out"
        plane.current!.style.top = needTop + "px"
        plane.current!.style.left = "75%"
        plane.current!.style.transform = `rotateZ(180deg)`
      }, wasTime + 100)
    }, interval)
  }

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      currTopStart = (window.innerHeight - 50) * 0.5
      startLeft = window.innerWidth < 1500 ? 0 : (window.innerWidth - 1500) / 2
      plane.current!.style.left = startLeft + "px"
      setTimeout(() => {
        if (!plane.current) return
        plane.current!.style.top = currTopStart + "px"
        window.onscroll = (e) => {
          if (isPlaneEnd) return
          let currScroll: number = window.scrollY
          currTop = currTopStart + currScroll
          if (
            currScroll + window.innerHeight >
            document.body.scrollHeight + 50
          ) {
            if (isPlaneEnd) return
            isScrollEnd = true
            planeLand()
          } else isScrollEnd = false
          if (isPlaneReverse) return
          if (currScroll > prevScroll) {
            //to bottom
            planeToBottom()
          } else {
            //to top
            planeToTop()
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
