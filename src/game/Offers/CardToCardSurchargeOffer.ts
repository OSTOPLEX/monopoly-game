import {IOffer} from "./IOffer";
import {Bank} from "../Bank";
import {CardType} from "../Cards/Card";

export class CardToCardSurchargeOffer implements IOffer {
  private offer1: {userId: string, cardId: string, cardType: CardType};
  private offer2: {userId: string, moneyAmount: number, cardId: string, cardType: CardType};

  constructor(offer1: {userId: string, cardId: string, cardType: CardType}, offer2: {userId: string, moneyAmount: number, cardId: string, cardType: CardType}) {
    this.offer1 = offer1;
    this.offer2 = offer2;
  }

  public acceptOffer(bank: Bank): void {
    bank.transferCard(this.offer1.userId, this.offer2.userId, this.offer1.cardId, this.offer1.cardType);
    bank.transferCard(this.offer2.userId, this.offer1.userId, this.offer2.cardId, this.offer2.cardType);
    bank.payMoney(this.offer2.userId, this.offer1.userId, this.offer2.moneyAmount);
  }
}