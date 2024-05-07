import st from "../styles/All.module.scss"
import { useAppDispatch } from "@/store/hook"
import { scroll } from "@/store/scrollSlice"

export default function ForYou() {
  const dispatch = useAppDispatch()
  return (
    <>
      <h1 className={st.partHead}>Чем могу Вам помочь?</h1>
      <div className={st.aboutText}>
        Так как я фуллстек-разработчик, то для Вас я могу сделать как сайт
        полностью, так и какую-то его часть. А именно:
        <div className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>
            Сайт полностью(backend + frontend + deploy):
          </strong>{" "}
          в данном случае я создам для вас как серверную, так и клиентскую части
          сайта, и загружу этот сайт в сеть. То есть на выходе вы получите
          готовый сайт на домене, который мы с вами согласуем. От Вас
          потребуется только ТЗ и дизайн сайта(или пример сайта, если Вам нужна
          копия).
        </div>
        <div className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Frontend-часть:</strong> создам
          клиентскую часть по предоставленному Вами дизайну.
        </div>
        <div className={st.textPoint}>
          <strong style={{ color: "#C8D9FF" }}>Backend-часть:</strong> создам
          серверную часть для вашего сайта.
        </div>{" "}
        <div style={{ marginTop: "30px" }}>
          Заранее обсудим все детали проекта, сроки, используемые технологии и
          стоимость, в зависимости от масштаба и сложности проекта. Я же в свою
          очередь гарантирую то, что буду прозрачен, буду оповещать вас о
          продвижении процесса разработки, показывать предварительный результат
          и на каком этапе разработки нахожусь в определенный момент. Если будут
          иметься вопросы по проекту до начала нашей работы или в процессе,
          смело задавайте – на всё отвечу.
          <div style={{ marginTop: "10px" }}>
            Для связи со мной переходите в раздел{" "}
            <span
              className={st.linkDown}
              onClick={() => {
                dispatch(scroll({ val: true, part: "contacts" }))
              }}
            >
              Контакты
            </span>
            .
          </div>
        </div>
      </div>
    </>
  )
}
