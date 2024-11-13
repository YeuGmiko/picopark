import SwapperController from './util/SwapperController.js';
import PicoCat from "./util/PicoCat.js";
const swapperContainers = document.querySelectorAll('.about .swapper .container');
const upSwapper = new SwapperController(swapperContainers[0], swapperContainers[0].querySelector('.s_list'), 800, 'right');
const downSwapper = new SwapperController(swapperContainers[1], swapperContainers[1].querySelector('.s_list'), 800, 'left');
upSwapper.start().main.addEventListener('mouseenter', e => {
    const target = e.target;
    if (target.tagName === 'IMG')
        upSwapper.stop();
}, true);
upSwapper.main.addEventListener('mouseout', e => {
    const target = e.target;
    if (target.tagName === 'IMG')
        upSwapper.start();
}, true);
downSwapper.start().main.addEventListener('mouseenter', e => {
    const target = e.target;
    if (target.tagName === 'IMG')
        downSwapper.stop();
}, true);
downSwapper.main.addEventListener('mouseout', e => {
    const target = e.target;
    if (target.tagName === 'IMG')
        downSwapper.start();
}, true);
const about_left_cats = document.querySelectorAll('.about .cats .left .cat');
const about_right_cats = document.querySelectorAll('.about .cats .right .cat');
const about_cat_auto_jump = (cats) => {
    const picos = [];
    cats.forEach(cat => {
        const picoCat = new PicoCat(cat, cat.querySelector('.body'), 0.5, 'right');
        picoCat.onJump(() => {
            cat.classList.toggle('jump', true);
        });
        picoCat.onJumpEnd(() => {
            cat.classList.toggle('jump', false);
        });
        picos.push(picoCat);
    });
    const getRandomNumber = (min, max) => {
        min = Math.floor(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let timer;
    const autoJump = () => {
        timer = setTimeout(() => {
            picos[getRandomNumber(0, 3)].jump(600);
            clearTimeout(timer);
            autoJump();
        }, getRandomNumber(500, 3000));
    };
    autoJump();
};
about_cat_auto_jump(about_left_cats);
about_cat_auto_jump(about_right_cats);
const chooseFloat = document.querySelector('.level_section .levels .float');
document.querySelectorAll('.level_section .levels .choose').forEach(item => {
    const choose = item;
    choose.addEventListener('click', () => {
        document.querySelector('.level_section .levels .active').classList.toggle('active', false);
        choose.classList.add('active');
        chooseFloat.style.left = choose.offsetLeft + 'px';
    });
});
const modes = document.querySelector('.mode .sections');
const mode_sections = document.querySelector('.mode .display');
modes.addEventListener('click', e => {
    const target = e.target;
    if (!target.classList.contains('mode_section'))
        return;
    const activeId = parseInt(target.dataset.activeId);
    modes.querySelector('.active').classList.remove('active');
    target.classList.toggle('active', true);
    mode_sections.querySelector('.display_content.active').classList.remove('active');
    mode_sections.children[activeId].classList.toggle('active', true);
});
mode_sections.querySelectorAll('.display_content').forEach(item => {
    const show = item.querySelector('.desc img');
    item.addEventListener('click', e => {
        const target = e.target;
        if (!target.classList.contains('item'))
            return;
        item.querySelector('.active').classList.remove('active');
        target.classList.toggle('active', true);
        show.src = target.src;
    });
});
const area = document.querySelector('.misc .game .area');
const player = area.querySelector('.cat');
const player_body = player.querySelector('.body');
const playerCat = new PicoCat(player, player.querySelector('.body'), 0.5, 'right');
playerCat.onDirectionChanged((prev, cur) => {
    player.classList.toggle(prev, false);
    player.classList.toggle(cur, true);
});
playerCat.onJump(() => {
    player.classList.toggle('jump', true);
});
playerCat.onJumpEnd(() => {
    player.classList.toggle('jump', false);
});
playerCat.onMove(dir => {
    player.classList.toggle('run', true);
    const transform = window.getComputedStyle(player_body).transform;
});
playerCat.onMovePaused(() => {
    player.classList.toggle('run', false);
});
playerCat.onStep(cat => {
    if (cat.positionX < 0) {
        playerCat.movePaused();
        playerCat.changePositionX(area.offsetWidth - player.offsetWidth);
    }
    else if (cat.positionX > area.offsetWidth - player.offsetWidth) {
        playerCat.movePaused();
        playerCat.changePositionX(0);
    }
});
playerCat.init();
const controller = document.querySelector('.misc .controller');
controller.querySelector('span.a').addEventListener('mousedown', playerCat.move.bind(playerCat, 'left'));
controller.querySelector('span.a').addEventListener('touchstart', playerCat.move.bind(playerCat, 'left'));
controller.querySelector('span.a').addEventListener('mouseup', playerCat.movePaused.bind(playerCat));
controller.querySelector('span.a').addEventListener('touchend', e => {
    playerCat.movePaused();
    e.preventDefault();
});
controller.querySelector('span.d').addEventListener('mousedown', playerCat.move.bind(playerCat, 'right'));
controller.querySelector('span.d').addEventListener('touchstart', playerCat.move.bind(playerCat, 'right'));
controller.querySelector('span.d').addEventListener('mouseup', playerCat.movePaused.bind(playerCat));
controller.querySelector('span.d').addEventListener('touchend', e => {
    playerCat.movePaused();
    e.preventDefault();
});
controller.querySelector('.jump .j').addEventListener('mousedown', playerCat.jump.bind(playerCat, 600));
controller.querySelector('.jump .j').addEventListener('touchstart', playerCat.jump.bind(playerCat, 600));
controller.querySelector('span.w').addEventListener('mousedown', playerCat.jump.bind(playerCat, 600));
controller.querySelector('span.w').addEventListener('touchstart', playerCat.jump.bind(playerCat, 600));
const autoPlay = () => {
    const video = document.querySelector('.hero_video video');
    video.play();
    window.removeEventListener('click', autoPlay);
};
window.addEventListener('click', autoPlay);
