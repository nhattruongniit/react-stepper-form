import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1024,
    maxWidth: '100%',
    margin: '0 auto'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: 34,
    textAlign: 'center'
  },
  content: {
    width: '100%'
  },
  autoComplete: {
    
  },
  navbar: {
    textAlign: 'center',
    '& a': {
      textDecoration: 'none'
    },
    '& a.active button': {
      color: '#3f51b5'
    },
    '& a button': {
      color: '#000'
    }
  }
}));

export default useStyles;