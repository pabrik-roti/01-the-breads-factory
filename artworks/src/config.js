"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));
const description =
  "Logo of The Breads Factory, an NFT project by @PabrikRoti.IDN.";
const baseUri = "ipfs://QmTowqpo134kp2hyBwpHHqK3PkKbMyqxQknHj9PnhQncmy";

const layerConfigurations = [
  {
    // growEditionSizeTo: 10000,
    growEditionSizeTo: 24,
    layersOrder: [
      { name: "Her Universe" },
      { name: "Her Body" },
      { name: "Her Eyes" },
      { name: "Her Lips" },
      { name: "Her Identity" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1474,
  height: 1474,
};

const background = {
  generate: true,
  brightness: "80%",
};

// const extraMetadata = {
  //  extrametadata: "",
// };

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10500;

const preview = {
  thumbPerRow: 6,
  thumbWidth: 247,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  // extraMetadata,
};
