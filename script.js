const copy = {
  ru: {
    select: "Выберите язык", navGame: "Игра", navPlatforms: "Площадки",
    platforms: "Площадки", platformsLead: "Игры VSG на ваших любимых площадках",
    gameLabel: "Недавняя игра", gameTitle: "Покинь Закулисье: Уровень 0", gameTag: "Хоррор · Выживание · Головоломки",
    gameText: "Ты оказался в Закулисье - бесконечном лабиринте жёлтых комнат, из которого не так просто выбраться. Здесь нет людей, а за каждым поворотом может скрываться опасный монстр.",
    gameText2: "Найди ключ-карту, восстанови электропитание и открой выход. Исследуй комнаты, собирай предметы, открывай двери и решай головоломки. Прячься, слушай и не попадайся сущности на глаза: у тебя всего 5 жизней.",
    googlePlayAction: "Играть в Google Play", playGamaAction: "Играть в PlayGama", ruStoreAction: "Играть в RuStore"
  },
  en: {
    select: "Choose language", navGame: "Game", navPlatforms: "Platforms",
    platforms: "Platforms", platformsLead: "Find VSG games on your favourite platforms",
    gameLabel: "Recent release", gameTitle: "Backrooms: Exit Protocol 0", gameTag: "Horror · Survival · Puzzles",
    gameText: "You are trapped in the Backrooms, an endless maze of yellow rooms that is not easy to escape. There are no people here, and a dangerous monster may be waiting around every corner.",
    gameText2: "Find the keycard, restore the power and unlock the exit. Explore abandoned rooms, collect useful items, open locked doors and solve puzzles. Hide, listen closely and stay out of the entity's sight: you have only 5 lives.",
    googlePlayAction: "Play on Google Play", playGamaAction: "Play on PlayGama", ruStoreAction: "Play on RuStore"
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
