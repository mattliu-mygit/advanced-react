import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [answer, setAnswer] = useState(42);

  useEffect(async () => {
    setAnswer(await asyncFunc());
  }, []);

  const asyncFunc = () => {
    return Promise.resolve(37);
  };

  return <h2>Hello React Components -- {answer}</h2>;
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
