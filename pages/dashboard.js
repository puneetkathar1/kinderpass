import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { parseCookies } from "nookies";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Table from "../components/Table/Table.js";
import Card from "../components/cards/Card.js";
import CardHeader from "../components/cards/CardHeader.js";
import CardBody from "../components/cards/CardBody.js";
import styles from "../assets/jss/dashboardStyle";
import { makeStyles } from "@material-ui/core/styles";
import router from "next/router";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "react-datepicker/dist/react-datepicker.css";


export default function SignUp({ email, res4 }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  //Store table data
  const tableData2 = [];

  //Pushing data
  res4.map((data, index) => {
    tableData2.push([
      data.empId,
      data.fName,
      data.lName,
      data.email,
      data.address,
      data.dob,
      data.mobile,
      data.city,
      <>
        {/* Edit Button */}
        <button
          key={index}
          onClick={(e) => {
            setOpen(true);
            //Setting up values of selected row into dialog box
            const newdata = { ...data };
            newdata['empId'] = data.empId;
            newdata['fName'] = data.fName;
            newdata['lName'] = data.lName;
            newdata['email'] = data.email;
            newdata['address'] = data.address;
            setDob(data.dob);
            newdata['mobile'] = data.mobile;
            newdata['city'] = data.city;
            setData(newdata);

          }}
          style={{
            backgroundColor: "green",
            border: "none",
            color: "white",
            padding: "0.4rem",
            borderRadius: "0.5rem",
          }}
        >
          <EditIcon />
        </button>
        {/* Delete Button */}
        <button
          key={index}
          onClick={(event) => {
            //Updating empId of selected row to delete
            const newdata = { ...data };
            newdata['empId'] = data.empId;
            deleteHandler(event);
          }}
          style={{
            backgroundColor: "red",
            border: "none",
            color: "white",
            padding: "0.4rem",
            borderRadius: "0.5rem",
            marginLeft: "1rem",
          }}
        >
          <DeleteIcon />
        </button>
      </>,
    ]);
  });

  //DOB
  const [dob, setDob] = React.useState(new Date());

  const handleChangeDOB = (newValue) => {
    setDob(newValue);
  };

  //Rest of the data
  const [data, setData] = React.useState({
    empId: "",
    fName: "",
    lName: "",
    email: "",
    address: "",
    dob: dob,
    mobile: "",
    city: "",
  });

  const handleChange = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  //Dialog Handler
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  //Fetch API for add/update employee
  const updateEmployee = async (e) => {
    e.preventDefault();
    const result = await fetch(`http://localhost:3000/api/updateEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        managerEmail: email,
        empId: data.empId,
        fName: data.fName,
        lName: data.lName,
        email: data.email,
        address: data.address,
        dob: dob,
        mobile: data.mobile,
        city: data.city,
      }),
    });
    const result2 = await result.json();
    if (result2) {
      router.reload();
    }
  };

  //Calling API for delete employee
  const deleteHandler = async (event) => {
    event.preventDefault();
    const result = await fetch(`http://localhost:3000/api/deleteEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        managerEmail: email,
        empId: data.empId
      }),
    });
    const result2 = await result.json();
    if (result2) {
      router.reload();
    }
  };

  return (
    <div style={{ marginTop: "8rem" }}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees</h4>
              <p className={classes.cardCategoryWhite}>List of employees</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  "Emp Id",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Address",
                  "DOB",
                  "Mobile",
                  "City",
                  "Actions",
                ]}
                tableData={tableData2}
              />
            </CardBody>
          </Card>
        </GridItem>
        <Button
          onClick={(e) => {
            const newdata = { ...data };
            newdata['empId'] = Number(res4[res4.length - 1].empId) + 1
            setData(newdata)
            setOpen(true);
          }}
          style={{ margin: "auto", display: "flex" }}
        >
          Add Employee +{" "}
        </Button>

        {/* Popup */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
          <DialogContent>
            <>
            <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="empId"
                  label="Emp ID"
                  type="text"
                  fullWidth
                  disabled
                  value={data.empId}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="fName"
                  label="First Name"
                  type="text"
                  fullWidth
                  value={data.fName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="lName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  value={data.lName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={data.email}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="address"
                  label="Address"
                  type="text"
                  fullWidth
                  value={data.address}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="mobile"
                  label="Mobile"
                  type="text"
                  fullWidth
                  value={data.mobile}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="city"
                  label="City"
                  type="text"
                  fullWidth
                  value={data.city}
                  onChange={(e) => handleChange(e)}
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
            </>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                updateEmployee(e);
              }}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </GridContainer>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { clientEmail } = parseCookies(ctx);
  const email = clientEmail;
  if (!clientEmail) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    const res3 = await fetch(`http://localhost:3000/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const res4 = await res3.json();
    return {
      props: { email, res4 },
    };
  }
}
