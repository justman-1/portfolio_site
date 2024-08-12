import { useRef } from "react"
import st from "../styles/All.module.scss"
import { useAppSelector, useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"

export default function About() {
  const isScroll = useAppSelector((state) => state.scroll.about)
  const dispatch = useAppDispatch()
  const loaded = useRef<boolean>(false)
  return (
    <>
      <h1 className={st.partHead}>Немного о себе</h1>
      <div className={st.aboutText}>
        <div>
          Я занимаюсь веб-разработкой с 2020 года. За это время приобрел
          коммерческий опыт, работая на фриланс-биржах, где мне удалось
          создать множество сайтов от самых простых, до объемных и сложных.
        </div>
        <h3>Вкратце про мой путь:</h3>
        <li className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Профессиональный рост: </strong>
          Начал свою карьеру в веб-разработке 4 года назад, с тех пор постоянно
          изучаю новые технологии и подходы, которые
          внедряю в рабочие проекты.
        </li>
        <li className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Коммерческий опыт: </strong>
          За год работы на фрилансе(в частности на платформе Kwork) получил 
          богатый опыт создания сайтов, которые вы можете
          увидеть в моем{" "}
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
          <strong style={{ color: "#C8D9FF" }}>
            Алгоритмическая подготовка:{" "}
          </strong>
          Стал победителем третьего этапа белорусской республиканской олимпиады
          по информатике. Данное соревнование сильно развило во мне умение
          применять алгоритмы и математику в программировании, а также быстро изучать
          большой объем данных. Благодаря этому я эффективно
          создаю качественный оптимизированный продукт.
        </li>
        <li className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Проекты: </strong>
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
          , с помощью которых я накопил много опыта и научился решать
          нестандартные задачи.
        </li>
        <div style={{ marginTop: "40px" }}>
          Я постоянно совершенствуюсь и готов предложить свои знания и опыт для
          воплощения Ваших уникальных идей в реальность.
        </div>
      </div>
    </>
  )
}
