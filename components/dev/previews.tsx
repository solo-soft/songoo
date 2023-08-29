import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";

const ComponentPreviews = () => {
    return (
      <Previews palette={<PaletteTree />}>
        <ComponentPreview path="/UserDashboard">
          <Dashboard />
        </ComponentPreview>
      </Previews>
    );
};

export default ComponentPreviews;
