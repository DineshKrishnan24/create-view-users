import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Delete, Edit, ArrowBackRounded } from "@material-ui/icons";
import { deleteUser } from "../store/actions";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    width: "auto",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  header: {
    fontWeight: "600",
    fontFamily: "Georgia, serif",
  },
});

export default function ViewPage() {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <Grid container style={{ alignItems: "center" }} spacing={3}>
        <Grid item xs={6}>
          <Typography className={classes.header} variant="h4" component="h2">
            All User Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Link style={{ textDecoration: "none", float: "right" }} to="/">
            <Button size="small" variant="contained" color="primary">
              <ArrowBackRounded /> Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.root}>
        {selector.map((user) => {
          return (
            <Grid item xs={6} sm={3} key={user.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={user.userName}
                    height="140"
                    image={user.profilePic}
                    title={user.userName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.userName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      User Name : {user.userName}
                      <br></br>
                      Contact Number: {user.contactNumber}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(deleteUser(user.id))}
                  >
                    <Delete /> Delete
                  </Button>
                  <Link
                    className={classes.link}
                    style={{ textDecoration: "none" }}
                    to={`/user/${user.id}`}
                  >
                    <Button size="small" variant="contained" color="primary">
                      <Edit /> Edit
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
