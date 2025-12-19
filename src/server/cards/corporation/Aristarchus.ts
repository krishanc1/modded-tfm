import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IPlayer} from '../../IPlayer';
import {Tag} from '../../../common/cards/Tag';
import {Resource} from '../../../common/Resource';
import {ActiveCorporationCard} from './CorporationCard';

export class Aristarchus extends ActiveCorporationCard {
  constructor() {
    super({
      name: CardName.ARISTARCHUS,
      tags: [Tag.VENUS, Tag.EARTH, Tag.JOVIAN],
      startingMegaCredits: 33,

      action: {
        spend: {megacredits: 0},
        stock: {megacredits: 10},
      },

      metadata: {
        cardNumber: 'R50',
        description: 'You start with 33 M€. Action: If you have exactly 0 M€, gain 10 M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(33);
          b.corpBox('action', (ce) => {
            ce.action('If you have exactly 0 M€, gain 10 M€', (eb) => {
              eb.empty().startAction.megacredits(10).asterix();
            });
          });
        }),
      },
    });
  }

  public override bespokeCanAct(player: IPlayer): boolean {
    return player.megaCredits === 0;
  }

  public override bespokeAction(_player: IPlayer) {
    // The action behavior is already defined in the constructor
    return undefined;
  }
}