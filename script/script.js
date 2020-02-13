const fonts = [
    {
        fontName: 'Roboto',
        author: 'Christian Robertson',
        exmapleValue: 'Roboto'
    },
    {
        fontName: 'Open Sans',
        author: 'Sans Tyler',
        exmapleValue: 'Open Sans'
    },
    {
        fontName: 'Roboto Condensed',
        author: 'Christian Robertson',
        exmapleValue: 'Roboto Condensed'
    }
];

renderFontElements(fonts);
fillFooter();
displayTick('32px');

document.getElementById('example-text').addEventListener('keyup', onExampleInputChanged);
document.getElementById('font-size-toggle').addEventListener('click', displayFontSizeSettings);
document.getElementById('grid-toggle').addEventListener('click', onOverlayToggle);
document.getElementById('theme-toggle').addEventListener('click', onThemeToggle);

function renderFontElements(array) {
    for (let i = 0; i < array.length; i++) {
        document.getElementsByTagName('main')[0].appendChild(
            createElement(array[i].fontName, array[i].author, array[i].exmapleValue)
        );
    }
}

function createElement(fontName, author, exmapleValue) {
    const outerContainer = document.createElement('div');
    const innerContainer = document.createElement('div');
    const header = document.createElement('header');
    const headerDiv = document.createElement('div');
    const fontNameContainer = document.createElement('p');
    const authorContainer = document.createElement('p');
    const addButtonImg = document.createElement('img');
    const section = document.createElement('section');

    outerContainer.className = 'outer-font-container outer-font-container-grid';
    innerContainer.className = 'inner-font-container';

    fontNameContainer.className = 'font-name';
    section.className = 'example-text';

    fontNameContainer.textContent = fontName;
    authorContainer.textContent = author;

    section.textContent = exmapleValue;

    addButtonImg.src = 'resources/svg/add.svg';

    headerDiv.appendChild(fontNameContainer);
    headerDiv.appendChild(authorContainer);

    header.appendChild(headerDiv);
    header.appendChild(addButtonImg);

    innerContainer.appendChild(header);
    innerContainer.appendChild(section);

    outerContainer.appendChild(innerContainer);

    return outerContainer;
};

function onOverlayToggle() {
    const fontElements = document.getElementsByClassName('outer-font-container');

    for (let i = 0; i < fontElements.length; i++) {
        if (fontElements[0].className === 'outer-font-container outer-font-container-grid') {
            for (let i = 0; i < fontElements.length; i++) {
                fontElements[i].className = 'outer-font-container outer-font-container-list';
            }
            //document.getElementById('grid-toggle-img').src = 'resources/svg/list_light.svg';
        } else {
            for (let i = 0; i < fontElements.length; i++) {
                fontElements[i].className = 'outer-font-container outer-font-container-grid';
            }
            //document.getElementById('grid-toggle-img').src = 'resources/svg/list_light.svg';
        }
    }
};

function onExampleInputChanged() {
    const numberOfExamples = document.getElementsByClassName('example-text').length;

    for (let i = 0; i < numberOfExamples; i++) {
        const value = document.getElementById('example-text').value;
        const fontName = document.getElementsByClassName('font-name')[i].textContent;

        document.getElementsByClassName('example-text')[i].textContent = value !== '' ? value : fontName;
    }
}

function onThemeToggle() {
    const body = document.getElementsByTagName('body')[0];
    const currentTheme = window.getComputedStyle(body).getPropertyValue('background-color');

    if (currentTheme === 'rgb(255, 255, 255)') {
        body.className = 'dark-theme';
        document.getElementById('font-size-toggle').style.color = '#fff';
        document.getElementById('search-font').style.color = '#fff';
        document.getElementById('search-font').style.backgroundColor = '#000';
        document.getElementById('example-text').style.color = '#fff';
        document.getElementById('example-text').style.backgroundColor = '#000';
        changeFontElementsColor('#fff');
        //document.getElementById('grid-toggle-img').src = 'resources/svg/list.svg';
        //document.getElementById('reset-img').src = 'resources/svg/reset.svg';
    } else {
        body.className = 'white-theme';
        document.getElementById('font-size-toggle').style.color = '#000';
        document.getElementById('search-font').style.color = '#000';
        document.getElementById('search-font').style.backgroundColor = '#fff';
        document.getElementById('example-text').style.color = '#000';
        document.getElementById('example-text').style.backgroundColor = '#fff';
        changeFontElementsColor('#000');
        //document.getElementById('grid-toggle-img').src = 'resources/svg/list.svg';
        //document.getElementById('reset-img').src = 'resources/svg/reset.svg';
    }

    document.getElementById('search-font').style
}

function changeIconsTheme(){
    let regForName = /\w+\.svg/;
    let regForTheme = /_white.svg/;
    let listToggleSrc = document.getElementById("grid-toggle").src;
    let returnIconSrc = document.getElementById("reset-input").src;
}

function changeFontElementsColor(color) {
    const fontNames = document.getElementsByClassName('font-name');
    const exampleTexts = document.getElementsByClassName('example-text');

    for (let i = 0; i < fontNames.length; i++) {
        fontNames[i].style.color = color;
        exampleTexts[i].style.color = color;
    }
};

function fillFooter() {
    document.getElementsByTagName('footer')[0].textContent = 'Created by GallantJohny | ' + new Date().getFullYear() + ' | Chingu Solo Project'
}

function displayFontSizeSettings() {
    document.getElementById('font-size-popup').style.display = 'block';
}

function displayTick(elementID) {
    document.getElementById(elementID).style.display = 'block';
    document.getElementById(elementID).src = 'resources/svg/tick.svg';
}