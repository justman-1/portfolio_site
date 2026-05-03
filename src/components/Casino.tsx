import st from "../styles/Main.module.scss";
import { memo, useEffect, useRef, useState } from "react";

const SKILLS = [
  "TYPESCRIPT",
  "NODE JS",
  "NEXT JS",
  "MYSQL",
  "MONGO DB",
  "REACT JS",
  "GIT",
  "DOCKER",
  "SCSS",
];
const LETTER_INTERVAL = 100;

function Casino({ siteLoaded }: { siteLoaded: boolean }) {
  const [letters, setLetters] = useState<[string, boolean][]>([]);
  const lettersRef = useRef<HTMLDivElement>(null);

  const timerId = useRef<NodeJS.Timeout | null>(null);
  const phase = useRef<"idle" | "random" | "result">("idle");
  const frameCount = useRef(0);

  // инициализация сетки букв
  useEffect(() => {
    if (lettersRef.current && letters.length === 0) {
      const wid = lettersRef.current.clientWidth;
      const count =
        window.innerWidth < 600 ? Math.floor(wid / 40) : Math.floor(wid / 50);
      const initial = Array.from(
        { length: count },
        () =>
          [String.fromCharCode(65 + Math.floor(Math.random() * 25)), false] as [
            string,
            boolean,
          ],
      );
      setLetters(initial);
    }
  }, []);

  const runCycle = () => {
    if (timerId.current) clearTimeout(timerId.current);

    phase.current = "random";
    frameCount.current = 0;

    const animate = () => {
      if (phase.current !== "random") return;

      if (frameCount.current < 30) {
        setLetters((prev) =>
          prev.map(() => [
            String.fromCharCode(65 + Math.floor(Math.random() * 25)),
            false,
          ]),
        );

        const delay = LETTER_INTERVAL - frameCount.current * 2;
        frameCount.current++;
        timerId.current = setTimeout(animate, Math.max(10, delay));
      } else {
        phase.current = "result";
        showSkill();
      }
    };

    animate();
  };

  const showSkill = () => {
    setLetters((prev) => {
      const availableSkills = SKILLS.filter((s) => s.length <= prev.length);
      const skill =
        availableSkills[Math.floor(Math.random() * availableSkills.length)];
      const pos = Math.floor(Math.random() * (prev.length - skill.length));

      const nextLetters = [...prev];

      for (let i = 0; i < nextLetters.length; i++)
        nextLetters[i] = [nextLetters[i][0], false];

      for (let i = 0; i < skill.length; i++) {
        if (skill[i] !== " ") {
          nextLetters[pos + i] = [skill[i], true];
        }
      }
      return nextLetters;
    });

    timerId.current = setTimeout(() => {
      if (siteLoaded) runCycle();
    }, 2500);
  };

  // запуск при загрузке
  useEffect(() => {
    if (siteLoaded) {
      runCycle();
      if (lettersRef.current) lettersRef.current.style.opacity = "1";
    }
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      phase.current = "idle";
    };
  }, [siteLoaded]);

  return (
    <div
      className={st.randLetters}
      ref={lettersRef}
      style={{ opacity: 0, transition: "opacity 0.5s linear" }}
    >
      {letters.map((e, key) => (
        <div
          className={st.letter}
          key={key}
          style={{
            width: `${100 / letters.length}%`,
            color: e[1] ? "#1A69F3" : "white",
            filter: phase.current === "random" ? "blur(2px)" : "blur(0px)",
            transition: "filter 0.3s, color 0.2s",
          }}
        >
          <span
            style={{
              transform: e[1] ? "scale(1.15)" : "scale(1)",
              display: "inline-block",
              transition: "transform 0.3s",
            }}
          >
            {e[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default memo(Casino);
