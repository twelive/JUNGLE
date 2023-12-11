import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

body
body * { touch-action: none; }
/* reset CSS */
html, body, div, span, applet, object, iframe, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
  background-color: var(--main-bgColor);
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* Font 설정 */
html, body, #root {
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

:root {
  --main-bgColor: #F4F3EF;
  --bs-black-000: #000;
  --bs-black-100: #111;
  --bs-black-200: #222;
  --bs-black-300: #333;
  --bs-black-400: #444;
  --bs-black-500: #555;
  --bs-black-600: #666;
  --bs-black-700: #777;
  --bs-black-800: #888;
  --bs-black-900: #999;
    }

h1 {
  font-size: 1.875rem;
  font-weight: bold;
}

.sr-only {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  margin: -1px;
}
`;


export default GlobalStyles;
