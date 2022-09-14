import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Router from "next/router";
import styles from "../styles/Home.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { parseCookies } from "nookies";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "react-datepicker/dist/react-datepicker.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "8rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#16d5ff",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#16d5ff",
    "&:hover": {
      backgroundColor: "#16b1ff",
    },
  },
}));

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClick2 = () => {
    setOpen2(true);
  };
  const handleClick3 = () => {
    setOpen3(true);
  };
  const handleClick4 = () => {
    setOpen4(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };
  const classes = useStyles();

  const [dob, setDob] = React.useState(new Date());

  const handleChangeDOB = (newValue) => {
    setDob(newValue);
  };

  const [data, setData] = React.useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    company: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    if (
      data.email.includes(".") &&
      data.email.includes("@") &&
      data.fName.length > 2 &&
      data.lName.length > 1 &&
      data.password.length > 6 &&
      data.address.length > 6 &&
      data.company.length > 0
    ) {

      const res = await fetch(`http://localhost:3000/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          password: data.password,
          dob: dob,
          address: data.address,
          company: data.company,
        }),
      });

      const res2 = await res.json();
      console.log(res2);
      if (res2.error == "User Exists") {
        handleClick3();
      }
      if (res2.error == "Invalid Input") {
        handleClick();
      }
      if (res2.message) {
        handleClick4();
        setTimeout(() => {
          Router.push("/");
        }, 3000);
      }
    } else {
      handleClick();
    }
  };

  const handleChange = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  React.useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div data-aos="fade-right" className={styles.tokenSale}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fName"
                  onChange={(e) => handleChange(e)}
                  value={data.fName}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lName"
                  onChange={(e) => handleChange(e)}
                  value={data.lName}
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  onChange={(e) => handleChange(e)}
                  value={data.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password (More than 6 Characters)"
                  type="password"
                  id="password"
                  onChange={(e) => handleChange(e)}
                  value={data.password}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={data.company}
                  label="Company Name"
                  name="company"
                  id="company"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={data.address}
                  label="Address"
                  name="address"
                  id="address"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    fullWidth
                    label="DOB"
                    inputFormat="dd/MM/yyyy"
                    value={dob}
                    onChange={handleChangeDOB}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit(e)}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Invalid Input
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            OTP Sent!
          </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            User Already Exists!
          </Alert>
        </Snackbar>
        <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            You have been Signed Up!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { token, email } = parseCookies(ctx);

  if (!token) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }
}
