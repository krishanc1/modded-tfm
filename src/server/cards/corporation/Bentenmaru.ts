import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IPlayer} from '../../IPlayer';
import {Tag} from '../../../common/cards/Tag';
import {Resource} from '../../../common/Resource';
import {CorporationCard} from './CorporationCard';

export class Bentenmaru extends CorporationCard {
  constructor() {
    super({
      name: CardName.BENTENMARU,
      tags: [Tag.SPACE],
      startingMegaCredits: 36,

      metadata: {
        cardNumber: 'R58',
        description: 'You start with 36 M€ and 10 M€ production. Each generation, when you pass, discard all your remaining M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(36).production((pb) => pb.megacredits(10));
          b.corpBox('effect', (ce) => {
            ce.effect('Each generation, when you pass, discard all your remaining M€.', (eb) => {
              eb.empty().startEffect.text('Lose all M€');
            });
          });
        }),
      },
    });
  }

  public override play(player: IPlayer) {
    player.production.add(Resource.MEGACREDITS, 10);
    return undefined;
  }

  public onPass(player: IPlayer): void {
    // Discard all remaining megacredits when passing
    const megacredits = player.megaCredits;
    if (megacredits > 0) {
      player.stock.deduct(Resource.MEGACREDITS, megacredits, {log: true});
    }
  }
}