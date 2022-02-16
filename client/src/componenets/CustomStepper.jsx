import React, { useState } from "react";
import PropTypes from "prop-types";
import Check from "@mui/icons-material/Check";

import {
  Button,
  Container,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";

import { Box } from "@mui/system";

// stepper config
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

function CustomStepper({ data }) {
  const { activeStep, setActiveStep } = data;

  //Stepper
  const steps = [
    {
      label: "Token information",
    },
    {
      label: "Sales information limit",
    },
    {
      label: "Per wallet allocation limit",
    },
    {
      label: "Pancakeswap listing",
    },
    {
      label: "Additional information",
    },
  ];

  const handleNext = () => {
    if (activeStep <= 5) {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <>
      <Container maxWidth="lg">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label) => (
            <Step key={label.label}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                {label.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Container maxWidth="md">
          <Box mt="100px" sx={{ display: "flex ", alignItems: "center" }}>
            {activeStep === 0 ? (
              <>
                <Button disabled onClick={handleBack}>
                  Back
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleBack}>Back</Button>
              </>
            )}

            <Box width="90%"></Box>

            {activeStep === 5 ? (
              <>
                <Button disabled onClick={handleNext}>
                  Next
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleNext}> Next</Button>
              </>
            )}
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default CustomStepper;
