import { ISimulationConfig } from "./config";

const presets: {[key: string]: Partial<ISimulationConfig>} = {
  Iowa: {
    elevation: "data/iowa-city-heightmap.png",
    riverData: "data/iowa-city-river.png",
    texture: "data/iowa-city-streetmap.png",
    heightmapMaxElevation: 45, // lowest point around 195m, highest around 235, 45m diff
    modelHeight: 13000, // around 13km, measured on google maps
    modelWidth: 20000
  },
  IowaAmplified: {
    elevation: "data/iowa-city-heightmap.png",
    riverData: "data/iowa-city-river.png",
    texture: "data/iowa-city-streetmap.png",
    heightmapMaxElevation: 45 * 20, // lowest point around 195m, highest around 235, 45m diff
    modelHeight: 13000, // around 13km, measured on google maps
    modelWidth: 20000
  },
  RiverCity: {
    elevation: "data/model2_heightmap_hi.png",
    riverData: "data/model2_map_riverdata.png",
    texture: "data/model2_map_topo.png",
    heightmapMaxElevation: 45, // lowest point around 195m, highest around 235, 45m diff
    modelHeight: 8000, // around 8km, looking at street map, this area is much smaler than Iowa preset
    modelWidth: 8000
  }
};

export default presets;
