import React from "react";
import { useTranslation } from "react-i18next";
import { WidgetLoadingStatus } from "./types/types";
import styles from "./Widget.module.scss";

interface SomeConvenientWidgetProps {
  loadingStatus: WidgetLoadingStatus;
}

export const SomeConvenientWidget: React.FC<SomeConvenientWidgetProps> = ({
  loadingStatus,
}) => {

  const isLoading =
    loadingStatus !== WidgetLoadingStatus.SuccessLoading &&
    loadingStatus !== WidgetLoadingStatus.ErrorLoading;

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.widget}>
        {isLoading && <div className={styles.loader} />}
        <div>{t(`widget.${loadingStatus}`)}</div>
      </div>
    </div>
  );
};
