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
          Я занимаюсь веб-разработкой с 2020 года. За эти годы приобрел ценный
          коммерческий опыт, работая на фриланс-биржах, где мне удалось
          реализовать множество проектов, связанных с сайтами и{" "}
          {`JavaScript'ом`} в целом.
        </div>
        <h3>Вкратце про мой путь:</h3>
        <li className={st.textPoint}>
          <strong>Профессиональный рост: </strong>
          Начал свою карьеру в веб-разработке около 4 лет назад, с тех пор
          постоянно расширяю свои знания и навыки, изучая новые технологии,
          которые внедряю в рабочие проекты.
        </li>
        <li className={st.textPoint}>
          <strong>Коммерческий опыт: </strong>
          За 5 месяцев интенсивной работы на фриланс-биржах получил богатый опыт
          создания сайтов, которые вы можете увидеть в моем{" "}
          <span
            className={st.link}
            onClick={() => {
              dispatch(scroll({ part: "portfolio", val: true }))
            }}
          >
            Портфолио
          </span>{" "}
          на этом сайте.
        </li>
        <h3>Достижения и навыки:</h3>
        <li className={st.textPoint}>
          <strong>Алгоритмическая подготовка: </strong>
          Стал победителем третьего этапа белорусской республиканской олимпиады
          по информатике. Данное соревнование сильно развило меня в плане умения
          применять алгоритмы и математику в программировании. Это помогает
          создавать качественный продукт, который банально не тормозит.
        </li>
        <li className={st.textPoint}>
          <strong>Проекты: </strong>
          Разработал множество веб-приложений, телеграм-ботов(попользоваться{" "}
          <a
            href="https://t.me/DictionaryEnglishWordsBot"
            target="_blank"
            className={st.link}
          >
            одним из них
          </a>{" "}
          можете прямо сейчас) и множество других проектов, которые
          демонстрируют мою способность решать нестандартные задачи и выполнять
          свою работу эффективно.
        </li>
        <div style={{ marginTop: "40px" }}>
          Я стремлюсь к постоянному совершенствованию и готов предложить свои
          знания и опыт для реализации того, что действительно стоит внимания.
        </div>
      </div>
    </>
  )
}
