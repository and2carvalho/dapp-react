import React, { useState, useEffect, ReactElement } from 'react';
import './style.css';
import { api } from './api';
import styled from 'styled-components';
import SphericalChessboard from 'components/SphericalChessboard';

interface AlbumCardProps {
  selected?: boolean;
}

const AlbumCard = styled.div<AlbumCardProps>`
  padding: 20px;
  border: 1px solid #dedede;
  border-radius: 10px;
  margin: 10px;

  .title {
    font-size: 25px;
    font-weigth: bold;
  }

  .sub-title {
    cursor: pointer;
    ${(props) => props.selected
    ? `
      font-size: 21px;
      color: #aeaeae;
      `
    : `
      
      `
  }
  }

  .musica-wrapper {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .tag {
    padding: 12px;
    margin: 10px;
    border: 1px solid #ab433431;
    border-radius: 12px;
    width: fit-content;
    cursor: pointer;

    &:hover {
      background-color: #cecece;
    }
  }
`

export default function App() {

  const board = new SphericalChessboard(10);

  useEffect(() => {
    const cvs = document.getElementById(`board-canvas`) as HTMLCanvasElement
    const context = cvs.getContext(`2d`)

    context.beginPath();
    context.strokeStyle = `#bebebe`
    context.lineWidth = 1;
    for (let i = 0; i <= 800; i += 100) {
      context.moveTo(0, i);
      context.lineTo(800, i);
      context.moveTo(i, 0);
      context.lineTo(i, 800);
    }
    context.stroke();
    
    board.renderChessboard(context, 200, 200)
  }, [])

  const MainBoard = styled.canvas`
    width: 80vw;
    height: 80vh
    display: flex;
    justify-content: center;
    aligin-items: center;
    transform: translate(20%,45%);

  `
  return (
    <div>
      <MainBoard id={`board-canvas`}></MainBoard>
    </div>
  );
}
