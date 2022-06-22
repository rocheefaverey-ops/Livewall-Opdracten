import React, { useEffect, useState } from 'react';
import Container from '@components/ui/container/container.component';
import { Typography } from '@components/ui';
import { applyTheme } from 'themes/utils/theme';
import { PageLayout } from '../components/layout';
import '../styles/globals.css';


function App() {
  // Set theme to 'base' or 'highcontrast'
  const [theme] = useState('base');
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <PageLayout>
      <Container>
        <Typography type="h1" variant="header4">Hi</Typography>
        <Typography variant="intro">eyo</Typography>
        <Typography type="label">eyo</Typography>
      </Container>
    </PageLayout>
  );
}

export default App;
