import { game } from '@/game';
import { loader, overworldMap } from '@/maps/services/MapLoader';
import { OverworldScene } from '@/scenes/ui/OverworldScene';
import { playerCharacterImage } from '@/player/constants/PlayerAssets';

loader.addResource(playerCharacterImage);
game.addScene('overworld', new OverworldScene(overworldMap));
game.start(loader).then(() => game.goToScene('overworld'));
