import * as React from 'react';
import './style.css';
import { api } from './api';

export default function App() {
  const [coords, setCoords] = React.useState(100);

  React.useEffect(() => {
    api.get(`/sqlSide/album/list`).then(resp => {
      console.log(resp.data)
    }).catch(e => {
      console.log(e)
    })
  }, []);

  const handleClick = async () => {
    return api.get(`/sqlSide/album/list`).then(resp => {
      console.log(resp.data)
    }).catch(e => {
      console.log(e)
    })
  }
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <button
        onClick={handleClick}
      >Clique</button>
      <p>{coords}</p>
    </div>
  );
}
