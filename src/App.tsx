// default styling
import "reactflow/dist/style.css";
// or if you just want basic styles
import "reactflow/dist/base.css";
import "@elastic/eui/dist/eui_theme_light.css";

import { FC, useEffect, useState } from "react";

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiPage,
  EuiPageSection,
  EuiProvider,
} from "@elastic/eui";

import Fetcher from "./Fetcher";
import GlobalMenu from "./components/GlobalMenu/GlobalMenu";

const App: FC<{}> = () => {
  return (
    <EuiProvider colorMode="light">
      <GlobalMenu />
      <EuiPage>
        <EuiPageSection paddingSize="none">
          <Fetcher />
        </EuiPageSection>
      </EuiPage>
    </EuiProvider>
  );
};

export default App;
