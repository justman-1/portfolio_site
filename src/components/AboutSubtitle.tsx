//import { useAppSelector } from "@/store/hook"
import { useEffect, useRef, useState } from "react"

export default function AboutSubtitle(props: { subtitle: string }) {
  const loaded = useRef<boolean>(false)
  const [color, setColor] = useState<"white" | "#a9c3ff">("white")
  //const isScroll = useAppSelector((state) => state.scroll.scrollY)/
  const elem = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true
      setInterval(() => {
        //console.log(window.scrollY)
        if (elem.current) {
          const rect = elem.current.getBoundingClientRect()
          if (
            window.screen.height * 0.15 < rect.top &&
            rect.top < window.screen.height * 0.75
          )
            setColor("#a9c3ff")
          else setColor("white")
        }
      }, 300)
    }
  }, [])
  return (
    <strong style={{ color: color, transition: "all 0.3s ease" }} ref={elem}>
      {props.subtitle}
    </strong>
  )
}
