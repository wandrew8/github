import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    likes: {
        fontSize: "0.8rem",
    },
    header: {
        textAlign: "left",
    },
    icon: {
        textAlign: "left",
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
      textAlign: "left"
    },
  }));

export default function RepoCard(props) {
    const classes = useStyles();    
    const { data } = props;
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.header}
                avatar={
                    <Avatar 
                        aria-label="github user" 
                        src={data.owner.avatar_url}
                        className={classes.avatar}/>                    
                }
                title={`Github User: ${data.owner.login}`}
                subheader={moment(data.updated_at).format('MMMM Do YYYY')}
                />
                <Typography component="h2">{data.name}</Typography>
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.description}
                </Typography>
                <Typography component="p"></Typography>

                </CardContent>
                <IconButton 
                    className={classes.icon}
                    aria-label="share">
                    <a href={data.html_url}>
                        <GitHubIcon />
                    </a>
                </IconButton>
        </Card>
      </Grid>


    )
}
