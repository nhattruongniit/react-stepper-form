import React from 'react';

// material core
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// styles
import useStyles from './styles';

function getSteps() {
  return ['Account', 'Personal', 'Payment', 'Confirm'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Account';
    case 1:
      return 'Personal';
    case 2:
      return 'Payment';
    case 3:
      return 'Confirm';
    default:
      return 'Unknown stepIndex';
  }
}

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" className={classes.title}>Register Your Account</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <div>
              {activeStep === steps.length ? (
                <>
                  <Typography className={classes.instructions}>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </>
              ) : (
                <>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <br/><br/><br/>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
