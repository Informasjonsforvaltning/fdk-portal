import { FC, useEffect } from 'react';

const AnalyticsMonsido: FC = () => {
  const { hostname } = location;
  const isFellesDatakatalog = [
    'data.norge.no',
    'fellesdatakatalog.digdir.no'
  ].includes(hostname);
  const isTransportPortal = ['data.transportportal.no'].includes(hostname);

  useEffect(() => {
    const scriptInline = document.createElement('script');
    const script = document.createElement('script');

    scriptInline.type = 'text/javascript';
    scriptInline.innerHTML = `
            window._monsido = window._monsido || {
              token: ${
                isTransportPortal
                  ? 'H7pMv_I-KwnWIR1nkiCXuw'
                  : 'xAbTzhYnF9PHMK5X7XE-8g'
              },
              heatmap: { enabled: true }
            };
          `;

    script.src = 'https://app-script.monsido.com/v2/monsido-script.js';
    script.async = true;

    if (isFellesDatakatalog || isTransportPortal) {
      document.body.appendChild(scriptInline);
      document.body.appendChild(script);
    }

    return () => {
      if (isFellesDatakatalog || isTransportPortal) {
        document.body.removeChild(scriptInline);
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default AnalyticsMonsido;
