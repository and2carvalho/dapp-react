import Bishop from './Bishop';
import Knight from './Knight';

export type SphericalPosition = {
  longitude: number; // Longitude (θ) entre 0 e 360 graus
  latitude: number;  // Latitude (φ) entre -90 e 90 graus
};

class SphericalChessboard {
  radius: number;
  boardDivisions: number = 8;
  knight: Knight;
  bishop: Bishop;

  constructor(radius: number) {
    this.radius = radius;
    this.knight = new Knight({ longitude: 0, latitude: 0 }, this, false);
    this.bishop = new Bishop({ longitude: 120, latitude: 120 }, this, true); 
  }

  // Converte uma posição esférica (latitude/longitude) para coordenadas cartesianas
  sphericalToCartesian(position: SphericalPosition): { x: number, y: number, z: number } {
    const theta = (position.longitude * Math.PI) / 180;
    const phi = ((90 - position.latitude) * Math.PI) / 180;

    const x = this.radius * Math.sin(phi) * Math.cos(theta);
    const y = this.radius * Math.sin(phi) * Math.sin(theta);
    const z = this.radius * Math.cos(phi);

    return { x, y, z };
  }

  // Gera as posições das casas do tabuleiro esférico
  generateBoard() {
    const positions: any[] = [];

    for (let row = 0; row < this.boardDivisions; row++) {
      const latitude = 90 - (row * (180 / this.boardDivisions));

      for (let col = 0; col < this.boardDivisions; col++) {
        const longitude = col * (360 / this.boardDivisions);
        positions.push({ longitude, latitude });
      }
    }

    return positions;
  }

  // Renderiza o tabuleiro esférico
  renderChessboard(context, width, height) {
    const positions = this.generateBoard();

    positions.forEach(pos => {
      const { x, y, z } = this.sphericalToCartesian(pos);
      const screenX = (x / (this.radius + z)) * width / 2 + width / 2;
      const screenY = (y / (this.radius + z)) * height / 2 + height / 2;

      context.beginPath();
      context.arc(screenX, screenY, 5, 0, 2 * Math.PI);
      context.fillStyle = "black";
      context.fill();
    });

    // Renderizar o cavalo
    this.knight.render(context, width, height);
    this.bishop.render(context, width, height);
  }

  // Atualiza a posição do cavalo com base no movimento do mouse
  updateKnightPosition(mouseX: number, mouseY: number, width: number, height: number) {
    const longitude = (mouseX / width) * 360;
    const latitude = 90 - ((mouseY / height) * 180);
    this.knight.moveTo({ longitude, latitude });
  }
}

export default SphericalChessboard