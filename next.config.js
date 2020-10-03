//#region > Imports
const withFonts = require("next-fonts");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
//#endregion

//#region > Exports
module.exports = [
  withPlugins([withFonts, withImages]),
  { experimental: { scss: true } },
];
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 InspireMedia GmbH
 */
