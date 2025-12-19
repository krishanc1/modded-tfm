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
      startingMegaCredits: 25,

      metadata: {
        cardNumber: 'R58',
        description: 'You start with 25 M€ and 10 M€ production. When you take an action that would decrease an opponent\'s production or resources, increase YOUR production or resources by that amount instead. Each generation, when you pass, discard all your remaining M€.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(25).production((pb) => pb.megacredits(10));
          b.corpBox('effect', (ce) => {
            ce.effect('When you take an action that would decrease an opponent\'s production or resources, increase YOUR production or resources by that amount instead. Each generation, when you pass, discard all your remaining M€.', (eb) => {
              eb.empty().startEffect.text('See description');
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
}