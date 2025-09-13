
export default {
  basePath: 'Angular-Calendar-Application',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
