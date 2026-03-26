import { game } from '@/game';
import { loader, overworldMap } from '@/maps/services/MapLoader';
import { OverworldScene } from '@/scenes/ui/OverworldScene';

game.addScene('overworld', new OverworldScene(overworldMap));
game.start(loader).then(() => game.goToScene('overworld'));
