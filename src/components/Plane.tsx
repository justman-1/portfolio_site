import Image from "next/image"
import st from "../styles/All.module.scss"
import { useEffect, useRef } from "react"

function isDeviceMobileTest(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
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
    isPlaneEnd = true
    let interval = reversePlane(true) + 20
    setTimeout(() => {
      let ost: number =
        document.body.scrollHeight +
        (window.innerWidth > 600 ? 6.5 : -16) -
        currTop
      plane.current!.style.transition = "all 0.35s linear"
      let wasTime: number = 0
      let j: number = 10
      let k: number = 0.005
      while (k <= 1) {
        let K = k
        let wasTop: number = parseInt(plane.current!.style.top)
        let newTop: number = currTop + ost * funcTop(K)
        let wasLeft: number = parseInt(plane.current!.style.left)
        let newLeft: number = funcLeft(K, isDeviceMobileTest()) * 75
        let newDeg: number = 270 - funcTop(K) * 90
        let dist = Math.sqrt(
          Math.pow(newTop - wasTop, 2) + Math.pow(wasLeft - newLeft, 2)
        )
        wasTime += dist / planeV(K)
        let t: number = wasTime
        setTimeout(() => {
          /* console.log("")
          console.log("K: " + K)
          console.log("top: " + newTop)
          console.log("v: " + planeV(K))
          console.log("dist: " + dist)
          console.log("time: " + t)
          console.log("deg: " + (270 - K * 90)) */
          plane.current!.style.top = newTop + "px"
          plane.current!.style.left = newLeft + "%"
          plane.current!.style.transform = `rotateZ(${newDeg}deg)`
        }, t)
        k += k < 0.94 ? 0.03 : 0.005
        j++
      }
      setTimeout(() => {
        plane.current!.style.transition = "all 0.8s ease-out"
        plane.current!.style.top =
          document.body.scrollHeight +
          (window.innerWidth > 600 ? 6.5 : -16) +
          "px"
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
