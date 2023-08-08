import logo from './logo.svg';
import './App.css';
import ThemeContextProvider from './context/ThemeContextProvider';
import ThemeChange from './components/ThemeChange';

function App() {
  return (
    <ThemeContextProvider>
      <div className="App">
        <ThemeChange></ThemeChange>
      </div>
    </ThemeContextProvider>
  );
}
export default App;
