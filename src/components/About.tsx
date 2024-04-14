import st from "../styles/All.module.scss"

export default function About() {
  function scrollToPortfolio() {}
  return (
    <div>
      <h1 className={st.partHead}>Немного о себе</h1>
      <h2 className={st.aboutText}>
        Веб-программированием занимаюсь начиная с 2020 года - около 4
        лет. Коммерческий опыт написания сайтов получил на фриланс-биржах,
        нарабатывал его около 5 месяцев. Примеры
        этих сайтов вы сможете увидеть в разделе
        <span onClick={scrollToPortfolio} className={st.link}>
          «Портфолио»
        </span>
        . Имеется алгоритмическая и математическая база: стал
        победителем третьего этапа белорусской республиканской олимпиады по
        информатике. Разработал собственного {" "}
        <a href="https://t.me/DictionaryEnglishWordsBot" className={st.link}>
          телеграм-бота
        </a>
        , а также множество других проектов, главные из которых смотрите{" "}
        <span onClick={scrollToPortfolio} className={st.link}>
          здесь
        </span>
        .
      </h2>
    </div>
  )
}
