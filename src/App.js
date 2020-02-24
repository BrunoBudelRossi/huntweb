import React from 'react';
import Header from './components/Header';
import './style.css';
import Main from './pages/main';
import Routes from './routes'

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World</h1>
//     </div>
//   );
// }

export default App;
