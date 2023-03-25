import {BoardPresenter, PieceColor} from "./board";
import {AnimationRenderersManager, PieceMoveAnimationRenderer} from "./animationsRenderers";

export const boardView = new BoardPresenter();

boardView.addPiece(0, PieceColor.Blue);
// boardView.addPiece(1, PieceColor.Green);
// boardView.addPiece(2, PieceColor.Yellow);
boardView.addPiece(1, PieceColor.Green);
boardView.addPiece(2, PieceColor.Pink);
boardView.addPiece(3, PieceColor.Purple);
boardView.addPiece(4, PieceColor.White);
boardView.addPiece(5, PieceColor.Yellow);
boardView.addPiece(6, PieceColor.Navyblue);
boardView.addPiece(7, PieceColor.Orange);

export const animationRenderersManager = new AnimationRenderersManager();

// animationRenderersManager.add(new PieceMoveAnimationRenderer(
//     piece,
//     boardView.getCell(0),
//     boardView.getCell(10),
//     3000, () => {
//         console.log("done");
//     }));
