import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
    name: 'rules-citer-render',
    initialize() {
        function onMessage(e) {
            if (e.origin !== 'https://frctools.com') {
                return;
            }
            const height = Number(e.data);
            if (!Number.isFinite(height) || height <= 0) {
                return;
            }

            const MAX_HEIGHT = 20000;
            const h = Math.min(Math.max(Math.round(height), 0), MAX_HEIGHT);

            let iframe = null;
            if (!iframe) {
                const iframes = document.getElementsByTagName('iframe');
                for (let i = 0; i < iframes.length; i++) {
                    if (iframes[i].contentWindow === e.source) {
                        iframe = iframes[i];
                        break;
                    }
                }
            }

            if (!iframe) {
                return;
            }
            iframe.style.height = `${h}px`;
        }

        window.addEventListener('message', onMessage, false);
    },
};