import React from "react";
import { WidgetLoadingStatus } from "./Widget/types/types";
import { SomeConvenientWidget } from "./Widget/Widget";

function App() {

  return (
    <SomeConvenientWidget
      loadingStatus={WidgetLoadingStatus.FirstStep}
      // mock server response
      finalLoadingStatus={WidgetLoadingStatus.SuccessLoading}
    />
  );
}

export default App;
