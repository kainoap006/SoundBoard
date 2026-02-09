/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

import { play_sound, find_tempo } from "./helperFunctions.js";
import { toggleRecording } from "./tuner.js";

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    const content = document.getElementById("content");

    async function loadPage(page) {
        try {
        const res = await fetch(`pages/${page}.html`);
        content.innerHTML = await res.text();
        history.pushState({ page }, "", `#${page}`);
        } catch {
        content.innerHTML = "<h2>Page not found</h2>";
        }
    }

    document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", e => {
        e.preventDefault();
        loadPage(link.dataset.page);
        });
    });

    // Handle refresh / back button
    window.addEventListener("popstate", e => {
        if (e.state?.page) loadPage(e.state.page);
    });

    // Load page on refresh
    if (location.hash) {
        loadPage(location.hash.substring(1));
    }

});


document.addEventListener("click", e => {
  if (e.target.matches("button[id]")) {
    play_sound(e.target.id);
  }
});

document.addEventListener("click", e => {
  if (e.target.matches("button[tempo]")) {
    find_tempo();
  }
});

document.addEventListener("click", e => {
  if (e.target.matches("button[mic]")) {
    toggleRecording();
  }
});