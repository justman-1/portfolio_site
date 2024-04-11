import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Manrope, Oxygen } from "next/font/google"
import { useState, useEffect, useMemo } from "react"

const inter = Manrope({ subsets: ["latin"], weight: "400" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
