import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Manrope, Oxygen } from "next/font/google"
import { Provider } from "react-redux"
import { store } from "../store/index.ts"

const inter = Manrope({ subsets: ["latin"], weight: "400" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  )
}
