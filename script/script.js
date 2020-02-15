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

document.getElementById('example-text').addEventListener('keyup', onExampleInputChanged);
document.getElementById('font-size-toggle').addEventListener('click', displayFontSizeSettings, { once: true });
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

    changeIconOnOverlayToggle();

    for (let i = 0; i < fontElements.length; i++) {
        if (fontElements[0].className === 'outer-font-container outer-font-container-grid') {
            for (let i = 0; i < fontElements.length; i++) {
                fontElements[i].className = 'outer-font-container outer-font-container-list';
            }

        } else {
            for (let i = 0; i < fontElements.length; i++) {
                fontElements[i].className = 'outer-font-container outer-font-container-grid';
            }

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
    } else {
        body.className = 'white-theme';
        document.getElementById('font-size-toggle').style.color = '#000';
        document.getElementById('search-font').style.color = '#000';
        document.getElementById('search-font').style.backgroundColor = '#fff';
        document.getElementById('example-text').style.color = '#000';
        document.getElementById('example-text').style.backgroundColor = '#fff';
        changeFontElementsColor('#000');
    }
    changeIconsTheme();

    document.getElementById('search-font').style
}

function changeIconsTheme() {
    let regForName = /list.*\.svg/;
    let regForTheme = /_white.svg/;
    let gridToggleSrc = document.getElementById("grid-toggle-img").src;
    let returnIconSrc = document.getElementById("reset-input-img").src;
    let gridToggleIcon = "";

    if (regForName.test(gridToggleSrc)) {
        gridToggleIcon = "list";
    } else {
        gridToggleIcon = "squares";
    }

    if (regForTheme.test(returnIconSrc)) {
        document.getElementById("grid-toggle-img").src = "resources/svg/" + gridToggleIcon + ".svg";
        document.getElementById("reset-input-img").src = "resources/svg/reset.svg";
    } else {
        document.getElementById("grid-toggle-img").src = "resources/svg/" + gridToggleIcon + "_white.svg";
        document.getElementById("reset-input-img").src = "resources/svg/reset_white.svg";
    }
}

function determineOverlayIcon() {
    let iconName = "";
    let regForIcon = /\w+\.svg/;
    let imgSrc = document.getElementById("grid-toggle-img").src;

    iconName = imgSrc.match(regForIcon);

    return iconName[0];
}

function changeIconOnOverlayToggle() {
    let iconName = determineOverlayIcon();
    let regForTheme = /_white.svg/;
    let isWhiteTheme = regForTheme.test(iconName);
    let whiteString = isWhiteTheme ? "_white" : "";
    let newIconName = "";

    if (isWhiteTheme) {
        newIconName = iconName.slice(0, -10) === "list" ? "squares" : "list";
    } else {
        newIconName = iconName === "list.svg" ? "squares" : "list";
    }

    document.getElementById("grid-toggle-img").src = "resources/svg/" + newIconName + whiteString + ".svg";
}

function changeFontElementsColor(color) {
    const fontNames = document.getElementsByClassName('font-name');
    const exampleTexts = document.getElementsByClassName('example-text');

    for (let i = 0; i < fontNames.length; i++) {
        fontNames[i].style.color = color;
        exampleTexts[i].style.color = color;
    }
};

function changeFontSize(size) {
    const exampleTexts = document.getElementsByClassName('example-text');

    for (let i = 0; i < exampleTexts.length; i++) {
        exampleTexts[i].style.fontSize = size;
    }
}

function fillFooter() {
    document.getElementsByTagName('footer')[0].textContent = 'Created by GallantJohny | ' + new Date().getFullYear() + ' | Chingu Solo Project'
}

function displayFontSizeSettings() {
    document.getElementById('backdrop').addEventListener('click', closeFontSelector, { once: true });
    document.getElementById('backdrop').className = 'backdrop';
    document.getElementById('font-size-popup').style.display = 'block';
    addEventListenersToFontSelectors();
}

function closeFontSelector(){
    document.getElementById('backdrop').className = 'hide-backdrop';
    document.getElementById('font-size-popup').style.display = 'none';
    document.getElementById('font-size-toggle').addEventListener('click', displayFontSizeSettings, { once: true });
}

function addEventListenersToFontSelectors() {
    let popupChildren = document.getElementById("font-size-popup").children;

    for (const node of popupChildren) {
        node.addEventListener('click', () => onFontClicked(node, popupChildren), false);
    }
}

function onFontClicked(node, nodeList) {
    const fontSize = node.children[1].innerText;
    console.log(fontSize);

    for (const child of nodeList) {
        child.children[0].className = "hidden-circle";
        child.children[2].className = "hidden-circle";
    }

    node.children[0].className = "circle";
    node.children[2].className = "circle";

    changeFontSize(fontSize);
    changeCurrentFontSize(fontSize);
}

function changeCurrentFontSize(number) {
    document.getElementById('current-font-size').innerText = number;
}