import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NewsCard = (props) => {

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
        <Typography variant="h6" component="div">
          {props.item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Save</Button>
        <Button size="small" href={props.item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard;
