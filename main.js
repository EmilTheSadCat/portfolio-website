const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const projectsWrapper = document.querySelector('.projects-wrapper');

//-----------  TOUCH CONTROL  ------------//

projectsWrapper.addEventListener('touchstart', startTouch, false);
projectsWrapper.addEventListener('touchmove', moveTouch, false);

let initialX = null;
let initialY = null;

function startTouch(event) {
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
}

function moveTouch(event) {
    if (initialX === null || initialY === null) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const differenceX = initialX - currentX;
    const differenceY = initialY - currentY;

    if (Math.abs(differenceX) > Math.abs(differenceY)) {
        if (differenceX > 0) {
            setIndex('next');
            event.preventDefault();
        } else {
            setIndex('prev');
            event.preventDefault();
        }
    }

    initialX = null;
    initialY = null;
}

//-----------  KEYS CONTROL  ------------//

window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            e.preventDefault();
            setIndex('prev');
            break;
        case 39:
            e.preventDefault();
            setIndex('next');
            break;
    }
});

//-----------  CAROUSEL CONTROLS  ------------//

let projectIndex = 1;
function setIndex(action) {
    const previousProjectIndex = projectIndex;
    if (action === 'prev') {
        if (projectIndex - 1 < 1) {
            projectIndex = 10;
        } else {
            projectIndex--;
        }
    } else if (action === 'next') {
        if (projectIndex + 1 > 10) {
            projectIndex = 1;
        } else {
            projectIndex++;
        }
    }
    handleActive.remove(previousProjectIndex);
    handleActive.set(projectIndex);
}
const handleActive = {
    set(index) {
        document.getElementById(`project${index}`).classList.add('active');
    },
    remove(index) {
        document.getElementById(`project${index}`).classList.remove('active');
    },
};

btnPrev.addEventListener('click', () => setIndex('prev'));
btnNext.addEventListener('click', () => setIndex('next'));
