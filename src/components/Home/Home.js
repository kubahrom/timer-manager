import { Container, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
  },
}));

const Home = () => {
  const classes = useStyles();
  let d = new Date(2021, 2, 17, 13, 0, 0);
  d.setMonth(2);
  //let t = d.getTime();
  const t = new Date();
  console.log((t - d) / 1000 / 60);
  return (
    <Container
      maxWidth="md"
      style={{ padding: 8 }}
      className={classes.container}
    >
      <h1>Home</h1>
      {d.toString()}
      <br />
      {d.getHours()}
      <br />
      {d.getMinutes()}
      <br />
      {d.getTime()}
      <br />
    </Container>
  );
};

export default Home;
