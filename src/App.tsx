import React, { useState, useEffect, ReactElement } from 'react';
import './style.css';
import { api } from './api';
import styled from 'styled-components';

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
  const [albuns, setAlbuns] = useState([]);
  const [albumSelected, setAlbumSelected] = useState<Number | undefined>(undefined);

  useEffect(() => {
    api.get(`/sqlSide/album/list`).then(resp => {
      setAlbuns(resp.data)
    }).catch(e => {
      console.log(e)
    })
  }, []);

  const handleSelectAlbum = (el: any) => {
    if (!!(albumSelected === el.albumId)) {
      setAlbumSelected(el.undefined)
    } else {
      setAlbumSelected(el.albumId)
    }
  }
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <div>
        {
          albuns && albuns.map((el: { [x: string]: any }) => {
            return <div>
              <AlbumCard selected={!!(albumSelected === el.albumId)} >
                <div className='title'>{el.artista}</div>
                <div
                  className='sub-title'
                  onClick={() => handleSelectAlbum(el)}
                  role='button'
                >
                  {el.albumName}
                </div>
                {!!(albumSelected === el.albumId) && <span className='musica-wrapper'>
                  {el.musica.map((m: { [x: string]: any }) => {
                    return <span className='tag'>{m.value}</span>
                  })}
                </span>}
              </AlbumCard>
            </div>
          })
        }
      </div>
    </div>
  );
}
