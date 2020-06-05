import React, { memo } from 'react';

import { Background, Controls } from './components';

const App = memo(() => {
  return (
    <Background>
      <Controls />
    </Background>);
});

export { App };
