import st from "../styles/All.module.scss"

export default function About() {
  function scrollToPortfolio() {}
  return (
    <div>
      <div className={st.partHead}>Немного о себе</div>
      <div className={st.aboutText}>
        Веб-программированием занимаюсь начиная с середины 2020 года(то есть
        опыт разработки около 3.5 лет). Коммерческий опыт написания сайтов
        получил на фриланс-биржах, суммарно на все заказы в таком формате
        потратил около 5 месяцев. Примеры этих сайтов вы сможете увидеть в
        разделе{" "}
        <span onClick={scrollToPortfolio} className={st.link}>
          «Портфолио»
        </span>
        . Есть опыт в олимпиадном программировании: стал победителем третьего
        этапа белорусской республиканской олимпиады по информатике(имеется
        достаточная алгоритмическая и математическая база). Был опыт разработки{" "}
        <a href="https://t.me/DictionaryEnglishWordsBot" className={st.link}>
          телеграм-бота
        </a>
        , а также множества других проектов, главные из которых смотрите{" "}
        <span onClick={scrollToPortfolio} className={st.link}>
          здесь
        </span>
        .
      </div>
    </div>
  )
}
