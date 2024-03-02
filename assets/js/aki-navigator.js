'use strict';

class AkiNavigator {
    constructor(defaultView, fetchPath = 'content') {
        this.header = undefined;
        this.contentOutlet = undefined;
        this.defaultView = defaultView;
        this.fetchPath = fetchPath;

        this.onExec();
    }

    onExec() {
        this.header = document.querySelector('header');
        this.contentOutlet = document.querySelector('#router-outlet');

        window.addEventListener('hashchange', () => this.displayView(window.location.hash.substr(1)));

        if (window.location.hash) {
            this.displayView(window.location.hash.substr(1));
        } else if (typeof this.defaultView !== 'undefined') {
            this.displayView(this.defaultView);
        }
    }

    removeChildren(element) {
        let count = element.childNodes.length;

        while (count--) {
            element.removeChild(element.lastChild);
        }
    }

    async fetchView(view) {
        const response = await fetch(`${this.fetchPath}/${view}.html`);
        const text = await response.text();

        this.removeChildren(this.contentOutlet);
        this.contentOutlet.innerHTML = text;
    }

    displayView(view) {
        this.fetchView(view);

        const activeLinks = document.querySelectorAll('a[active]');
        const newActiveLinks = document.querySelectorAll(`a[href='#${view}']`);

        if (activeLinks.length > 0) {
            activeLinks.forEach(link => link.removeAttribute('active'));
        }

        newActiveLinks.forEach(newLink => newLink.setAttribute('active', ''));

        this.contentOutlet.scrollTop = 0;

        // FIXME: history push is fucked rn.
        // window.history.pushState(null, `${view}`, `#${view}`);
    }
}
