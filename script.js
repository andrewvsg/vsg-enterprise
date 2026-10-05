const copy = {
  ru: {
    select: "Выберите язык", selectHint: "Портфолио игровой студии", navGame: "Игра", navPlatforms: "Площадки",
    studio: "Независимая игровая студия", heroTitle: "Игры с напряжением в каждом коридоре.",
    heroText: "VSG Enterprise создаёт атмосферные игровые миры, в которых хочется задержаться чуть дольше.",
    explore: "Смотреть игру", platforms: "Площадки", platformsLead: "Наши игры доступны там, где вы привыкли играть.",
    gameLabel: "Недавняя игра", gameTitle: "Покинь Закулисье: Уровень 0", gameTag: "Хоррор · Выживание · Головоломки",
    gameText: "Ты оказался в Закулисье - бесконечном лабиринте жёлтых комнат, из которого не так просто выбраться. Здесь нет людей, а за каждым поворотом может скрываться опасный монстр.",
    gameText2: "Найди ключ-карту, восстанови электропитание и открой выход. Исследуй комнаты, собирай предметы, открывай двери и решай головоломки. Прячься, слушай и не попадайся сущности на глаза: у тебя всего 5 жизней.",
    googlePlayAction: "Играть в Google Play", playGamaAction: "Играть в PlayGama", footer: "VSG Enterprise. Игры с характером."
  },
  en: {
    select: "Choose language", selectHint: "Game studio portfolio", navGame: "Game", navPlatforms: "Platforms",
    studio: "Independent game studio", heroTitle: "Games with tension around every corner.",
    heroText: "VSG Enterprise builds atmospheric game worlds that make you want to stay a little longer.",
    explore: "Explore the game", platforms: "Platforms", platformsLead: "Our games are available where you already play.",
    gameLabel: "Recent release", gameTitle: "Backrooms: Exit Protocol 0", gameTag: "Horror · Survival · Puzzles",
    gameText: "You are trapped in the Backrooms, an endless maze of yellow rooms that is not easy to escape. There are no people here, and a dangerous monster may be waiting around every corner.",
    gameText2: "Find the keycard, restore the power and unlock the exit. Explore abandoned rooms, collect useful items, open locked doors and solve puzzles. Hide, listen closely and stay out of the entity's sight: you have only 5 lives.",
    googlePlayAction: "Play on Google Play", playGamaAction: "Play on PlayGama", footer: "VSG Enterprise. Games with character."
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
