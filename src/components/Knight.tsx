import Bishop from './Bishop';
import Pawn from './Pawn';
import SphericalChessboard, { SphericalPosition } from './SphericalChessboard';

class Knight {
  position: SphericalPosition;
  board: SphericalChessboard;
  isEnemy: boolean;

  constructor(initialPosition: SphericalPosition, board: SphericalChessboard, isEnemy: boolean = false) {
    this.position = initialPosition;
    this.board = board;
    this.isEnemy = isEnemy;
  }

  isInsideKnight(mouseX: number, mouseY: number, width: number, height: number) {
    const { x, y, z } = this.board.sphericalToCartesian(this.position);
    const screenX = (x / (this.board.radius + z)) * width / 2 + width / 2;
    const screenY = (y / (this.board.radius + z)) * height / 2 + height / 2;

    const distance = Math.sqrt((mouseX - screenX) ** 2 + (mouseY - screenY) ** 2);
    return distance <= 10; // 10 é o raio da área circular do cavalo
  }

  // Renderiza o cavalo em sua posição atual
  render(context, width: number, height: number) {
    const { x, y, z } = this.board.sphericalToCartesian(this.position);
    const screenX = (x / (this.board.radius + z)) * width / 2 + width / 2; // Ajustando para considerar o centro da tela
    const screenY = (y / (this.board.radius + z)) * height / 2 + height / 2; // Ajustando para considerar o centro da tela

    context.beginPath();
    context.arc(screenX, screenY, 10, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();
  }

  checkCollision(otherPiece: Knight | Pawn | Bishop) {
    return this.position.longitude === otherPiece.position.longitude &&
           this.position.latitude === otherPiece.position.latitude;
  }
  // Move o cavalo para uma nova posição
  moveTo(newPosition) {
    this.position = newPosition;
  }
}

export default Knight