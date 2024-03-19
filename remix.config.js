const { createRoutesFromFolders } = require('@remix-run/v1-route-convention')

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_dev: true,
    // makes the warning go away in v1.15+
    v2_routeConvention: true,
  },
  routes(defineRoutes) {
    // uses the v1 convention, work in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes)
  },
  postcss: true,
  tailwind: true,
}
