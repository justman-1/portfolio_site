import st from "../styles/All.module.scss"
import Image from "next/image"

export default function Contacts() {
  return (
    <>
      <h1 className={st.partHead}>Контакты</h1>
      <div className={st.contactsForm}>
        <div style={{ height: "0px" }}>
          <Image
            className={st.contImage}
            src="/cloud.png"
            width={900}
            height={700}
            alt=""
            priority
          />
        </div>
        <div className={st.contText}>
          Есть предложение?
          <br /> Пишите мне на почту:
        </div>
        <div className={st.contEmail}>
          <a href="mailto:malneu.dev@gmail.com" className={st.link}>
            malneu.dev@gmail.com
          </a>
        </div>
        <div className={st.contLinks}>
          <a href="https://github.com/justman-1" target="_blank">
            <Image
              className={st.contLinkImg}
              src="/github.png"
              width={100}
              height={100}
              alt=""
              priority
            />
          </a>
          {/* <a href="https://codeforces.com/profile/Pilat_st" target="_blank">
            <Image
              className={st.contLinkImg}
              src="/codeforces.png"
              width={900}
              height={700}
              alt=""
              priority
            />
          </a> */}
        </div>
      </div>
    </>
  )
}
