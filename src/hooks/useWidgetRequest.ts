import { useState, useEffect, useRef } from "react";
import { WidgetLoadingStatus } from "../Widget/types/types";

type FinalLoading =
  | WidgetLoadingStatus.SuccessLoading
  | WidgetLoadingStatus.ErrorLoading;
type ProgressLoading =
  | WidgetLoadingStatus.FirstStep
  | WidgetLoadingStatus.SecondStep
  | WidgetLoadingStatus.ThirdStep;

const LOADING_STEP_TIME = 2000;
const LOADING_TIMEOUT = 10000;

const loadingSteps: ProgressLoading[] = [
  WidgetLoadingStatus.FirstStep,
  WidgetLoadingStatus.SecondStep,
  WidgetLoadingStatus.ThirdStep,
];

interface useWidgetRequestParams {
  loadingStatus: WidgetLoadingStatus;
  finalLoadingStatus: FinalLoading;
}

export const useWidgetRequest = ({
  loadingStatus,
  finalLoadingStatus,
}: useWidgetRequestParams): WidgetLoadingStatus => {
  const [loadingStep, setLoadingStep] =
    useState<WidgetLoadingStatus>(loadingStatus);

  const loadingStepRef = useRef<WidgetLoadingStatus>(loadingStatus);
  const intervalRef = useRef<NodeJS.Timeout>();
  const requestTime = useRef(0);

  const isLoading =
    loadingStatus !== WidgetLoadingStatus.SuccessLoading &&
    loadingStatus !== WidgetLoadingStatus.ErrorLoading;

  const updateState = (step: WidgetLoadingStatus) => {
    loadingStepRef.current = step;
    setLoadingStep(step);
  };

  useEffect(() => {
    if (isLoading)
      intervalRef.current = setInterval(() => {
        requestTime.current += LOADING_STEP_TIME;

        if (requestTime.current >= LOADING_TIMEOUT) {
          updateState(WidgetLoadingStatus.ErrorLoading);
          clearInterval(Number(intervalRef?.current));

          return;
        }

        const currentStep = loadingSteps.findIndex(
          (step) => step === loadingStepRef.current
        );

        if (currentStep === loadingSteps.length - 1) {
          updateState(finalLoadingStatus);
          clearInterval(Number(intervalRef?.current));

          return;
        }
        if (currentStep > -1) {
          const nextStep = loadingSteps[currentStep + 1];
          updateState(nextStep);
        }
      }, LOADING_STEP_TIME);
  }, [isLoading]);

  return loadingStep;
};
