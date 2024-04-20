import { useEffect } from "react"

interface Stack {
  to: Stack | null
  div: HTMLDivElement | null
}
function stackAdd(div: HTMLDivElement): void {
  stack = { to: stack, div: div }
}
function stackGet(): HTMLDivElement | null {
  let ans: HTMLDivElement | null = stack.div
  if (stack.to) stack = stack.to
  return ans
}

let loaded: boolean = false
let wid: number = 0
let stack: Stack = { to: null, div: null }

let canAddPoint: boolean = true

function particles(e: any) {
  let date: number = new Date().getTime()
  if (!canAddPoint) return
  canAddPoint = false
  setTimeout(() => (canAddPoint = true), 80)
  let x: number = e.clientX
  let y: number = e.clientY + window.scrollY
  let div: HTMLDivElement | null = stackGet()
  if (!div) return
  div!.style.opacity = "1"
  div!.style.top = y + "px"
  div!.style.left = x + "px"
  setTimeout(() => {
    let newX: number = Math.min(Math.random() * 200 - 100 + x, wid)
    let newY: number = Math.random() * 200 - 100 + y
    div!.style.transition = "all 6s linear"
    div!.style.top = newY + "px"
    div!.style.left = newX + "px"
    div!.style.opacity = "0"
    setTimeout(() => {
      div!.style.transition = "all 0s linear"
      stackAdd(div!)
    }, 6100)
  }, 10)
}

export default function Particles() {
  useEffect(() => {
    if (!loaded) {
      loaded = true
      wid = window.innerWidth - 20
      for (let i = 0; i < 80; ++i) {
        let div: HTMLDivElement = document.createElement("div")
        div.className = "point"
        document.body.appendChild(div)
        stackAdd(div)
      }
      window.onmousemove = particles
      window.scrollTo(0, 0)
      setTimeout(() => (document.body.style.overflowY = "hidden"), 10)
      setTimeout(() => {
        document.body.style.overflowY = "scroll"
      }, 8200)
    }
  }, [])
  return <></>
}
