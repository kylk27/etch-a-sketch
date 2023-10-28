const body = document.querySelector('body');
const mainContainer = document.querySelector('.main-container');
const gridSize = document.querySelector('.grid-size');
const slider = document.querySelector('.slider');
let sliderVal = slider.value;
gridSize.textContent = `${sliderVal} x ${sliderVal}`;
const grid = document.createElement('div');
grid.setAttribute('class', 'grid');
const palette = document.querySelector('.palette');
const colorBtn = document.querySelector('.pen');
const rainbowBtn = document.querySelector('.rainbow');
const gridBtn = document.querySelector('.grid-lines');
const eraseBtn = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
let activeBtn = '';
const gridClass = grid.classList;
let isTrue = true;

body.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

const toolBox = document.querySelector('.toolbox');
toolBox.addEventListener('click', (e) => {
    const btnClass = e.target.classList; 
    if (btnClass.contains('pen')) {
        colorPen();
    } else if (btnClass.contains('rainbow')) {
        rainbowPen();
    } else if (btnClass.contains('grid-lines')) {
        toggleGrid();
    } else if (btnClass.contains('eraser')) {
        erase();
    } else if (btnClass.contains('clear')) {
        clearScreen();
    };
});

slider.addEventListener('input', () => {
    sliderVal = slider.value;
    gridSize.textContent = `${sliderVal} x ${sliderVal}`;
});

slider.addEventListener('change', () => {
    let columns = document.querySelectorAll('.column');
    for (let column of columns) {
        grid.removeChild(column);
    };

    makeGrid();

    if (activeBtn === 'color') {
        colorPen();
    } else if (activeBtn === 'rainbow') {
        rainbowPen();
    } else if (activeBtn === 'eraser') {
        erase();
    };

    if(gridClass.contains('active')) {
       showGrid();
    };
});

makeGrid();
colorPen();

/////////////////////-----FUNCTIONS-----/////////////////////
function makeGrid() {   
    for (let i = 0; i < sliderVal; i++) {
        let column = document.createElement('div');
        column.setAttribute('class', 'column');
        for (let a = 0; a < sliderVal; a++) {
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            column.appendChild(row);
        };
        grid.appendChild(column);
    };
    mainContainer.appendChild(grid);
};

function colorPen() {
    activeBtn = 'color';
    rainbowBtn.classList.remove('active');
    eraseBtn.classList.remove('active');
    colorBtn.classList.add('active');

    grid.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = palette.value;
    });

    body.addEventListener('mousedown', () => {
        isTrue = true;
        grid.addEventListener('mouseover', (e) => {
            if(isTrue) {
                e.target.style.backgroundColor = palette.value;
            };
        });
    });

    body.addEventListener('mouseup', () => {
        isTrue = false;
    });
};

function randomValue() {
    const value = Math.floor(Math.random() * 256);
    return value;
};


function rainbowPen() {
    activeBtn = 'rainbow';
    colorBtn.classList.remove('active');
    eraseBtn.classList.remove('active');
    rainbowBtn.classList.add('active');
    
    grid.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
    });

    body.addEventListener('mousedown', () => {
        isTrue = true;
        grid.addEventListener('mouseover', (e) => {
            if(isTrue) {
                e.target.style.backgroundColor = `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
            };
        });
    });

    body.addEventListener('mouseup', () => {
        isTrue = false;
    });
};

function toggleGrid() {
    const rows = document.querySelectorAll('.row');
    gridBtn.classList.toggle('active');
    grid.classList.toggle('active');
    for (let row of rows) {
        row.classList.toggle('active');
    };
};

function showGrid() {
    const rows = document.querySelectorAll('.row');
    gridBtn.classList.add('active');
    grid.classList.add('active');
    for (let row of rows) {
        row.classList.add('active');
    };
};


function erase() { 
    activeBtn = 'eraser'
    rainbowBtn.classList.remove('active');
    colorBtn.classList.remove('active');
    eraseBtn.classList.add('active');

    grid.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = 'white';
    });

    body.addEventListener('mousedown', () => {
        isTrue = true;
        grid.addEventListener('mouseover', (e) => {
            if(isTrue) {
                e.target.style.backgroundColor = 'white';
            };
        });
    });

    body.addEventListener('mouseup', () => {
        isTrue = false;
    });  
};

function clearScreen() {
    const rows = document.querySelectorAll('.row');
    for(let row of rows) {
        row.style.backgroundColor = 'white';
    };
};
/////////////////////--------------------------/////////////////////