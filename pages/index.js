import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Router from "next/router";
import styles from "../styles/Home.module.css";
import { parseCookies } from "nookies";
import Aos from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import Cookies2 from "cookies";
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
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const [state, setState] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.email.includes(".com") &&
      data.email.includes("@") &&
      data.password.length > 6
    ) {
      const res = await fetch(
        `https://kinderpass-assignment.vercel.app/api/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const res2 = await res.json();
      if (res2.error == "No User Found") {
        handleClick3();
      }
      if (res2.error == "Invalid Input") {
        handleClick();
      }
      if (res2.error == "Approval Pending") {
        handleClick4();
      }
      if (res2.message) {
        handleClick2();
        Cookies.set("clientEmail", res2.message, { expires: 7 });
        setTimeout(() => {
          Router.push("/dashboard");
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
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  disabled={state}
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
                  label="Password"
                  type="password"
                  id="password"
                  disabled={state}
                  onChange={(e) => handleChange(e)}
                  value={data.password}
                  autoComplete="current-password"
                />
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
              Login
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Invalid Input
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          You have been LoggedIn! Redirecting to Profile Page
        </Alert>
      </Snackbar>
      <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          No User Found!
        </Alert>
      </Snackbar>
      <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Approval Pending. Try Later
        </Alert>
      </Snackbar>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { token, email } = parseCookies(ctx);
  const { req, res } = ctx;

  if (!token) {
    const cookies = new Cookies2(req, res);
    cookies.set("email");
    cookies.set("token");
    cookies.set("clientEmail");
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
