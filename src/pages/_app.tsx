import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Manrope, Oxygen } from "next/font/google"
import { useState, useEffect, useMemo } from "react"

const inter = Manrope({ subsets: ["latin"], weight: "400" })

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
    let addX: number = Math.random() * 200 - 100
    let addY: number = Math.random() * 200 - 100
    div!.style.transition = "all 6s linear"
    div!.style.top = y + addY + "px"
    div!.style.left = x + addX + "px"
    div!.style.opacity = "0"
    setTimeout(() => {
      div!.style.transition = "all 0s linear"
      stackAdd(div!)
    }, 6100)
  }, 10)
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!loaded) {
      loaded = true
      for (let i = 0; i < 80; ++i) {
        let div: HTMLDivElement = document.createElement("div")
        div.className = "point"
        document.body.appendChild(div)
        stackAdd(div)
      }
      window.scrollTo(0, 0)
      setTimeout(() => (document.body.style.overflowY = "hidden"), 10)
      setTimeout(() => {
        document.body.style.overflowY = "scroll"
      }, 8200)
    }
  }, [])
  return (
    <main className={inter.className} onMouseMove={particles}>
      <Component {...pageProps} />
    </main>
  )
}
