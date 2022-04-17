import React from "react";
import logo from "../logo-bpg.svg";
import { Grid, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    containerStyle: {
      padding: 16,
    },
    btnStyle: {
      color: "#27ae60",
    },
    buttonsContainer: {
      textAlign: "right",
    },
    nameSpace: {
      margin: "0 0 0 12px",
    },
    photo: {
      height: "80px",
      width: "80px",
    }
  })
);

export const NavbarUp = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid
        container
        className={classes.containerStyle}
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={1} container alignItems="center">
          <Grid item xs={1}>
            <img src={logo} className={classes.photo}/>
          </Grid>
          <Grid item>
            <h2 className={classes.nameSpace}>MEDANA CLINIC</h2>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.buttonsContainer}>
          <Button
            variant="outlined"
            color="primary"
            href="/schedule"
            className={classes.btnStyle}
          >
            Расписание
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            color="primary"
            href="/print/documents"
            className={classes.btnStyle}
          >
            Документы
          </Button>
          &nbsp;&nbsp;
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
