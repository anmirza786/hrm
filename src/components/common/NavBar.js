import Login from '../Login'
import SignUp from '../SignUp'
import * as React from 'react'
import { connect } from 'react-redux'
import CustomModal from './customModal'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { logout } from '../../redux/actions/authActions'

const Navbar = ({pageLinks,children,state,logout}) => {
  const [open, setOpen] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);
//   const gotosignup = () => {
//     setOpen(false);
//     setOpenSignup(true);
//   };
//   const gotoLogin = () => {
//     setOpen(true);
//     setOpenSignup(false);
//   };
  const handleLogout = () => {
    setOpen(true);
    // eslint-disable-next-line no-restricted-globals
    // localStorage.removeItem("token");
    logout()
  };
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography noWrap sx={{ flexGrow: 1 }}>
              {/* <img
                src=""
                alt="InsightHR"
                style={{ padding: "10px", paddingTop: "15px", width: "150px" }}
              /> */}
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 36 32" fill="none" className="css-1170n61"><path fillRule="evenodd" clipRule="evenodd" d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" fill="#007FFF"></path></svg>
              </Link>
          </Typography>
          <nav>
            {pageLinks && pageLinks.map(page=>
            <Link
              variant="button"
              color="text.primary"
              to={page.link}
              sx={{ my: 1, mx: 1.5 }}
            >
              {page.name}
            </Link>)}
          </nav>
          {localStorage.getItem("token") ? (
            state.user && state.user.isAdmin ?<>
            <Link to="/addbook">
              <Button
                style={{ color: "white",marginRight: 10 }}
                variant="contained"
                color="primary"
              >
                AddBooks
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              style={{ color: "white" }}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
            </> :
            <Button
              onClick={handleLogout}
              style={{ color: "white" }}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          ) : (
            <>
                <CustomModal open={openSignup} handleOpen={handleOpenSignup} handleClose = {handleCloseSignup} buttonName={"SignUp"} component={<SignUp/>} />
                <CustomModal open={open} handleOpen={handleOpen} handleClose = {handleClose} buttonName={"Login"} component={<Login setOpen={setOpen} />} />
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps,{logout})(Navbar);
