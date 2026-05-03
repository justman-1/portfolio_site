import { useRef } from "react";
import st from "../styles/All.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { scroll } from "@/store/scrollSlice";
import AboutSubtitle from "./AboutSubtitle";

export default function About() {
  const isScroll = useAppSelector((state) => state.scroll.about);
  const dispatch = useAppDispatch();
  const loaded = useRef<boolean>(false);
  return (
    <>
      <h1 className={st.partHead}>Немного о себе</h1>
      <div className={st.aboutText}>
        <div>
          Я занимаюсь веб-разработкой с 2020 года. За эти годы приобрел
          коммерческий опыт, работая в стартапе в сфере Business Intelligence, а
          также занимаясь проектной занятостью, где мне удалось реализовать
          множество сайтов.
        </div>
        <h3>Вкратце про мой путь:</h3>
        <ul>
          <li className={st.textPoint}>
            <AboutSubtitle subtitle="Профессиональный рост: " /> Начал свою
            карьеру в веб-разработке в 2020 году, с тех пор постоянно расширяю
            свои знания и навыки в ходе коммерческой разработки, расширяя круг
            своих компетенций.
          </li>
          <li className={st.textPoint}>
            <AboutSubtitle subtitle="Коммерческий опыт: " /> За более чем год
            работы в стартапе Metric Soft и год работы на фриланс-биржах(Kwork в
            частности) получил богатый опыт создания сайтов, которые вы можете
            увидеть в моем{" "}
            <span
              className={st.link}
              onClick={() => {
                dispatch(scroll({ part: "portfolio", val: true }));
              }}
            >
              Портфолио
            </span>
            .
          </li>
        </ul>
        <h3>Достижения и навыки:</h3>
        <ul>
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
            информатике. Данное соревнование привело к пониманию важности
            написания оптимизированного кода, что положительно сказывается на
            коммерческой разработке.
          </li>
        </ul>
        {/* <div style={{ marginTop: "40px" }}>
          Я постоянно совершенствуюсь и готов предложить свои знания и опыт для
          воплощения Ваших уникальных идей в реальность.
        </div> */}
      </div>
    </>
  );
}
