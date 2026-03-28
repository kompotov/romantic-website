import { startStarStory } from './stars.js';

const answersNo = [
    { text: "Ні", gif: "public/images/pepe-shy.gif" },
    { text: "Ой, напевно промахнулася", gif: "public/images/pepe-flirty.gif", noHover: true },
    { text: "Ти впевнена?", gif: "public/images/pepe-anxious.gif", noHover: true },
    { text: "Ахаха, ти така смішна у мене", gif: "public/images/pepe-laugh.gif" },
    { text: "Точно точно??", gif: "public/images/pepe-anxious.gif", noHover: true },
    { text: "Твоя наполегливість вражає", gif: "public/images/pepe-concerned.gif" },
    { text: "Кутики моїх губ падають, з кожним кліком на цю кнопку", gif: "public/images/pepe-rain.gif" },
    { text: "А за 10 гривень?", gif: "public/images/pepe-pray.gif" },
    { text: "Може 20?", gif: "public/images/pepe-pray.gif" },
    { text: "А всьо, думала буде 30? не буде", gif: "public/images/pepe-glasses.gif" },
    { text: "Може 30?", gif: "public/images/pepe-copium.gif" },
    { text: "Я записав, в цей раз олівцем", gif: "public/images/pepe-pen.gif" },
    { text: "А так???", gif: "public/images/pepe-fight.gif", noHover: true},
    { text: "Хочу цьомнути тебе стільки раз, скільки ти нажала цю кнопку!", gif: "public/images/pepe-love-hit.gif" },
    { text: "Ну все, ти догралася", gif: "public/images/pepe-gun.gif" }
];

const runAwaySteps = [
    { text: "Тепер спробуй мене зловити!", gif: "public/images/pepe-gun.gif" },
    { text: "Не зловиш 😝", gif: "public/images/pepe-gun.gif" },
    { text: "Якась у тебе повільна мишка", gif: "public/images/pepe-gun.gif" },
    { text: "Ого, притормози", gif: "public/images/pepe-gun.gif" },
    { text: "Може не треба??", gif: "public/images/pepe-cute-eyes.gif" },
    { text: "Я не здамся без бою", gif: "public/images/pepe-gun.gif" },
    { text: "Ти знаєш, що треба нажати", gif: "public/images/pepe-gun.gif" },
    { text: "Більше не буде приколів", gif: "public/images/pepe-gun.gif" },
    { text: "Можеш вже клацати", gif: "public/images/pepe-gun.gif" },
    { text: "Ну добре, анекдот", gif: "public/images/pepe-gun.gif" },
    { text: "Сюди не влізе анекдот, це ж кнопка", gif: "public/images/pepe-gun.gif" },
    { text: "Клацай на зелену кнопку", gif: "public/images/pepe-gun.gif" },
    { text: "Тату, що це за ягода? Чорниця. А чому вона червона? Бо ще зелена", gif: "public/images/pepe-laugh.gif" },
    { text: "Я більше не знаю, клацай давай", gif: "public/images/pepe-gun.gif" },
    { text: "Тепер супер серйозно", gif: "public/images/pepe-gun.gif" },
    { text: "Кіна не буде", gif: "public/images/pepe-gun.gif" },
    { text: "Ну, хіба що, на нашому побаченні", gif: "public/images/pepe-gun.gif" },
    { text: "Тому клацай!", gif: "public/images/pepe-gun.gif" },
    { text: "Клікай, нажимай, тисни", gif: "public/images/pepe-gun.gif" },
    { text: "Click, press, klick, drücken", gif: "public/images/pepe-gun.gif" },
    { text: "Тепер точно все", gif: "public/images/pepe-gun.gif" },
];

const mainUI = document.getElementById('main-ui');
const starfield = document.getElementById('starfield');
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');
const banner = document.getElementById('banner');
const intro = document.getElementById("intro-screen");

const decisionMusic = document.getElementById('decision-music');
const starsMusic = document.getElementById('stars-music');

let index = 0;
let size = 50;
let fontSize = 16;
let runAwayMode = false;
let runIndex = 0;

// autoplay decision music after first interaction
intro.addEventListener("click", () => {
    decisionMusic.play();

    // fade out intro
    intro.classList.add("fade-out");

}, { once: true });

// hover in
noButton.addEventListener('mouseover', () => {
    if (!runAwayMode) {
        const current = answersNo[index];
        if (current.noHover) return;
        setBanner("public/images/pepe-scared.gif");
        return;
    }

    // RUN AWAY MODE
    moveButtonRandom();

    if (runIndex < runAwaySteps.length - 1) {
        runIndex++;
    }

    const current = runAwaySteps[runIndex];
    noButton.innerHTML = current.text;
    setBanner(current.gif);
});

yesButton.addEventListener('mouseover', () => {
    setBanner("public/images/pepe-excited.gif");
});

// hover out
noButton.addEventListener('mouseleave', () => {
    const current = answersNo[index];

    if (current.noHover) return; // 🚫 stop hover if disabled

    setBanner(current.gif);
});

yesButton.addEventListener('mouseleave', () => {
    const current = answersNo[index];
    setBanner(current.gif);
});

// click
noButton.addEventListener('click', () => {
    // Increase YES button size randomly
    const sizes = [40, 50, 30, 35, 45];
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random];
    fontSize += 3;

    yesButton.style.height = `${size}px`;
    yesButton.style.width = `${size}px`;
    yesButton.style.fontSize = `${fontSize}px`;

    // Move to next phrase
    if (index < answersNo.length - 1) {
        index++;
        noButton.innerHTML = answersNo[index].text;
        const current = answersNo[index];

        // Change banner to phrase-specific gif
        setBanner(current.gif);
    } else {
        // Activate runaway mode
        runAwayMode = true;
        runIndex = 0;

        yesButton.style.height = "200px";
        yesButton.style.width = "200px";
        yesButton.style.fontSize = "16px";
        size = 200;
        fontSize = 16;

        // Move button to body so it is no longer constrained
        document.body.appendChild(noButton);

        noButton.style.position = "fixed";
        noButton.style.zIndex = "999";
        noButton.style.left = "50%";
        noButton.style.top = "60%";

        noButton.innerHTML = runAwaySteps[0].text;
        setBanner(runAwaySteps[0].gif);

        moveButtonRandom();
    }
});

yesButton.addEventListener('click', () => {
    if (runAwayMode && document.body.contains(noButton)) {
        noButton.remove();
    }

    // fade out UI
    mainUI.classList.add("fade-out");

    startStarStory();

    // fade in stars
    setTimeout(() => {
        starfield.classList.add("visible");
    }, 1000);

    // switch music smoothly
    fadeAudio(decisionMusic, starsMusic);
});

function setBanner(src) {
    banner.src = "";
    banner.src = src;
}

function moveButtonRandom() {
    const padding = 20;

    const maxX = window.innerWidth - noButton.offsetWidth - padding;
    const maxY = window.innerHeight - noButton.offsetHeight - padding;

    const randomX = padding + Math.random() * maxX;
    const randomY = padding + Math.random() * maxY;

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
}

function fadeAudio(outgoing, incoming) {

    incoming.volume = 0;
    incoming.play();

    const fadeInterval = setInterval(() => {

        if (outgoing.volume > 0.05) {
            outgoing.volume -= 0.05;
        }

        if (incoming.volume < 0.95) {
            incoming.volume += 0.05;
        }

        if (outgoing.volume <= 0.05) {
            outgoing.pause();
            clearInterval(fadeInterval);
        }

    }, 100);
}

function preloadGifs() {

    const allGifs = answersNo.map(a => a.gif);

    allGifs.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

preloadGifs();
