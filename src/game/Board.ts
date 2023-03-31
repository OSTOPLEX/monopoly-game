import {Player} from "./Player";
import {CommunityChestCard} from "./Cards/CommunityChestCard";
import {ChanceCard} from "./Cards/ChanceCard";
import {Tile} from "./Tiles/Tile";
import {
  cmpsOrder, getChanceCards,
  getCommunityChestCards,
  tokens
} from "./GameConfig";
import {Bank} from "./Bank";
import {Action} from "./Actions/Action";
import {getPlayerById, throwDice} from "./Utils";
import {ErrorAction} from "./Actions/ErrorAction";
import {MoveAction} from "./Actions/MoveAction";
import {GetOutOfJailAction} from "./Actions/GetOutOfJailAction";
import {GoAction} from "./Actions/GoAction";

export class Board {
  public tokens: ReadonlyArray<{ name: string }>;
  public cmpsOrder: ReadonlyArray<string>;
  private readonly currentPlayerId: string;
  public players: Array<Player>;
  private communityChestCards: Array<CommunityChestCard>;
  private chanceCards: Array<ChanceCard>;
  public tiles: Array<Tile>;
  public bank: Bank;

  constructor(tiles: Array<Tile>, players: Array<Player>, currentPlayerId: string, bank: Bank) {
    this.tokens = tokens;
    this.tiles = tiles;
    this.cmpsOrder = cmpsOrder;
    this.communityChestCards = getCommunityChestCards();
    this.chanceCards = getChanceCards();
    this.currentPlayerId = currentPlayerId;
    this.players = players;
    this.bank = bank;

    this.removeReceivedCards();
  }

  private removeReceivedCards() {
    this.players.forEach((player) => {
      player.communityChestCards.forEach((communityCard) => {
        const cardIdx = this.communityChestCards.findIndex(
          (c: CommunityChestCard) => c.getId() == communityCard.getId()
        );
        this.communityChestCards.splice(cardIdx, 1);
      });

      player.chanceCards.forEach((chanceCard) => {
        const cardIdx = this.chanceCards.findIndex(
          (c: ChanceCard) => c.getId() == chanceCard.getId()
        );
        this.chanceCards.splice(cardIdx, 1);
      });
    });
  }

  public doStep(playerId: string): Array<Action> {
    const dice = throwDice();
    return this.applyDice(playerId, dice);
  }

  private applyDice(playerId: string, dice: Array<number>): Array<Action> {
    if (!this.isCurrentPlayer(playerId))
      return [new ErrorAction(dice, playerId)];

    if (this.isInJail(playerId)) {
      return this.increaseStepsInJail(playerId, dice);
    }

    const action = new MoveAction(playerId, 0, dice);

    return action.doAction(this);
  }

  private isCurrentPlayer(playerId: string): boolean {
    return playerId == this.currentPlayerId;
  }

  private isInJail(playerId: string): boolean {
    const player = getPlayerById(playerId, this.players);
    return player.getStepsInJail() != 0;
  }

  private increaseStepsInJail(playerId: string, dice: Array<number>): Array<Action> {
    let player = getPlayerById(playerId, this.players);
    player.increaseStepsInJail();
    const isDouble = dice[0] == dice[1];
    let result = new Array<Action>();

    if (isDouble) {
      this.getOutOfJail(player.getId());
      const getOutOfJailAction = new GetOutOfJailAction(dice, playerId);
      getOutOfJailAction.doAction(this);
      result.push(getOutOfJailAction);
      result.push(...this.applyDice(playerId, dice));
    } else {
      result.push(new MoveAction(playerId, player.getPosition(), dice));
    }

    return result;
  }

  public movePlayerToNewTile(dice: Array<number>, playerId: string): Array<Action> {
    const player = getPlayerById(playerId, this.players);
    this.tiles[player.getPosition()].removePlayer(playerId);
    const result = this.calculateNewPosition(dice, playerId);
    this.tiles[player.getPosition()].addPlayer(player);

    return result;
  }

  private calculateNewPosition(dice: Array<number>, playerId: string): Array<Action> {
    let player = getPlayerById(playerId, this.players);

    const currPosition = player.getPosition();
    let newPosition =  + dice[0] + dice[1];

    if (newPosition > 39){
      newPosition -= 40;
    }

    let result = [];
    if (currPosition > newPosition) {
      result.push(new GoAction(dice, playerId))
    }

    player.setPosition(newPosition);

    return result;
  }

  public advancePlayer(position: number, playerId: string) {
    const player = getPlayerById(playerId, this.players);
    this.tiles[player.getPosition()].removePlayer(playerId);
    this.tiles[position].addPlayer(player);
  }

  public goToJail(playerId: string) {
    let player = getPlayerById(playerId, this.players);
    player.setStepsInJail(3);
  }

  public getOutOfJail(playerId: string) {
    let player = getPlayerById(playerId, this.players);
    player.setStepsInJail(0);
  }
}