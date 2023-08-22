import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Header(props: any) {
  let { title } = props;
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h1>{title}</h1>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
