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


body.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

colorBtn.addEventListener('click', colorPen);

rainbowBtn.addEventListener('click', rainbowPen);

gridBtn.addEventListener('click', toggleGrid);

eraseBtn.addEventListener('click', erase);

clearBtn.addEventListener('click', clearScreen);

//-----FUNCTIONS-----

function makeGrid() {     // -----Create grid of squares-----
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

function colorPen() {  //-----Change tile color to palette value-----
    activeBtn = 'color';
    rainbowBtn.classList.remove('active');
    eraseBtn.classList.remove('active');
    colorBtn.classList.add('active');
    const rows = document.querySelectorAll('.row');
    for (let row of rows) {
        function fillDiv() {
            row.style.backgroundColor = palette.value;
        };
        
        row.addEventListener('mousedown', fillDiv);

        body.addEventListener('mousedown', () => {
            row.addEventListener('mouseover', fillDiv);
        });

        body.addEventListener('mouseup', () => {
            row.removeEventListener('mouseover', fillDiv);
        });

    };
    
    

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
    const rows = document.querySelectorAll('.row');
    for (let row of rows) {
        function fillDiv() {
            const red = randomValue();
            const blue = randomValue();
            const green = randomValue();
            row.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
        };

        row.addEventListener('mousedown', fillDiv);

        body.addEventListener('mousedown', () => {
            row.addEventListener('mouseover', fillDiv);
        });

        body.addEventListener('mouseup', () => {
            row.removeEventListener('mouseover', fillDiv);
        });

    };
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


function erase() { //-----Erase tiles-----
    activeBtn = 'eraser'
    rainbowBtn.classList.remove('active');
    colorBtn.classList.remove('active');
    eraseBtn.classList.add('active');
    const rows = document.querySelectorAll('.row');
    for (let row of rows) {
        function fillDiv() {
            row.style.backgroundColor = 'white';
        };

        row.addEventListener('mousedown', fillDiv);

        body.addEventListener('mousedown', () => {
            row.addEventListener('mouseover', fillDiv);
        });

        body.addEventListener('mouseup', () => {
            row.removeEventListener('mouseover', fillDiv);
        });

    };
};

function clearScreen() {
    const rows = document.querySelectorAll('.row');
    for(let row of rows) {
        row.style.backgroundColor = 'white';
    };
};


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





/*  mainContainer.removeChild(grid);   //-----create new grid to replace OG grid-----
    let newgrid = document.createElement('div');
    newgrid.setAttribute('class', 'grid');
    grid = newgrid; */