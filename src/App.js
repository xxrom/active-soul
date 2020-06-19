import React, { memo } from 'react';

import { Background, Controls } from './components';

const App = memo(() => (
  <Background>
    <Controls />
  </Background>
));

export { App };
