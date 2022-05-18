document.addEventListener("DOMContentLoaded", function () {
    // Load Page
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page)

    // Navbar Initialization
    const nav = document.querySelector(".sidenav");
    M.Sidenav.init(nav);
    loadNav(".topnav", "topnav.html");
    loadNav(".sidenav", "sidenav.html");

    // Discovery Initialization
    const discovery = document.querySelector(".tap-target");
    M.TapTarget.init(discovery)
    document.querySelector("#discovery").addEventListener("click", toggleDiscovery)
});

function sliderWidget() {
    // Slider Initialization
    const slider = document.querySelector(".slider");
    M.Slider.init(slider, {
        indicators: false,
        full_width: false,
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
        transition: 700,
        interval: 5000
    });
};

function carouselWidget() {
    // Carousel Initialization
    const carousel = document.querySelector(".carousel");
    M.Carousel.init(carousel, {
        fullWidth: true,
        indicators: true
    });
}

function loadNav(type, file) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            document.querySelectorAll(type).forEach(function (element) {
                element.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll(`${type} a`).forEach(function (element) {
                element.addEventListener("click", function (event) {
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    let page = event.target.getAttribute("href");
                    if (page.charAt(0) === "#") {
                        page = page.substr(1);
                        loadPage(page)
                    }
                })
            })
        }
    }
    xhttp.open("GET", file, true);
    xhttp.send();
};

function toggleDiscovery() {
    const element = document.querySelector(".tap-target");
    const instance = M.TapTarget.getInstance(element);
    instance.isOpen == true
        ? instance.close()
        : instance.open();
};

function modalWidgetElement(text) {
    return `<div class="modal bottom-sheet">
                <div class="modal-content">
                    <h4>${text}</h4>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>`;
};

function parallaxWidget() {
    const parallax = document.querySelector('.parallax');
    M.Parallax.init(parallax, {
        responsiveTreshold: 5,
    });
};

function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const content = document.querySelector("#body-content");
            if (this.status == 200) {
                // Load content
                content.innerHTML = xhttp.responseText;

                // Slider and Parallax initialization
                if (page === "home") {
                    sliderWidget();
                } else if (page === "history") {
                    carouselWidget()
                    parallaxWidget();
                } else {
                    parallaxWidget()
                }

                // Toggle active class
                document.querySelectorAll(".topnav a, .sidenav a").forEach(function (element) {
                    element.getAttribute("href").substr(1) === page
                        ? element.parentElement.classList.add("active")
                        : element.parentElement.classList.remove("active")
                })
            } else if (this.status = 404) {
                // Modal alert
                content.innerHTML = modalWidgetElement("Halaman Tidak Ditemukan");
                const element = document.querySelector(".modal")
                const modal = M.Modal.init(element, onCloseEnd = function () {
                    this.destroy();
                });
                modal.open();
            } else {
                // Modal alert
                content.innerHTML = modalWidgetElement("Halaman Tidak Dapat Diakses.");
                const element = document.querySelector(".modal")
                const modal = M.Modal.init(element, onCloseEnd = function () {
                    this.destroy();
                });
                modal.open();
            }
        }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
};