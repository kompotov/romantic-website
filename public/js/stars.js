export function startStarStory() {

    const timeline = [
        {
            start: 120,
            end: 620,
            text: "Іноді достатньо однієї людини, щоб увесь світ став теплішим"
        },
        {
            start: 620,
            end: 1000,
            text: "Серед мільйонів випадковостей завжди особливо цінно знайти саме свою людину",
        },
        {
            start: 1000,
            end: 1500,
            text: "Ту, поруч з якою хочеться усміхатися, обіймати міцніше і берегти кожну мить"
        },
        {
            start: 1500,
            end: 2000,
            text: "Ту, з якою навіть звичайний день перетворюється на маленьке свято"
        },
        {
            start: 2000,
            end: 2500,
            text: "І якщо це запрошення зараз у твоїх руках, значить попереду щось дуже хороше",
        },
        {
            start: 2500,
            end: 2750,
            text: "Попереду побачення"
        },
        {
            start: 2750,
            end: 3000,
            text: "І багато теплих спогадів"
        },
        {
            start: 3000,
            permanent: true,
            text: "Ти дуже особлива людина. Хочу дарувати тобі тепло, турботу і ще більше щасливих моментів ❤️"
        }
    ];

    var canvas = document.getElementById("starfield");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var context = canvas.getContext("2d");
    var stars = 500;
    var colorrange = [0, 60, 240];
    var starArray = [];

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Initialize stars with random opacity values
    for (var i = 0; i < stars; i++) {
        var x = Math.random() * canvas.offsetWidth;
        var y = Math.random() * canvas.offsetHeight;
        var radius = Math.random() * 1.2;
        var hue = colorrange[getRandom(0, colorrange.length - 1)];
        var sat = getRandom(50, 100);
        var opacity = Math.random();
        starArray.push({x, y, radius, hue, sat, opacity});
    }

    var frameNumber = 0;

    var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

    function drawStars() {
        for (var i = 0; i < stars; i++) {
            var star = starArray[i];

            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, 360);
            context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
            context.fill();
        }
    }

    function updateStars() {
        for (var i = 0; i < stars; i++) {
            if (Math.random() > 0.99) {
                starArray[i].opacity = Math.random();
            }
        }
    }

    function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
        lines.forEach((line, index) => {
            context.fillText(line, x, y + index * (fontSize + lineHeight));
        });
    }

    function drawText() {
        const fontSize = Math.min(30, window.innerWidth / 24);
        const lineHeight = 8;

        context.font = fontSize + "px Comic Sans MS";
        context.textAlign = "center";

        context.shadowColor = "rgba(45, 45, 255, 1)";
        context.shadowBlur = 8;

        timeline.forEach(scene => {
            // 🟢 PERMANENT SCENE
            if (scene.permanent && frameNumber >= scene.start) {
                const fadeDuration = 120; // ~2 seconds at 60fps
                const progress = Math.min((frameNumber - scene.start) / fadeDuration, 1);

                context.fillStyle = `rgba(45,45,255,${progress})`;
                context.fillText(scene.text, canvas.width / 2, canvas.height / 2);

                return;
            }

            // 🟡 NORMAL SCENE
            if (frameNumber >= scene.start && frameNumber < scene.end) {

                const duration = scene.end - scene.start;
                const progress = (frameNumber - scene.start) / duration;

                let opacity;

                if (progress < 0.5) {
                    opacity = progress * 2;
                } else {
                    opacity = (1 - progress) * 2;
                }

                context.fillStyle = `rgba(45,45,255,${opacity})`;
                context.fillText(scene.text, canvas.width / 2, canvas.height / 2);
            }
        });

        context.shadowBlur = 0;
    }

    function draw() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawStars();
        updateStars();
        drawText();

        frameNumber++;

        requestAnimationFrame(draw);
    }


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
    });

    window.requestAnimationFrame(draw);
}
