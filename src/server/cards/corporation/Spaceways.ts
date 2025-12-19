import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';
import {CorporationCard} from './CorporationCard';

export class Spaceways extends CorporationCard {
  constructor() {
    super({
      name: CardName.SPACEWAYS,
      tags: [Tag.SPACE],
      startingMegaCredits: 42,

      metadata: {
        cardNumber: 'R55',
        description: 'You start with 42 M€ and 2 titanium. When any player plays a Space Event, gain 2 M€. When you play a Space Event, increase your M€ production 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(42).titanium(2);
          b.corpBox('effect', (ce) => {
            ce.effect('When any player plays a Space Event, gain 2 M€.', (eb) => {
              eb.cards(1, {secondaryTag: Tag.SPACE}).asterix().startEffect.megacredits(2);
            });
            ce.effect('When you play a Space Event, increase your M€ production 1 step.', (eb) => {
              eb.cards(1, {secondaryTag: Tag.SPACE}).startEffect.production((pb) => pb.megacredits(1));
            });
          });
        }),
      },
    });
  }

  public override play(player: IPlayer) {
    player.stock.add(Resource.TITANIUM, 2);
    return undefined;
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (card.type === CardType.EVENT && card.tags.includes(Tag.SPACE)) {
      const corpOwner = player.game.getCardPlayerOrThrow(this.name);
      corpOwner.stock.add(Resource.MEGACREDITS, 2, {log: true});

      if (player.id === corpOwner.id) {
        corpOwner.production.add(Resource.MEGACREDITS, 1, {log: true});
      }
    }
  }
}