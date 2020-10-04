import React , {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useForm } from "react-hook-form";
import fire from '../config/fire';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import 'font-awesome/css/font-awesome.min.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{marginTop:"5%!important"}}>
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  erroring:{
    color: 'red',
    fontSize:'small',
    margin: 7,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();
  const [firstName, setFn] = useState();
  const [lastName, setLn] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    setLoading(true);
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then((u) =>
    {
      console.log(u);
      handleClick();
      setLoading(false);
      setTimeout(() => {
        window.location.href="/login";  
      }, 3000);
    })
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                // required={true}
                fullWidth
                id="firstName"
                error={!!errors.firstName}
                inputRef={register({ maxLength: 50 })}
                defaultValue={firstName}
                onChange={(event) => {setFn(event.target.value)}}
                label="First Name (Optional)"
                autoFocus
              />
              <p className={classes.erroring}>{errors.firstName && "Enter first name!"}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                // required={true}
                fullWidth
                id="lastName"
                inputRef={register({  maxLength: 50 })}
                label="Last Name (Optional)"
                name="lastName"
                error={!!errors.lastName}
                defaultValue={lastName}
                onChange={(event) => {setLn(event.target.value)}}
                autoComplete="lname"
              />
              <p className={classes.erroring}>{errors.lastName && "Enter last name!"}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required={true}
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                defaultValue={email}
                error={!!errors.email}
                onChange={(event) =>{setEmail(event.target.value)}}
                inputRef={register({ required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                autoComplete="email"
              />
               <p className={classes.erroring}>{errors.email && "Invalid email address"}</p>
              <TextField
              variant="outlined"
              style={{marginTop:15}}
              // required
              type="password"
              fullWidth
              id="password"
              error={!!errors.password}
              label="Password"
              inputRef={register({ required: true, minLength:6})}
              name="password"
              autoComplete="password"
              defaultValue={password}
              onChange={(event) => {setPassword(event.target.value)}}
              autoFocus
            />
             <p className={classes.erroring}>{errors.password && errors.password.type === "required" && "Invalid Password"}</p>
  <p className={classes.erroring}>{errors.password && errors.password.type === "minLength" && "Password must contain atleast 6 characters!"}</p>
            </Grid>
          </Grid>
          {!loading && (<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>)}
          {loading && (<Button variant="contained" className={classes.submit} fullWidth disabled>
          <i class="fa fa-refresh fa-spin" style={{fontSize:"18px"}}></i>{' '}
          <span style={{color:'gray', marginLeft:'7px'}}> Loading... </span>
          </Button>)}

          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          Your Data is Saved Successfully
        </Alert>
      </Snackbar>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={0} mb={3}>
        <Copyright />
      </Box>
      </Grid>
    </Grid>
  );
}