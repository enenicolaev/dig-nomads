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
const FINAL_LOADING_STATUS: FinalLoading = WidgetLoadingStatus.ErrorLoading;

const loadingSteps: ProgressLoading[] = [
  WidgetLoadingStatus.FirstStep,
  WidgetLoadingStatus.SecondStep,
  WidgetLoadingStatus.ThirdStep,
];

interface SomeConvenientWidgetProps {
  loadingStatus: WidgetLoadingStatus;
  finalLoadingStatus: FinalLoading
}

export const SomeConvenientWidget: React.FC<SomeConvenientWidgetProps> = ({
  loadingStatus,
}) => {
  const [loadingStep, setLoadingStep] =
    useState<WidgetLoadingStatus>(loadingStatus);

  const loadingStepRef = useRef<WidgetLoadingStatus>(loadingStatus);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (
      loadingStatus !== WidgetLoadingStatus.SuccessLoading &&
      loadingStatus !== WidgetLoadingStatus.ErrorLoading
    )
      intervalRef.current = setInterval(() => {
        const currentStep = loadingSteps.findIndex(
          (step) => step === loadingStepRef.current
        );
        console.log({ currentStep, loadingStep: loadingStepRef.current });

        if (currentStep === loadingSteps.length - 1) {
          loadingStepRef.current = FINAL_LOADING_STATUS;
          setLoadingStep(FINAL_LOADING_STATUS);
          clearInterval(Number(intervalRef?.current));

          return;
        }
        if (currentStep > -1) {
          const newStep = loadingSteps[currentStep + 1];
          loadingStepRef.current = newStep;
          setLoadingStep(newStep);
        }
      }, LOADING_STEP_TIME);
  }, []);

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.widget}>
        <div className={styles.loader} />
        <div>{t(`widget.${loadingStep}`)}</div>
      </div>
    </div>
  );
};
