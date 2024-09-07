import Bishop from './Bishop';
import Knight from './Knight';
import SphericalChessboard, { SphericalPosition } from './SphericalChessboard.js';

class Pawn {
  position: SphericalPosition;
  board: SphericalChessboard;
  isEnemy: boolean;

  constructor(initialPosition: SphericalPosition, board: SphericalChessboard, isEnemy: boolean = false) {
    this.position = initialPosition;
    this.board = board;
    this.isEnemy = isEnemy;
  }

  // Renderiza o Peão na posição atual
  render(context, width: number, height: number) {
    const { x, y, z } = this.board.sphericalToCartesian(this.position);
    const screenX = (x / (this.board.radius + z)) * width / 2 + width / 2;
    const screenY = (y / (this.board.radius + z)) * height / 2 + height / 2;

    context.beginPath();
    context.arc(screenX, screenY, 10, 0, 2 * Math.PI);
    context.fillStyle = this.isEnemy ? "red" : "green";
    context.fill();
  }

  // Move o Peão para uma nova posição
  moveTo(newPosition: SphericalPosition) {
    this.position = newPosition;
  }

  // Verifica se há colisão com outra peça
  checkCollision(otherPiece: Knight | Pawn | Bishop) {
    return this.position.longitude === otherPiece.position.longitude &&
           this.position.latitude === otherPiece.position.latitude;
  }
}

export default Pawn