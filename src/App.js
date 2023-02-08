import React from 'react'
import { connect } from 'react-redux'
import AGGrid from './components/AGGrid'
import AddBooks from './components/AddBooks'
import Navbar from './components/common/NavBar'
import Container from '@mui/material/Container'
import { Route, Switch } from 'react-router-dom'
import AGGridAdmin from './components/AGGridAdmin'
import { ThemeProvider } from '@mui/material/styles'
import { custometheme } from './components/common/customTheme'
import { checkAuthenticated } from './redux/actions/authActions'
import AdminProtectedRoutes from './components/common/adminProtectedRoutes'


function App({ state,checkAuthenticated }) {
  React.useEffect(()=>{
    checkAuthenticated()
  },[])
  return (
    <div className="App">
      <ThemeProvider theme={custometheme}>
        <Navbar>
          <Container>
            <Switch>
              <AdminProtectedRoutes path="/addbook" component={AddBooks} />
              <Route path='/' component={state.user&& state.user.isAdmin?AGGridAdmin:AGGrid}/>
            </Switch>
          </Container>
        </Navbar>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps,{checkAuthenticated})(App);
