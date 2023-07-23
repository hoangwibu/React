import logo from './logo.svg';
import './App.css';
import BlogList from './components/BlogsList';

function App() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    title: '123 Main Street',
    phone: '555-1234',
  };
  return (
    <div className="App">
      <BlogList  name={user.name}  title={user.title}/>
    </div>
  );
}
export default App;
