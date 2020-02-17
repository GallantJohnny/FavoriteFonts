const fonts = [
    {
        name: "Roboto",
        author: "Christian Robertson",
        class: "roboto"
    },
    {
        name: "Tomorrow",
        author: "Tony de Marco, Monica Rizzoli",
        class: "tomorrow"
    },
    {
        name: "Oswald",
        author: "Vernon Adams, Kalapi Gajjar, Cyreal",
        class: "oswald"
    },
    {
        name: "Coda Caption",
        author: "Vernon Adams",
        class: "codaCaption"
    },
    {
        name: "Indie Flower",
        author: "Kimberly Geswein",
        class: "indieFlower"
    },
    {
        name: "Lobster",
        author: "Impallari Type",
        class: "lobster"
    },
    {
        name: "Pacifico",
        author: "Vernon Adams, Jacques Le Bailly, Botjo Nikoltchev, Ani Petrova",
        class: "pacifico"
    },
    {
        name: "Source Code Pro",
        author: "Paul D. Hunt",
        class: "sourceCodePro"
    },
    {
        name: "Modak",
        author: "Ek Type",
        class: "modak"
    },
    {
        name: "Abril Fatface",
        author: "Type Together",
        class: "abrilFatface"
    },
    {
        name: "Kanit",
        author: "Cadson Demak",
        class: "kanit"
    },
    {
        name: "Righteous",
        author: "Astigmatic",
        class: "righteous"
    },
    {
        name: "Krona One",
        author: "Yvonne Schütler",
        class: "koronaOne"
    },
    {
        name: "Patua One",
        author: "Latino Type",
        class: "patuaOne"
    },
    {
        name: "Permanent Marker",
        author: "Font Diner",
        class: "permanentMaker"
    },
    {
        name: "Caveat",
        author: "Impallari Type, Cyreal",
        class: "caveat"
    }
];

renderFontElements(fonts);
fillFooter();
hideBackToTopBtn();

document.getElementById('example-text').addEventListener('keyup', onExampleInputChanged);
document.getElementById('search-font').addEventListener('keyup', onSearchInputChanged);
document.getElementById('font-size-toggle').addEventListener('click', displayFontSizeSettings, { once: true });
document.getElementById('grid-toggle').addEventListener('click', onOverlayToggle);
document.getElementById('theme-toggle').addEventListener('click', onThemeToggle);
document.getElementById('reset-input').addEventListener('click', onResetInputClicked);
document.getElementById('back-to-top').addEventListener('click', smoothScroll);
window.addEventListener('scroll', displayBackToTopBtn);

function smoothScroll() {
    let i = window.scrollY;
    let int = setInterval(() => {
        window.scrollTo(0, i);
        i -= 10;
        if (i <= 0) clearInterval(int);
    }, 1);
}

function renderFontElements(array) {
    for (let i = 0; i < array.length; i++) {
        document.getElementsByTagName('main')[0].appendChild(
            createElement(i, array[i].name, array[i].author, array[i].class)
        );
    }
}

function removeFontElements(){
    console.log("removeFontElements");
    const parent = document.getElementsByTagName('main')[0];
    const children = document.getElementsByClassName('outer-font-container');
    console.log(parent);
    for (let i = 0; i < children.length; i++){
        let child = children[i];
        console.log(child);
        parent.removeChild(child);
    }
}

function createElement(id, fontName, author, fontClass) {
    const outerContainer = document.createElement('div');
    const innerContainer = document.createElement('div');
    const header = document.createElement('header');
    const headerDiv = document.createElement('div');
    const fontNameContainer = document.createElement('p');
    const authorContainer = document.createElement('p');
    const addButtonImg = document.createElement('img');
    const section = document.createElement('section');

    outerContainer.id = id;
    outerContainer.className = 'outer-font-container outer-font-container-grid';
    innerContainer.className = 'inner-font-container';

    fontNameContainer.className = 'font-name';
    section.className = 'example-text ' + fontClass;

    fontNameContainer.textContent = fontName;
    authorContainer.textContent = author;

    section.textContent = fontName;

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
    const isGrid = /grid/.test(fontElements[0].className);

    changeIconOnOverlayToggle();

    for (let i = 0; i < fontElements.length; i++) {
        if (isGrid) {
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
        const value = document.getElementById('example-text').value; // this can be outside the loop
        const fontName = document.getElementsByClassName('font-name')[i].textContent;

        document.getElementsByClassName('example-text')[i].textContent = value !== '' ? value : fontName;
    }
}

function onSearchInputChanged() {
    const value = document.getElementById('search-font').value;
    const regValue = new RegExp(`${value}`);
    let matchingFonts = [];

    fonts.forEach(element => {
        if (regValue.test(element.name)){
            matchingFonts.push(element)
        }
    });

    console.log(matchingFonts);
    removeFontElements();
    renderFontElements(value === "" ? fonts : matchingFonts);
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

function closeFontSelector() {
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

function onResetInputClicked() {
    document.getElementById("example-text").value = "";
    onExampleInputChanged();
}

function hideBackToTopBtn(){
    document.getElementById('back-to-top').style.display = "none";
}

function displayBackToTopBtn() {
    if (window.scrollY >= 120) {
        document.getElementById('back-to-top').style.display = "block";
    } else {
        document.getElementById('back-to-top').style.display = "none";
    }
}