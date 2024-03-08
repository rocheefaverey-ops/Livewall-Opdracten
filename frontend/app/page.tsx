import type { NextPage } from 'next';
import Container from '@components/ui/container/container.component';

const Home: NextPage = async () => (
  <div>
    <Container>
      <div className="text-center my-4">
        <h1 className="font-bold text-3xl">LiveWall NextJS Boilerplate</h1>
        <p className="font-medium text-lg">Succesvol geinstalleerd, je kan beginnen!</p>
      </div>
    </Container>
  </div>
);

export default Home;
