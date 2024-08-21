import * as React from 'react';
import './style.css';

export default function App() {
  const [coords, setCoords] = React.useState(100);

  React.useEffect(() => {}, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>{coords}</p>
    </div>
  );
}
