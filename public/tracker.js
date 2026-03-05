/**
 * WitDev Analytics Tracker v1.0
 * Script leve (~3KB) para coletar page views, cliques e tempo de permanência
 * 
 * Uso: <script src="https://witdev.com.br/tracker.js" data-site="nome-do-site" async></script>
 */
(function () {
    'use strict';

    // Configuração
    var script = document.currentScript;
    var siteId = script ? script.getAttribute('data-site') : null;
    var trackUrl = script ? (script.getAttribute('data-api') || script.src.replace('/tracker.js', '/api/track')) : '/api/track';

    if (!siteId) {
        console.warn('[WitDev Tracker] data-site attribute missing');
        return;
    }

    // Gerar IDs únicos
    function generateId() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Visitor ID persistente (localStorage)
    function getVisitorId() {
        var key = '_wd_vid';
        var vid = null;
        try { vid = localStorage.getItem(key); } catch (e) { }
        if (!vid) {
            vid = generateId();
            try { localStorage.setItem(key, vid); } catch (e) { }
        }
        return vid;
    }

    // Session ID (sessionStorage)
    function getSessionId() {
        var key = '_wd_sid';
        var sid = null;
        try { sid = sessionStorage.getItem(key); } catch (e) { }
        if (!sid) {
            sid = generateId();
            try { sessionStorage.setItem(key, sid); } catch (e) { }
        }
        return sid;
    }

    var visitorId = getVisitorId();
    var sessionId = getSessionId();
    var pageEntryTime = Date.now();

    // Enviar evento
    function sendEvent(type, data) {
        var payload = {
            site: siteId,
            session: sessionId,
            visitor: visitorId,
            path: window.location.pathname + window.location.search,
            referrer: document.referrer || null,
            type: type,
            data: data || null,
            duration: type === 'leave' ? Math.round((Date.now() - pageEntryTime) / 1000) * 1000 : 0,
            screen: {
                w: window.innerWidth,
                h: window.innerHeight
            }
        };

        // Usar sendBeacon para eventos de saída (mais confiável)
        if (type === 'leave' && navigator.sendBeacon) {
            navigator.sendBeacon(trackUrl, JSON.stringify(payload));
            return;
        }

        // Fetch para outros eventos
        try {
            fetch(trackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(function () { });
        } catch (e) { }
    }

    // 1. Pageview automático
    sendEvent('pageview');

    // 2. Rastrear cliques em elementos com data-track
    document.addEventListener('click', function (e) {
        var el = e.target;
        // Subir até 5 níveis para encontrar data-track
        for (var i = 0; i < 5 && el && el !== document; i++) {
            var trackName = el.getAttribute && el.getAttribute('data-track');
            if (trackName) {
                sendEvent('click', {
                    element: trackName,
                    tag: el.tagName.toLowerCase(),
                    text: (el.textContent || '').slice(0, 100).trim(),
                    href: el.getAttribute('href') || null
                });
                return;
            }
            el = el.parentElement;
        }
    }, true);

    // 3. Rastrear tempo na página (ao sair)
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            sendEvent('leave');
        }
    });

    // 4. Rastrear navegação SPA (Next.js / React Router)
    var lastPath = window.location.pathname;
    var observer = new MutationObserver(function () {
        if (window.location.pathname !== lastPath) {
            // Enviar duração da página anterior
            sendEvent('leave');
            // Resetar timer
            lastPath = window.location.pathname;
            pageEntryTime = Date.now();
            // Nova pageview
            sendEvent('pageview');
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 5. Rastrear scroll depth
    var maxScroll = 0;
    var scrollTimer = null;
    window.addEventListener('scroll', function () {
        var scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }
        // Debounce: enviar scroll depth a cada 5s de inatividade
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            if (maxScroll >= 25) { // Só enviar se scrollou pelo menos 25%
                sendEvent('scroll', { depth: maxScroll });
            }
        }, 5000);
    }, { passive: true });
})();
