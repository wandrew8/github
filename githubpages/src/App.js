import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import RepoCards from './components/RepoCards'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import UserCard from './components/UserCard';
import './App.scss';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [repoInfo, setRepoInfo] = useState([]);
  const [searchType, setSearchType] = useState("topic");
  const [userQuery, setUserQuery] = useState('');
  const [topicQuery, setTopicQuery] = useState('');

  const getUserInfo = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch(`https://api.github.com/users/${userQuery}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data.login)
      setUserInfo(data);
      setUserQuery('');
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  };

  const getSearchRepo = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch(`https://api.github.com/search/repositories?q=${topicQuery}&sort=stars&order=desc`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setIsLoading(false);
      setRepoInfo(data.items);
      setTopicQuery('');
    })
    .catch(err => console.log(err))
  };
  
  const handleUserChange = (e) => {
    setUserQuery(e.target.value);
  }

  const handleTopicChange = (e) => {
    setTopicQuery(e.target.value);
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{ margin: "0 auto", textAlign: "center"}}>
        <Typography component="div" style={{margin: "2rem", fontSize: "3rem", fontWeight: "200"}}>GitHub Search</Typography>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={() => setSearchType("topic")}>Search By Topic</Button>
          <Button onClick={() => setSearchType("user")}>Search By User</Button>
        </ButtonGroup>
        <div className="formContainer">
          {searchType === 'topic' ? 
          <form 
            onSubmit={getSearchRepo}
            className="form" 
            validate="true"
            autoComplete="off">
            <TextField 
              value={topicQuery}
              onChange={handleTopicChange}
              id="outlined-basic" 
              label="Topic Search" 
              variant="outlined" />
            <Typography component="p" style={{color: "lightgray", margin: "0.8rem"}}>Enter a topic to search such as React, Ruby, or Javascript</Typography>
            {topicQuery.length > 3 ? <Button type="submit" variant="outlined" color="primary">
              Search Topic
            </Button> : null}
          </form> : null }
          {searchType === 'user' ? 
          <form 
            onSubmit={getUserInfo}
            className="form" 
            validate="true"
            autoComplete="off">
            <TextField 
              value={userQuery}
              onChange={handleUserChange}
              id="outlined-basic" 
              label="User Search" 
              variant="outlined" />
            <Typography component="p" style={{color: "lightgray", margin: "0.8rem"}}>Enter a github username</Typography>
            {userQuery.length > 3 ? <Button type="submit" variant="outlined" color="primary">
              Search Users
            </Button> : null}
          </form> : null}
        </div>
        {isLoading ? <CircularProgress /> : null}
        <Grid container spacing={3} style={{ justifyContent: "center", margin: "0rem auto", maxWidth: "900px", width: "90%"}}>
          {!isLoading && userInfo.login ? <UserCard data={userInfo} /> : null}
          {repoInfo.length > 0 ? repoInfo.map(item => {return <RepoCards data={item} />}) : null}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
