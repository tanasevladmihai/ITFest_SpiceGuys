const elements = [
    { title: 'Large Element', info: ['Information 1', 'Information 2', 'Information 3', 'Information 4'] },
    { title: 'Small Element 1', info: ['Information 1', 'Information 2', 'Information 3', 'Information 4'] },
    { title: 'Small Element 2', info: ['Information 1', 'Information 2', 'Information 3', 'Information 4'] },
    { title: 'New Element', info: ['Information 1', 'Information 2', 'Information 3', 'Information 4'] }
];

function nextElement() {
    const largeElement = document.getElementById('largeElement');
    const smallElement1 = document.getElementById('smallElement1');
    const smallElement2 = document.getElementById('smallElement2');

    // Apply fade-out effect
    largeElement.classList.add('fade-out');
    smallElement1.classList.add('fade-out');
    smallElement2.classList.add('fade-out');

    setTimeout(() => {
        // Shift elements
        updateElementContent(largeElement, elements[1], true);
        updateElementContent(smallElement1, elements[2], false);
        updateElementContent(smallElement2, elements[3], false);

        // Rotate elements array
        elements.push(elements.shift());

        // Remove old classes & apply slide-in effect
        largeElement.classList.remove('fade-out');
        smallElement1.classList.remove('fade-out');
        smallElement2.classList.remove('fade-out');

        largeElement.classList.add('slide-in');
        smallElement1.classList.add('slide-in');
        smallElement2.classList.add('slide-in');

        setTimeout(() => {
            largeElement.classList.remove('slide-in');
            largeElement.classList.add('slide-in-active');
            smallElement1.classList.remove('slide-in');
            smallElement1.classList.add('slide-in-active');
            smallElement2.classList.remove('slide-in');
            smallElement2.classList.add('slide-in-active');

            // Remove slide-in-active class after animation completes
            setTimeout(() => {
                largeElement.classList.remove('slide-in-active');
                smallElement1.classList.remove('slide-in-active');
                smallElement2.classList.remove('slide-in-active');
            }, 500); // Match the duration of the slide-in transition
        }, 50); // Small delay for a smoother transition
    }, 500); // Match the fade-out duration
}

function updateElementContent(element, content, isLarge) {
    element.querySelector('h2, h3').innerText = content.title;
    if (isLarge) {
        element.querySelector('ul').innerHTML = content.info.map(info => `<li>${info}</li>`).join('');
    } else {
        element.querySelector('p').innerText = content.info[0];
    }
}

function goToEventTypes() {
    window.location.href = 'event_types.html';
}

function swapCity(smallCityBlock) {
    const largeCityBlock = document.querySelector('.city-block-large');

    // Swap the inner HTML of the large and small city blocks
    const tempHTML = largeCityBlock.innerHTML;
    largeCityBlock.innerHTML = smallCityBlock.innerHTML;
    smallCityBlock.innerHTML = tempHTML;

    // Swap the background images
    const tempBackgroundImage = largeCityBlock.style.backgroundImage;
    largeCityBlock.style.backgroundImage = smallCityBlock.style.backgroundImage;
    smallCityBlock.style.backgroundImage = tempBackgroundImage;
}

// Existing code for other functionalities
function startTransition(targetPage) {
    let wipe = document.getElementById("wipeEffect");
    wipe.style.width = "100%"; // Expand wipe over the header

    setTimeout(() => {
        localStorage.setItem("wipeActive", "true"); // Save transition state
        window.location.href = targetPage;
    }, 1000);
}

// Entry animation for the page
window.onload = function() {
    let wipe = document.getElementById("wipeEffect");
    wipe.style.transition = "none"; // Start fully covered
    wipe.style.width = "100%";

    setTimeout(() => {
        wipe.style.transition = "width 1s ease-in-out";
        wipe.style.width = "0%"; // Reveal header
    }, 50);
};