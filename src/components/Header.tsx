import { Tenor_Sans } from "next/font/google"
import { useEffect, useRef, useState } from "react"
import st from "../styles/Main.module.scss"
const inter = Tenor_Sans({ subsets: ["latin"], weight: "400" })

interface propsType {
  was: boolean
}

export default function Header(props: propsType) {
  const loaded = useRef<boolean>(false)
  const [top, setTop] = useState<string>(!props.was ? "-2.5em" : "0em")
  useEffect(() => {
    if (!loaded.current && !props.was) {
      loaded.current = true
      setTimeout(() => setTop("0em"), 250)
    }
  }, [])
  return (
    <header style={{ top: top }} className={st.header + " " + inter.className}>
      Roman Malneu
    </header>
  )
}
