import { game } from '@/game';
import { OverworldScene } from '@/scenes/ui/OverworldScene';

game.addScene('overworld', new OverworldScene());
game.start().then(() => game.goToScene('overworld'));
