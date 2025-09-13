
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'Angular-Calendar-Application',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Angular-Calendar-Application"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 574, hash: '47a638847b5b17bc4ee445268f76ce8a66dc4092638cc84ab93393a079c17bb5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 976, hash: '2ed7b6aa8afa91b57051c3b2a73965774d2bb2d2be635400da740b93f926c450', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14116, hash: '195628feed9f06fc20178c3e8c2564165fe58462901fcb825f3e50929f8a794a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NETG2PSU.css': {size: 331, hash: 'RtZZl7Q+BNc', text: () => import('./assets-chunks/styles-NETG2PSU_css.mjs').then(m => m.default)}
  },
};
