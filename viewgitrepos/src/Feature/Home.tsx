import Repositories from "./Repositories/Repositories"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Home() {
    return (<>
    <div style={{ padding: "10px" }}>
                <AppBar position="static" style={{backgroundColor:"white",color:"black"}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h1>GitHub Repositories</h1>
                        </Typography>
                        
                    </Toolbar>
                </AppBar></div>
    <div><Repositories /></div></>
    )
  }

  export default Home