import type { NextPage } from 'next';
import Container from '@components/ui/container/container.component';
import { getDictionary } from './dictionaries';

type Props = {
  params: { locale: string };
};

const Home: NextPage<Props> = async ({ params: { locale } }) => {
  const dict = await getDictionary(locale);
  return (
    <div>
      <Container>
        <div className="text-center my-4">
          <h1 className="font-bold text-3xl">{dict.common.title}</h1>
          <p className="font-medium text-lg">{dict.common.description}</p>
        </div>
      </Container>
    </div>
  );
};

export default Home;
