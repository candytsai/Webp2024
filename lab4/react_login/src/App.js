import logo from './logo.svg';
import './App.css';
import CGU_Login from './cgu_login';
import HelloCGU from './cgu_hello';

function App() {
  return(
    <div className="APP">
      <div>
        {CGU_Login()}
      </div>
      <div>
        {/* {MultiButton(10)} */}
      </div>
    </div>
  );
}

export default App;
