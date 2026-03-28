document.addEventListener("DOMContentLoaded", function () {
    console.log('funciona');
    
    const stage = document.getElementById('stage');
    const openBtn = document.getElementById('open-btn');
    const replayBtn = document.getElementById('replay-btn');
    const bgm = document.getElementById('bgm');
    const card = document.getElementById('profile-card');
    const spotlight = document.getElementById('spotlight');
    const creditsEl = document.getElementById('credits');

    const CREDITS_DELAY = 2.5;   
    const CREDITS_DURATION = 80;  
    const CREDITS_TOTAL_MS = (CREDITS_DELAY + CREDITS_DURATION) * 700;

    let showTimers = [];

    function clearTimers() {
        showTimers.forEach(t => clearTimeout(t));
        showTimers = [];
    }

    function addTimer(fn, ms) {
        showTimers.push(setTimeout(fn, ms));
    }


    function spawnDust() {
        document.querySelectorAll('.dust').forEach(d => d.remove());
        for (let i = 0; i < 28; i++) {
            const d = document.createElement('div');
            d.className = 'dust';
            const size = Math.random() * 3 + 1;
            d.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom:0;
        --dx:${(Math.random() - 0.5) * 120}px;
        animation-duration:${4 + Math.random() * 6}s;
        animation-delay:${Math.random() * 4}s;
      `;
            stage.appendChild(d);
        }
    }


    function resetCredits() {
        creditsEl.style.animation = 'none';
        creditsEl.offsetHeight;
        creditsEl.style.animation = '';
    }


    function runShow(startMusic) {
        clearTimers();
        replayBtn.classList.remove('visible');


        stage.classList.remove('closing');
        stage.classList.add('open');


        card.classList.remove('card-center');
        spotlight.classList.remove('card-spotlight');

        resetCredits();


        if (startMusic) {
            bgm.volume = 0;
            bgm.play().then(() => {
                let vol = 0;
                const fadeIn = setInterval(() => {
                    vol = Math.min(vol + 0.02, 0.75);
                    bgm.volume = vol;
                    if (vol >= 0.75) clearInterval(fadeIn);
                }, 100);
            }).catch(() => { });
        }


        addTimer(spawnDust, 2000);


        addTimer(() => {
            stage.classList.add('closing');
        }, CREDITS_TOTAL_MS);


        addTimer(() => {
            spotlight.classList.add('card-spotlight');
            card.classList.add('card-center');
        }, CREDITS_TOTAL_MS + 1100);


        addTimer(() => {
            replayBtn.classList.add('visible');
        }, CREDITS_TOTAL_MS + 1100 + 3600);
    }

    openBtn.addEventListener('click', () => {
        openBtn.classList.add('hidden');
        runShow(true);
    });


    replayBtn.addEventListener('click', () => {
        runShow(false);
    });

});
