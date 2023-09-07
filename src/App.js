
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function App() {

  const name = 'Devin'

  return (
    <div className="App">
      <Header name={name} />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
