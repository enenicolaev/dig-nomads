import React from "react";
import { useWidgetRequest } from "./hooks/useWidgetRequest";
import { WidgetLoadingStatus } from "./Widget/types/types";
import { SomeConvenientWidget } from "./Widget/Widget";

function App() {
  const loadingStatus = useWidgetRequest({
    loadingStatus: WidgetLoadingStatus.FirstStep,
    finalLoadingStatus: WidgetLoadingStatus.SuccessLoading,
  });
  return (
    <SomeConvenientWidget
      loadingStatus={loadingStatus}
    />
  );
}

export default App;
