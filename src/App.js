import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
function time() {
  return (new Date().toLocaleTimeString())
}
function App() {
  return (
    <div className="App">
      <h1 style={{backgroundColor:'yellow',color:'red'}}>App</h1>
      <Hello />
      Current time: {time()} 
    </div>
  );
}
export default App;
