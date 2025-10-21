import Hero from '../components/Hero';
import SejarahJurusan from '../components/SejarahJurusan';
import RunningText from '../components/RunningText';
import TenagaPendidik from '../components/TenagaPendidik';

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <SejarahJurusan />
      <RunningText />
      <TenagaPendidik />
    </div>
  );
};

export default Home;
