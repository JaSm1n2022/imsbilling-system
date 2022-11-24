import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withStyles, makeStyles } from '@mui/styles';

import {  purple } from '@mui/material/colors';
import * as actions from '../../store/actions/index';
import { Button, Grid, Paper, Typography } from '@mui/material';

import RegularTextField from '../../Common/components/TextField/RegularTextField';
import { supabaseClient } from "../../config/SupabaseClient";
import TOAST from '../../modules/toastManager';

const ColorButton = withStyles((theme) => ({
    root: {
        fontSize: 16,
        width: 200,
        color: purple[500],
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: 1,
    },
}));



const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signInWithOtp({ email });
      
      if (error) throw error;
     TOAST.ok('Please check your email');
    } catch (error) {
        console.log('[error login]',error.toString());
     TOAST.error('Failed to sign in',error.toString());
    } finally {
      const user = supabaseClient.auth.user();
      setLoading(false);
      if (user) {
        console.log('user->>>', user)
      }
    }
  };
const inputHandler = ({target}) => {
    console.log('target',target.value);
    setEmail(target.value);
}
    return (
        <React.Fragment>
            <Grid container>
             
                  
                  
              
                <Paper  elevation={0} direction="column" style={{ width: '100%', height: 500 }}>
                    <div align="center">
                        <Grid container >

                            <Grid item xs={12}>
                                <Typography variant="h4">Sign in to IMS Billing System</Typography>
                                <Typography variant="body">via Magic Link email</Typography>
                            </Grid>
                            <Grid item xs={12} style={{align:'center',paddingTop:8,paddingBottom:8,paddingLeft:4,paddingRight:4}}>
                            <div align="center">
                            <Paper elevation={1} direction="row"  style={{width:'500px',marginTop:12,paddingTop:12,paddingBottom:8,paddingLeft:4,paddingRight:4}}>
                            <div style={{paddingBottom:10}}>
                            <RegularTextField name={'email'}  value={email} placeholder={'Email'} onChange={inputHandler}/>
                            </div>
                            <div style={{display:'none'}}>
                            <RegularTextField placeholder={'Password'}/>    
                            </div>
                            <div style={{display:'inline',gap:10}}>
                            <ColorButton variant="contained" color="primary" className={classes.margin} onClick={() => handleLogin()}>
                                    SEND MAGIC LINK
                                </ColorButton>
                               {/*
                                <ColorButtonLink variant="outlined" color="secondary" className={classes.margin}>
                                    RESET PASSWORD
                                </ColorButtonLink>
                               */}
                              </div>  
                                </Paper>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>

            </Grid>
        </React.Fragment>
    );


}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);