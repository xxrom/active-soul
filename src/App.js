import React, { memo } from 'react';

import { Background, Controls, Animation } from './components';

const App = memo(() => {
  return (
    <Background>
      {/* <Animation /> */}
      <Controls />
    </Background>);
});

export { App };
