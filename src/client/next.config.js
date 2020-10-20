//#region > Imports
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
//#endregion

//#region > Configs
const nextConfig = {
  distDir:
    process.env.NODE_ENV === "production" ? "../../dist/client" : ".next",
  trailingSlash: true,
  exportPathMap: async function () {
    const paths = {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/privacy": { page: "/privacy" },
    };

    /*const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    const shows = data.map(entry => entry.show);

    shows.forEach(show => {
        paths[`/p/${show.id}`] = { page: '/p/[id]', query: { id: show.id } };
    });*/

    return paths;
  },
  webpack: (config, options) => {
    return config;
  },
};
//#endregion

//#region > Exports
module.exports = withPlugins([[withImages(withFonts())]], nextConfig);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
