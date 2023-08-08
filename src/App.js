import logo from './logo.svg';
import './App.css';
import ThemeContextProvider from './context/ThemeContextProvider';
import ThemeChange from './components/ThemeChange';

function App() {
  return (
    <div className="ul container">
      <LanguageStore>
        <LanguageSelector />
          <ColorContext.Provider value="red">
            <UserCreate />
          </ColorContext.Provider>
      </LanguageStore>
    </div>
  );
}
export default App;
