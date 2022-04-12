import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { WidgetLoadingStatus } from "./types/types";
import styles from "./Widget.module.scss";

type FinalLoading =
  | WidgetLoadingStatus.SuccessLoading
  | WidgetLoadingStatus.ErrorLoading;
type ProgressLoading =
  | WidgetLoadingStatus.FirstStep
  | WidgetLoadingStatus.SecondStep
  | WidgetLoadingStatus.ThirdStep;

const LOADING_STEP_TIME = 2000;
const LOADING_TIMEOUT = 3000;


const loadingSteps: ProgressLoading[] = [
  WidgetLoadingStatus.FirstStep,
  WidgetLoadingStatus.SecondStep,
  WidgetLoadingStatus.ThirdStep,
];

interface SomeConvenientWidgetProps {
  loadingStatus: WidgetLoadingStatus;
  finalLoadingStatus: FinalLoading;
}

export const SomeConvenientWidget: React.FC<SomeConvenientWidgetProps> = ({
  loadingStatus,
  finalLoadingStatus,
}) => {
  const [loadingStep, setLoadingStep] =
    useState<WidgetLoadingStatus>(loadingStatus);

  const loadingStepRef = useRef<WidgetLoadingStatus>(loadingStatus);
  const intervalRef = useRef<NodeJS.Timeout>();
  const requestTime = useRef(0);

  const updateState = (step: WidgetLoadingStatus) => {
    loadingStepRef.current = step;
    setLoadingStep(step);
  };

  const isLoading =
    loadingStatus !== WidgetLoadingStatus.SuccessLoading &&
    loadingStatus !== WidgetLoadingStatus.ErrorLoading;

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

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.widget}>
        {isLoading && <div className={styles.loader} />}
        <div>{t(`widget.${loadingStep}`)}</div>
      </div>
    </div>
  );
};
