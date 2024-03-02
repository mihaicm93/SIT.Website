/**
 * This script will handle the layout changes
 * when you go from chad computer screen
 * to shitty mobile screen.
 * 
 * Author: Atomos821
 */

"use strict";

const defaultFontSize = 16; // unit: px.
const matchValue = 48; // unit: em.

function sideMenu(bool) {
    const nav = document.querySelector('header nav');
    const overlay = document.querySelector('div[overlay-menu-content]');

    if (!bool) {
        // Restore nav to initial state.
        nav.removeAttribute('style');
        nav.querySelectorAll('a').forEach(link => link.removeAttribute('style'));
        nav.querySelector('button[aki-menu]').removeAttribute('style');

        if (overlay.hasAttribute('opened')) {
            overlay.removeAttribute('opened');
            overlay.setAttribute('closed', null);
        }

        return null;
    }

    nav.style.justifyContent = 'flex-start';
    nav.querySelector('button[aki-menu]').style.display = 'block';
    nav.querySelectorAll('a').forEach(link => link.style.display = 'none');
}

/**
 * Toggles the side menu, either displaying or hiding it,
 * depending on the attributes of the overlay menu.
 */
function toggleMenu() {
    const overlay = document.querySelector('div[overlay-menu-content]');

    if (overlay.hasAttribute('opened')) {
        overlay.removeAttribute('opened');
        overlay.setAttribute('closed', null);
    } else {
        overlay.removeAttribute('closed');
        overlay.setAttribute('opened', null);
    }
}

// "Plz don't look sempai~ !!!" ｏ(≧▼≦○〃
let widthMatch = window.matchMedia(`(max-width: ${matchValue}em)`);
widthMatch.addEventListener('change', matchedMedia => (matchedMedia.matches || window.innerWidth <= (matchValue * defaultFontSize)) ? sideMenu(true) : sideMenu(false));
widthMatch.dispatchEvent(new Event("change")); // Force event on page load.
document.querySelector('header nav button[aki-menu]').addEventListener('click', () => toggleMenu());