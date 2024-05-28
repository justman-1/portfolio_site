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
          Я занимаюсь веб-разработкой с 2020 года. За эти годы приобрел
          коммерческий опыт, работая на фриланс-биржах, где мне удалось
          реализовать множество проектов, связанных с сайтами и{" "}
          {`JavaScript'ом`} в целом.
        </div>
        <h3>Вкратце про мой путь:</h3>
        <li className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Профессиональный рост: </strong>
          Начал свою карьеру в веб-разработке 4 года назад, с тех пор постоянно
          расширяю свои знания и навыки, изучая новые технологии, которые
          внедряю в рабочие проекты.
        </li>
        <li className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Коммерческий опыт: </strong>
          За год работы на фриланс-биржах(Kwork + работа с заказчиками с
          телеграма) получил богатый опыт создания сайтов, которые вы можете
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
          применять алгоритмы и математику в программировании. Благодаря этому я
          создаю качественный оптимизированный продукт.
        </li>
        <li className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Проекты: </strong>
          Разработал большое количество веб-приложений, телеграм-ботов
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
          нестандартные задачи и выполнять свою работу эффективно.
        </li>
        <div style={{ marginTop: "40px" }}>
          Я постоянно совершенствуюсь и готов предложить свои знания и опыт для
          реализации того, что действительно стоит внимания.
        </div>
      </div>
    </>
  )
}
