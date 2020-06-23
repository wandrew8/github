import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function UserCard(props) {
  const classes = useStyles();
  const {data} = props;
  return (
    <Grid item lg={4} md={6} sm={6} xs={12}>
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {data.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.login}
          </Typography>
          <hr/>
          <Typography variant="subtitle1" color="textSecondary">
            User Since {moment(data.created_at).format('MMMM Do YYYY')}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {data.bio}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={data.avatar_url}
        title={data.name}
      />
    </Card>
    </Grid>
  );
}