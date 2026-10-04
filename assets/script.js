// =========================================================
// VORTEX - SCRIPT PRINCIPAL
// =========================================================


// =========================================================
// 1. ELEMENTOS PRINCIPAIS
// =========================================================

const heroVortex =
    document.querySelector(".hero-vortex");

const botaoVortex =
    document.querySelector("#botaoVortex");

const siteVortex =
    document.querySelector("#siteVortex");

const navbar =
    document.querySelector(".navbar");

const logo =
    document.querySelector(".logo");

const secoes =
    document.querySelectorAll("main section");

const linksMenu =
    document.querySelectorAll(".nav-links a");


const prefereMenosAnimacao =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


// =========================================================
// 2. REVELA O SITE PRINCIPAL
// =========================================================

function revelarSitePrincipal() {

    if (!heroVortex || !siteVortex) {
        return;
    }


    heroVortex.style.display =
        "none";


    heroVortex.setAttribute(
        "aria-hidden",
        "true"
    );


    siteVortex.classList.add(
        "site-ativo"
    );


    siteVortex.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.remove(
        "entrada-ativa"
    );


    window.scrollTo({

        top: 0,

        behavior: "auto"

    });


    atualizarNavbar();

    atualizarMenuAtivo();

}


// =========================================================
// 3. BOTÃO "CONHEÇA A VORTEX"
// =========================================================

if (
    botaoVortex &&
    heroVortex &&
    siteVortex
) {

    botaoVortex.addEventListener(
        "click",
        function () {

            botaoVortex.disabled =
                true;


            if (
                prefereMenosAnimacao.matches
            ) {

                revelarSitePrincipal();

                return;

            }


            // Começa a transição azul.

            heroVortex.classList.add(
                "saindo"
            );


            // Começa a saída da abertura.

            setTimeout(
                function () {

                    heroVortex.classList.add(
                        "finalizando"
                    );

                },
                950
            );


            // Revela o site.

            setTimeout(
                function () {

                    revelarSitePrincipal();

                },
                1550
            );

        }
    );

}


// =========================================================
// 4. ROLAGEM SUAVE DOS LINKS INTERNOS
// =========================================================

const linksInternos =
    document.querySelectorAll(
        'a[href^="#"]'
    );


linksInternos.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const destinoId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !destinoId ||
                    destinoId === "#" ||
                    destinoId === "#inicio"
                ) {

                    return;

                }


                const destino =
                    document.querySelector(
                        destinoId
                    );


                if (!destino) {
                    return;
                }


                event.preventDefault();


                destino.scrollIntoView({

                    behavior:
                        prefereMenosAnimacao.matches
                            ? "auto"
                            : "smooth",

                    block:
                        "start"

                });

            }
        );

    }
);


// =========================================================
// 5. ELEMENTOS ANIMADOS AO ROLAR
// =========================================================

const elementosAnimados =
    document.querySelectorAll(
        `
        .titulo-secao,
        .sobre-texto,
        .destaque-item,
        .produto-card,
        .proposito-card,
        .legenda-organograma,
        .organograma-quadro,
        .avaliacao-card,
        .contato-introducao,
        .contato-item
        `
    );


elementosAnimados.forEach(
    function (elemento) {

        elemento.classList.add(
            "revelar"
        );

    }
);


// =========================================================
// 6. DELAYS DAS ANIMAÇÕES
// =========================================================

function aplicarDelay(
    seletor,
    intervalo = 70
) {

    const elementos =
        document.querySelectorAll(
            seletor
        );


    elementos.forEach(
        function (
            elemento,
            indice
        ) {

            elemento.style.setProperty(
                "--reveal-delay",
                `${indice * intervalo}ms`
            );

        }
    );

}


aplicarDelay(
    ".destaque-item",
    80
);


aplicarDelay(
    ".produto-card",
    100
);


aplicarDelay(
    ".proposito-card",
    90
);


aplicarDelay(
    ".avaliacao-card",
    90
);


aplicarDelay(
    ".contato-item",
    70
);


// =========================================================
// 7. OBSERVADOR DAS ANIMAÇÕES
// =========================================================

if (
    prefereMenosAnimacao.matches
) {

    elementosAnimados.forEach(
        function (elemento) {

            elemento.classList.add(
                "visivel"
            );

        }
    );

}

else {

    const observadorAnimacao =
        new IntersectionObserver(

            function (
                entradas,
                observador
            ) {

                entradas.forEach(
                    function (entrada) {

                        if (
                            !entrada.isIntersecting
                        ) {

                            return;

                        }


                        entrada.target
                            .classList
                            .add(
                                "visivel"
                            );


                        observador.unobserve(
                            entrada.target
                        );

                    }
                );

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -45px 0px"
            }

        );


    elementosAnimados.forEach(
        function (elemento) {

            observadorAnimacao.observe(
                elemento
            );

        }
    );

}


// =========================================================
// 8. NAVBAR AO ROLAR
// =========================================================

function atualizarNavbar() {

    if (!navbar) {
        return;
    }


    if (
        window.scrollY > 100
    ) {

        navbar.style.backgroundColor =
            "rgba(255, 255, 255, 0.97)";


        navbar.style.boxShadow =
            "0 15px 40px rgba(17, 24, 39, 0.14)";

    }

    else {

        navbar.style.backgroundColor =
            "rgba(255, 255, 255, 0.92)";


        navbar.style.boxShadow =
            "0 12px 35px rgba(17, 24, 39, 0.08)";

    }

}


// =========================================================
// 9. MENU ATIVO
// =========================================================

function atualizarMenuAtivo() {

    if (
        secoes.length === 0 ||
        linksMenu.length === 0
    ) {

        return;

    }


    let secaoAtual = "";


    secoes.forEach(
        function (secao) {

            const topo =
                secao.offsetTop - 190;


            const altura =
                secao.offsetHeight;


            if (
                window.scrollY >= topo &&
                window.scrollY <
                topo + altura
            ) {

                secaoAtual =
                    secao.getAttribute(
                        "id"
                    );

            }

        }
    );


    linksMenu.forEach(
        function (link) {

            const destino =
                link.getAttribute(
                    "href"
                );


            link.classList.toggle(
                "ativo",
                destino ===
                    `#${secaoAtual}`
            );

        }
    );

}


// =========================================================
// 10. SCROLL OTIMIZADO
// =========================================================

let scrollAgendado =
    false;


window.addEventListener(
    "scroll",
    function () {

        if (scrollAgendado) {
            return;
        }


        scrollAgendado =
            true;


        window.requestAnimationFrame(
            function () {

                atualizarNavbar();

                atualizarMenuAtivo();


                scrollAgendado =
                    false;

            }
        );

    }
);


// =========================================================
// 11. LOGO VOLTA AO TOPO
// =========================================================

if (logo) {

    logo.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            window.scrollTo({

                top: 0,

                behavior:
                    prefereMenosAnimacao.matches
                        ? "auto"
                        : "smooth"

            });

        }
    );

}


// =========================================================
// 12. ESTADO INICIAL
// =========================================================

window.addEventListener(
    "load",
    function () {

        atualizarNavbar();

        atualizarMenuAtivo();

    }
);