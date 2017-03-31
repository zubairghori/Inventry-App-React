import React, { Component,PropTypes } from 'react';
//import styles from './Login-css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as MUI from 'material-ui'
import AppTheme from '../../app-theme';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Help from 'material-ui/svg-icons/action/help';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Circle from 'material-ui/svg-icons/action/account-circle';
import './Login.css';
import USER from "../../images/user.png";
import Back from "../../images/01.jpg";
import {grey500} from 'material-ui/styles/colors';
import { AuthMiddleware } from '../../store'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signin: (credentials) => dispatch(AuthMiddleware.signin(credentials))
    };
}

class Login extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.handelSignin = this.handelSignin.bind(this);
  }

  componentWillReceiveProps(nextProps){
    setTimeout(()=> {
      if(this.props.isAuthenticated){
        console.log("Authenticated true in signup");
          this.context.router.push("/dashboard");
      }
    },0);
  }

  handelSignin() {
    this.props.signin(
      {
        "email":this.refs.email.getValue(),
        "password":this.refs.password.getValue()
      });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={AppTheme}>          
      <div className="Main-Container">
         <img className="class" src={Back}>
    </img>
        <div className="long-loginContainer">
          <img className="logo" src={USER} />
          
          <MUI.Paper className="long-paper">
            <br /><br />
            <h1 style={{textAlign:"center"}}>Member Login</h1>
            
            <form>
              <MUI.TextField
                ref="email"
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth={true}
              />
              <MUI.TextField
                ref="password"
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
              />

              <div>
                <MUI.Checkbox
                  label="Remember me"
                  className="long-checkRemember"
                  labelStyle={{color: grey500}}
                  iconStyle={{color: grey500,borderColor: grey500, fill: grey500}}
                />
                
                  <MUI.RaisedButton label="Login"
                                primary={true}
                                className="long-loginBtn"
                                onTouchTap={this.handelSignin}/>
              </div>
            </form>
          </MUI.Paper>

          <div className="long-buttonsDiv">
         <p style={{fontWeight:"bold"}}>Welcome To Our Inventory Management System </p>
            
          </div>

          
        </div>
      </div>
      </MuiThemeProvider>      
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
