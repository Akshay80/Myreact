import React , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../config/fire';
import { useForm } from "react-hook-form";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../Login.css';
import firebase from 'firebase';

var auth = firebase.auth();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Akshay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" style={{backgroundColor:'limegreen'}} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors:{
    color: 'red',
    fontSize:'small',
    margin: 7,
  },
  erroring:{
    color: 'red',
    fontSize:'small',
  },
  buton: {
    textTransform:'none',
    marginTop:-10,
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState('');
  const [password, setPasswords] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

function login() 
{
  fire.auth().signInWithEmailAndPassword(email, password)
  .then((u) =>
    {
      console.log(u);
    }
  )  
  }

function resetPass(emails)
{
  auth.sendPasswordResetEmail(emails).then((u) =>{
  handleClick();
  handleClose1();
  handleClose(); 
  console.log(u);
  })
  .catch(function(error) {
    console.log(error.message);
  });
}

const handleClick = () => {
  setOpen1(true);
};

const handleClose1 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen1(false);
};

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(login)}>
            <TextField
              variant="outlined"
              margin="normal"
              type="email"
              fullWidth
              id="email"
              error={!!errors.email}
              inputRef={register({ required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={email}
              onChange={(event) => {setEmail(event.target.value)}}
              autoFocus
            />
            <p className={classes.errors}>{errors.email && "Invalid email address"}</p>
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              id="password"
              label="Password"
              error={!!errors.password}
              inputRef={register({ required: true, minLength:6})}
              name="password"
              autoComplete="password"
              defaultValue={password}
              onChange={(event) => {setPasswords(event.target.value)}}
              autoFocus
            />
            <p className={classes.errors}>{errors.password && errors.password.type === "required" && "Invalid Password"}</p>
  <p className={classes.errors}>{errors.password && errors.password.type === "minLength" && "Password must contain atleast 6 characters!"}</p>
             <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
              <Button className={classes.buton} onClick={handleClickOpen} color="primary">
                Forgot password?
              </Button>
              </Grid>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className="dialog-header">
          Reset your password
          </DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog-content">
          Enter your user account's verified email address and 
          we will send you a password reset link.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="emails"
            label="Email Address"
            id="emails"
            defaultValue={emails}
            error={!!errors.emails}
            onChange={(event) => {setEmails(event.target.value)}}
            inputRef={register({ required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            type="email"
            fullWidth
          />
          <p className={classes.erroring}>{errors.emails && "Invalid email address"}</p>
        </DialogContent>
        <DialogActions >
          <Button style={{textTransform:'none'}} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button style={{textTransform:'none'}} type="submit" onClick={handleSubmit(resetPass(emails))} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
            
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" variant="filled">
           Email sent
        </Alert>
      </Snackbar>



              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}