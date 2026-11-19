const normalizeProductLanguage = (lang) => {
  if (lang === "jp") {
    return "ja";
  }

  return ["vi", "ja", "en"].includes(lang) ? lang : "vi";
};

const setupProductPageI18n = (translations) => {
  const langButtons = {
    vi: document.getElementById("product-lang-vi"),
    ja: document.getElementById("product-lang-jp"),
    en: document.getElementById("product-lang-en"),
  };

  const setMetaContent = (selector, value) => {
    const element = document.querySelector(selector);

    if (element && value) {
      element.setAttribute("content", value);
    }
  };

  const setContent = (selector, value, useHtml = false) => {
    const element = document.querySelector(selector);

    if (!element || value === undefined) {
      return;
    }

    if (useHtml) {
      element.innerHTML = value;
      return;
    }

    element.textContent = value;
  };

  const applyLanguage = (lang) => {
    const normalizedLang = normalizeProductLanguage(lang);
    const locale = translations[normalizedLang] || translations.vi;

    document.documentElement.lang = normalizedLang;
    document.title = locale.metaTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && locale.metaDescription) {
      metaDescription.setAttribute("content", locale.metaDescription);
    }

    setMetaContent('meta[property="og:title"]', locale.ogTitle || locale.metaTitle);
    setMetaContent('meta[property="og:description"]', locale.ogDescription || locale.metaDescription);
    setMetaContent('meta[name="twitter:title"]', locale.twitterTitle || locale.ogTitle || locale.metaTitle);
    setMetaContent('meta[name="twitter:description"]', locale.twitterDescription || locale.ogDescription || locale.metaDescription);

    Object.entries(langButtons).forEach(([code, button]) => {
      if (button) {
        button.classList.toggle("active", code === normalizedLang);
      }
    });

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = locale[key];

      if (value !== undefined) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.getAttribute("data-i18n-html");
      const value = locale[key];

      if (value !== undefined) {
        element.innerHTML = value;
      }
    });

    setContent(".branding-copy span", locale.brandLabel);
    setContent(".branding-copy strong", locale.brandTitle);
    setContent(".back-home-link", locale.backHome);
    setContent(".open-source-link", locale.topCta);
    setContent(".preview-open-link", locale.previewOpen);

    try { localStorage.setItem("preferred-lang", normalizedLang); } catch {}
  };

  Object.entries(langButtons).forEach(([code, button]) => {
    if (button) {
      button.addEventListener("click", () => applyLanguage(code));
    }
  });

  let savedLanguage = 'vi';
  try { savedLanguage = localStorage.getItem('preferred-lang') || 'vi'; } catch {}
  applyLanguage(savedLanguage);
};

// Shared consultation routing and the selected road-design visual language.
(() => {
  const scriptUrl = document.currentScript.src;
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('product-road.css', scriptUrl).href;
  document.head.append(stylesheet);
  const slug = location.pathname.split('/').filter(Boolean).filter(p => p !== 'index.html').pop();
  const names = {'mesi-v1':'MESI-V1','mgaw-v1':'MGAW-V1','sensor-iot':'Sensor IoT','tingbox':'TingBox','bipap':'BiPAP','tool-jig':'Tool / JIG'};
  if (names[slug]) document.querySelectorAll('a[href*="#contact"]').forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.searchParams.set('product', names[slug]);
    link.href = url.href;
  });
})();
