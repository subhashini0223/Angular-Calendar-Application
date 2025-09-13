
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Angular-Calendar-Application/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Angular-Calendar-Application"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 576, hash: 'eaeabd0e946070104e74553c1cd351c2156b3b69fd54ccc7d8a564a08684d34d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 978, hash: 'dc26ee13975f4f6980fef94a423c9e8284fd208fc13725fdb444913a3c4b34aa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14118, hash: '8470904aafbe612596e8d9e78043a41773edaee82cb7c50f333ecb7728b2815f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NETG2PSU.css': {size: 331, hash: 'RtZZl7Q+BNc', text: () => import('./assets-chunks/styles-NETG2PSU_css.mjs').then(m => m.default)}
  },
};
