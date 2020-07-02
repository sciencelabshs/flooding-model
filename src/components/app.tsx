import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { View3d } from "./view-3d/view-3d";
import { BottomBar } from "./bottom-bar";
import Shutterbug from "shutterbug";
import { useCustomCursor } from "./use-custom-cursors";
import css from "./app.scss";

export const AppComponent = observer(function WrappedComponent() {
  useEffect(() => {
    Shutterbug.enable("." + css.app);
    return () => {
      Shutterbug.disable();
    };
  }, []);

  // This will setup document cursor based on various states of UI store (interactions).
  useCustomCursor();

  return (
    <div className={css.app}>
      <div className={`${css.mainContent}`}>
        <View3d />
      </div>
      <BottomBar />
    </div>
  );
});
