import {Dimensions} from 'react-native'
const { height, width } = Dimensions.get('window');
const IPHONE_7_RESOLUTION = Math.sqrt(750 * 750 + 1294 * 1294);
const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);
const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / IPHONE_7_RESOLUTION;
export const DIMENSIONS = { height, width };
export const calcSize = size => RESOLUTIONS_PROPORTION * size;
