import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

export default class PVE extends Battle {
  private _player: Fighter;
  private _monster: SimpleFighter[] | Monster[];

  constructor(
    player: Fighter, 
    monster: SimpleFighter[] | Monster[],
  ) {
    super(player);
    this._player = player;
    this._monster = monster;
  }

  public fight(): number {
    const monsters = this._monster.map((monster) => {
      this._player.attack(monster);
      monster.attack(this._player);
      return monster;
    }).some((monster) => monster.lifePoints > 0);

    if (!monsters) return 1;
    if (this._player.lifePoints === -1) return -1;

    return super.fight();
  }
}