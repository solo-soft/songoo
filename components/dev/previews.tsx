import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Home from "../../pages";

const ComponentPreviews = () => {
    return (
      <Previews palette={<PaletteTree />}>
        <ComponentPreview path="/Panels">
          <Dashboard />
        </ComponentPreview>
        <ComponentPreview path="/Home">
          <Home />
        </ComponentPreview>
      </Previews>
    );
};

export default ComponentPreviews;
