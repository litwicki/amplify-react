import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html,body {
  background: #f9f9f9;
  font-size: 1em;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Ubuntu Mono', monospace;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-family: 'Ubuntu', sans-serif;
}

#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

::-moz-selection {
  background: #b3d4fc;
  text-shadow: none;
}

::selection {
  background: #b3d4fc;
  text-shadow: none;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}

audio,
canvas,
iframe,
img,
svg,
video {
  vertical-align: middle;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

.browserupgrade {
  margin: 0.2em 0;
  background: #ccc;
  color: #000;
  padding: 0.2em 0;
}

.hidden {
  display: none !important;
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  /* 1 */
}

.sr-only.focusable:active,
.sr-only.focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  white-space: inherit;
  width: auto;
}

/*
* Hide visually and from screen readers, but maintain layout
*/

.invisible {
  visibility: hidden;
}

.clearfix:before,
.clearfix:after {
  content: " ";
  /* 1 */
  display: table;
  /* 2 */
}

.clearfix:after {
  clear: both;
}

@media only screen and (min-width: 35em) {
  /* Style adjustments for viewports that meet the condition */
}

@media print,
  (-webkit-min-device-pixel-ratio: 1.25),
  (min-resolution: 1.25dppx),
  (min-resolution: 120dpi) {
  /* Style adjustments for high resolution devices */
}

@media print {
  *,
  *:before,
  *:after {
    background: transparent !important;
    color: #000 !important;
    /* Black prints faster */
    box-shadow: none !important;
    text-shadow: none !important;
  }
  a,
  a:visited {
    text-decoration: underline;
  }
  a[href]:after {
    content: " (" attr(href) ")";
  }
  abbr[title]:after {
    content: " (" attr(title) ")";
  }

  a[href^="#"]:after,
  a[href^="javascript:"]:after {
    content: "";
  }
  pre {
    white-space: pre-wrap !important;
  }
  pre,
  blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }
  tr,
  img {
    page-break-inside: avoid;
  }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }
  h2,
  h3 {
    page-break-after: avoid;
  }
}
`;

export default GlobalStyle;
