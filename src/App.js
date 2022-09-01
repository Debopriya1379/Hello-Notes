import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Toolbar,Divider,IconButton,Typography} from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Home from './components/Home';
import Subject from './components/Subject';


function App() {

  return (
    <div className="App">
      <BrowserRouter>

        {/* Header */}
        <Toolbar>
          <IconButton>
            <MenuBookIcon/>
          </IconButton>
          <Typography variant='h6'>Hello Notes</Typography>
        </Toolbar>
        <Divider/>
        <br />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/subjects/:subName" element={<Subject />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
