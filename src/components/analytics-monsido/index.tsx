import { FC, useEffect } from 'react';
import { getConfig } from '../../config';

const AnalyticsMonsido: FC = () => {
  const { hostname } = location;
  const isFellesDatakatalog = [
    'data.norge.no',
    'fellesdatakatalog.digdir.no'
  ].includes(hostname);
  const isTransportPortal = getConfig().isNapProfile;

  useEffect(() => {
    const scriptInline = document.createElement('script');
    const script = document.createElement('script');

    scriptInline.type = 'text/javascript';
    scriptInline.innerHTML = `
            window._monsido = window._monsido || {
              token: ${
                isTransportPortal
                  ? '"H7pMv_I-KwnWIR1nkiCXuw"'
                  : '"xAbTzhYnF9PHMK5X7XE-8g"'
              },
              statistics: {
                enabled: true,
                cookieLessTracking: false,
                documentTracking: {
                    enabled: false,
                    documentCls: "monsido_download",
                    documentIgnoreCls: "monsido_ignore_download",
                    documentExt: ["pdf","doc","ppt","docx","pptx"],
                },
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
