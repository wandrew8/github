import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    console.log("hello");
    // getUserInfo();
    // getSearchRepo();
  })

  const getUserInfo = () => {
    fetch("https://api.github.com", {
      headers: {
        Authorization: "Basic dXNlcm5hbWU="
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err))
  };

  const getSearchRepo = () => {
    fetch("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err))
  };
  
  
  return (
    <div>
     Search GitHub
    </div>
  );
}

export default App;
