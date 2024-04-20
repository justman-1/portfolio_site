import { useRef } from "react"
import st from "../styles/All.module.scss"
import { useAppSelector, useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"

export default function About() {
  const isScroll = useAppSelector((state) => state.scroll.about)
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  return (
    <div>
      <h1 className={st.partHead}>Немного о себе</h1>
      <h2 className={st.aboutText}>
        Веб-программированием занимаюсь начиная с 2020 года - около 4 лет.
        Коммерческий опыт написания сайтов получил на фриланс-биржах,
        нарабатывал его около 5 месяцев. Примеры этих сайтов вы сможете увидеть
        в разделе
        <span
          onClick={() => {
            dispatch(scroll({ part: "portfolio", val: true }))
          }}
          className={st.link}
        >
          «Портфолио»
        </span>
        . Имеется алгоритмическая и математическая база: стал победителем
        третьего этапа белорусской республиканской олимпиады по информатике.
        Разработал собственного{" "}
        <a
          href="https://t.me/DictionaryEnglishWordsBot"
          target="_blank"
          className={st.link}
        >
          телеграм-бота
        </a>
        , а также множество других проектов, главные из которых смотрите{" "}
        <span
          onClick={() => {
            dispatch(scroll({ part: "portfolio", val: true }))
          }}
          className={st.link}
        >
          здесь
        </span>
        .
      </h2>
    </div>
  )
}
