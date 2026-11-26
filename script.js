const copy = {
  ru: {
    select: "Выберите язык", navGame: "Игра", navPlatforms: "Площадки",
    platforms: "Площадки", platformsLead: "Игры VSG на ваших любимых площадках",
    gameLabel: "Недавняя игра", gameTitle: "Обби: Укради Яйца Пингвинов", gameTag: "Обби · Приключения · Коллекционирование",
    gameText: "Подкрадись к гнезду, забери яйцо пингвина и успей вернуться в безопасную зону, пока тебя не поймала охрана. Исследуй лес, пустыню, Северный полюс и Галактику в поисках редких яиц.",
    gameText2: "Выращивай пингвинов, собирай монеты и расширяй свой загон. Тренируй скорость на беговых дорожках, чтобы добираться до более сложных гнёзд и пополнять коллекцию.",
    playGamaAction: "Играть в PlayGama"
  },
  en: {
    select: "Choose language", navGame: "Game", navPlatforms: "Platforms",
    platforms: "Platforms", platformsLead: "Find VSG games on your favourite platforms",
    gameLabel: "Recent release", gameTitle: "Obby: Steal Penguin Eggs", gameTag: "Obby · Adventure · Collecting",
    gameText: "Sneak up to a nest, grab a penguin egg and reach the safe zone before the guard catches you. Search the forest, desert, North Pole and Galaxy for rare eggs.",
    gameText2: "Hatch penguins, collect coins and expand your pen. Train your speed on treadmills to reach tougher nests and grow your collection.",
    playGamaAction: "Play on PlayGama"
  }
};

const gate = document.querySelector("#language-gate");

function setLanguage(language, closeGate) {
  const words = copy[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = words[element.dataset.i18n];
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.classList.toggle("active", button.dataset.language === language);
  });
  localStorage.setItem("vsg-language", language);
  if (closeGate) gate.classList.add("is-hidden");
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language, true));
});

const storedLanguage = localStorage.getItem("vsg-language");
if (storedLanguage === "ru" || storedLanguage === "en") setLanguage(storedLanguage, true);
