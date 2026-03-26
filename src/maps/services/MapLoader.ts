import { Loader } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

export const overworldMap = new TiledResource('/maps/overworld.tmj');

export const loader = new Loader([overworldMap]);
