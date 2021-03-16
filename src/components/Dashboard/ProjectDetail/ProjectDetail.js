import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 20,
    margin: 8,
    paddingLeft: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
    padding: 24,
  },
}));

const ProjectDetail = ({ project }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBtnClick = () => {
    history.push(`/project/${project.id}`);
  };
  return (
    <Grid item sm={6} xs={12}>
      <Card className={classes.card} elevation={5}>
        <CardHeader
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={
            <Typography variant="h5" component="h3">
              {project.name}
            </Typography>
          }
        />
        <CardContent>Lorem ipsum dolor sit amet consectetur.</CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleBtnClick()}
          >
            Open project
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default ProjectDetail;
