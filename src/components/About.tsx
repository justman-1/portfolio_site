import { useRef } from "react"
import st from "../styles/All.module.scss"
import { useAppSelector, useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"
import AboutSubtitle from "./AboutSubtitle"

export default function About() {
  const isScroll = useAppSelector((state) => state.scroll.about)
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  return (
    <>
      <h1 className={st.partHead}>Немного о себе</h1>
      <div className={st.aboutText}>
        <div>
          Я занимаюсь веб-разработкой с 2020 года. За эти годы приобрел
          коммерческий опыт, работая на фриланс-биржах, где мне удалось
          реализовать множество проектов, связанных с сайтами и{" "}
          {`JavaScript'ом`} в целом.
        </div>
        <h3>Вкратце про мой путь:</h3>
        <li className={st.textPoint}>
          <AboutSubtitle subtitle="Профессиональный рост: " /> Начал свою
          карьеру в веб-разработке 4 года назад, с тех пор постоянно расширяю
          свои знания и навыки, изучая новые технологии, которые внедряю в
          рабочие проекты.
        </li>
        <li className={st.textPoint}>
          <AboutSubtitle subtitle="Коммерческий опыт: " /> За год работы на
          фриланс-биржах(Kwork + работа с заказчиками с телеграма) получил
          богатый опыт создания сайтов, которые вы можете увидеть в моем{" "}
          <span
            className={st.link}
            onClick={() => {
              dispatch(scroll({ part: "portfolio", val: true }))
            }}
          >
            Портфолио
          </span>
          .
        </li>
        <h3>Достижения и навыки:</h3>
        <li className={st.textPoint}>
          <AboutSubtitle subtitle="Проекты: " />
          Разработал большое количество разного рода сайтов и телеграм-ботов
          {/* (попользоваться{" "}
          <a
            href="https://t.me/DictionaryEnglishWordsBot"
            target="_blank"
            className={st.link}
          >
            одним из них
          </a>{" "}
          можете прямо сейчас) */}{" "}
          и множество других проектов, с помощью которых я научился решать
          нестандартные и трудоёмкие задачи.
        </li>
        <li className={st.textPoint}>
          <AboutSubtitle subtitle="Алгоритмическая подготовка: " /> Стал
          победителем третьего этапа белорусской республиканской олимпиады по
          информатике. Данное соревнование сильно развило во мне умение
          применять алгоритмы и математику в программировании. Благодаря этому я
          создаю качественный оптимизированный продукт.
        </li>
        <div style={{ marginTop: "40px" }}>
          Я постоянно совершенствуюсь и готов предложить свои знания и опыт для
          воплощения Ваших уникальных идей в реальность.
        </div>
      </div>
    </>
  )
}
