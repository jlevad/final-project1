import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const NewsCard = (props) => {

  const saveItem = (e) => {
    props.setSaved([...props.saved, e]);
    props.setIsSaved({ ...props.isSaved, [e.url]: true });
  };
  const unsaveItem = (e) => {
    props.setSaved(props.saved.filter((item) => item.url !== e.url));
    props.setIsSaved({ ...props.isSaved, [e.url]: false });
  };

  return (
    <Card className="m-2 md:m-4 flex flex-col justify-between">
      <div className="max-h-96">
        <img
          className="max-h-full max-w-full"
          src={props.item.urlToImage}
          alt={`${props.item.title}`}
        />
      </div>
      <CardContent>
        <Typography variant="subtitle2" component="div">
          {props.item.source.name}
        </Typography>
        <Typography variant="h6" component="div" color="primary">
          {props.item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2} >
          <Button
            color="warning"
            variant="contained"
            size="small"
            href={props.item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            News Page
          </Button>
          {props.isSaved[props.item.url] ? (
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => unsaveItem(props.item)}
            >
              Unsave
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => saveItem(props.item)}
            >
              Save
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  )
}

export default NewsCard;
