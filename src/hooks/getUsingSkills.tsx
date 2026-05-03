let skills: string[] = [
  "TYPESCRIPT",
  "NODE JS",
  "NEXT JS",
  "MYSQL",
  "MONGO DB",
  "MATERIAL UI",
  "REACT JS",
  "REDUX TOOLKIT",
  "GIT",
  "EXPRESS JS",
  "DOCKER",
  "SCSS",
  "REDIS",
  "CHAKRA UI",
  "ZUSTAND",
  "TAILWIND",
];

export default function getUsingSkills(containerWidth: number): string[] {
  let quantity: number =
    window.innerWidth < 600
      ? Math.floor(containerWidth / 40)
      : Math.floor(containerWidth / 50);

  return skills.filter((skill) => skill.length <= quantity);
}
