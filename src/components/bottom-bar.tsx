import { inject, observer } from "mobx-react";
import React from "react";
import { BaseComponent, IBaseProps } from "./base";
import CCLogo from "../assets/cc-logo.svg";
import CCLogoSmall from "../assets/cc-logo-small.svg";
import screenfull from "screenfull";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import PauseIcon from "../assets/pause.svg";
import StartIcon from "../assets/start.svg";
import ReloadIcon from "../assets/reload.svg";
import RestartIcon from "../assets/restart.svg";
import HorizontalHandle from "../assets/slider-horizontal.svg";
import FireLineIcon from "../assets/fire-line.svg";
import FireLineHighlightIcon from "../assets/fire-line-highlight.svg";
import { TerrainSetupButton} from "./terrain-setup-button";
import { SparkButton } from "./spark-button";

import css from "./bottom-bar.scss";

interface IProps extends IBaseProps {}
interface IState {
  fullscreen: boolean;
}

const toggleFullscreen = () => {
  if (!screenfull) {
    return;
  }
  if (!screenfull.isFullscreen) {
    screenfull.request();
  } else {
    screenfull.exit();
  }
};

const windDirectionMarks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 90,
    label: "90"
  },
  {
    value: 180,
    label: "180"
  },
  {
    value: 270,
    label: "270"
  },
  {
    value: 360,
    label: "360"
  },
];

const windSpeedMarks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 10,
    label: "10"
  }
];

const moistureContentMarks = [
  {
    value: 0,
    label: "Low"
  },
  {
    value: 0.2,
    label: "High"
  }
];

@inject("stores")
@observer
export class BottomBar extends BaseComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }

  get fullscreenIconStyle() {
    return css.fullscreenIcon + (this.state.fullscreen ? ` ${css.fullscreen}` : "");
  }

  public componentDidMount() {
    if (screenfull && screenfull.enabled) {
      document.addEventListener(screenfull.raw.fullscreenchange, this.fullscreenChange);
    }
  }

  public componentWillUnmount() {
    if (screenfull && screenfull.enabled) {
      document.removeEventListener(screenfull.raw.fullscreenchange, this.fullscreenChange);
    }
  }

  public render() {
    const sim = this.stores.simulation;
    return (
      <div className={css.bottomBar}>
        <div className={css.leftContainer}>
          <CCLogo className={css.logo} />
          <CCLogoSmall className={css.logoSmall} />
        </div>
        <div className={css.mainContainer}>
          <div className={css.widgetGroup}>
            <TerrainSetupButton />
          </div>
          <div className={css.widgetGroup}>
            <div className={css.slider}>
              <div>Precipitation</div>
              <Slider
                classes={{thumb: css.thumb }}
                min={0}
                max={0.2}
                disabled={sim.simulationStarted}
                value={sim.moistureContent}
                step={0.01}
                marks={moistureContentMarks}
                onChange={this.handleMoistureContentChange}
                ThumbComponent={HorizontalHandle}
              />
            </div>
          </div>
          <div className={`${css.widgetGroup} ${css.placeSpark}`}>
            <SparkButton />
          </div>
          <div className={`${css.widgetGroup} ${css.reloadRestart}`}>
            <Button
              className={css.playbackButton}
              data-test="reload-button"
              onClick={this.handleReload}
              disableRipple={true}
            >
              <span><ReloadIcon/> Reload</span>
            </Button>
            <Button
              className={css.playbackButton}
              data-test="restart-button"
              onClick={this.handleRestart}
              disableRipple={true}
            >
              <span><RestartIcon/> Restart</span>
            </Button>
          </div>
          <div className={`${css.widgetGroup} ${css.startStop}`}>
            <Button
              onClick={sim.simulationRunning ? sim.stop : sim.start}
              disabled={!sim.ready}
              className={css.playbackButton}
              data-test="start-button"
              disableRipple={true}
            >
              { sim.simulationRunning ? <span><PauseIcon/> Stop</span> : <span><StartIcon /> Start</span> }
            </Button>
          </div>
          <div className={`${css.widgetGroup}`}>
            <Button
              onClick={this.handleFireLine}
              disabled={!sim.ready}
              className={css.fireLineButton}
              data-test="fire-line-button"
              disableRipple={true}
            >
              <span>
                <FireLineHighlightIcon className={css.fireLineHighlightSvg} />
                <FireLineIcon className={css.fireLineSvg} />
                <span className={css.fireLineText}>Fire Line</span>
              </span>
            </Button>
          </div>
          <div className={`${css.widgetGroup} ${css.helitack}`}>
            <Button
              onClick={this.handleHelitack}
              disabled={!sim.ready}
              className={css.helitackButton}
              data-test="helitack-button"
              disableRipple={true}
            >
              <span>Helitack</span>

            </Button>
          </div>
          {sim.time === 2 &&
            <div className={css.widgetGroup}>
              <div className={`${css.slider} ${css.windDirection}`}>
                <div>Wind Direction (° from North)</div>
                <Slider
                  classes={{ thumb: css.thumb }}
                  min={0}
                  max={360}
                  disabled={sim.simulationStarted}
                  value={sim.wind.direction}
                  step={1}
                  marks={windDirectionMarks}
                  onChange={this.handleWindDirectionChange}
                  ThumbComponent={HorizontalHandle}
                />
              </div>
            </div>
          }
          {sim.time === 2 &&
            <div className={css.widgetGroup}>
              <div className={css.slider}>
                <div>Wind Speed (mph)</div>
                <Slider
                  classes={{ thumb: css.thumb }}
                  min={0}
                  max={10}
                  disabled={sim.simulationStarted}
                  value={sim.wind.speed}
                  step={0.1}
                  marks={windSpeedMarks}
                  onChange={this.handleWindSpeedChange}
                  ThumbComponent={HorizontalHandle}
                />
              </div>
            </div>
          }
        </div>
        {/* This empty container is necessary so the spacing works correctly */}
        <div className={css.rightContainer}>
          {
            screenfull && screenfull.enabled &&
            <div className={this.fullscreenIconStyle} onClick={toggleFullscreen} title="Toggle Fullscreen" />
          }
        </div>
      </div>
    );
  }

  public fullscreenChange = () => {
    this.setState({ fullscreen: screenfull && screenfull.isFullscreen });
  }

  public handleRestart = () => {
    this.stores.simulation.restart();
  }

  public handleReload = () => {
    this.stores.simulation.reload();
  }

  public handleFireLine = () => {
    // TODO: handle fire line
    this.stores.simulation.reload();
  }
  public handleHelitack = () => {
    // TODO: handle Helitack
    this.stores.simulation.reload();
  }

  public handleWindDirectionChange = (event: any, value: number | number[]) => {
    this.stores.simulation.setWindDirection(value as number);
  }

  public handleWindSpeedChange = (event: any, value: number | number[]) => {
    this.stores.simulation.setWindSpeed(value as number);
  }

  public handleMoistureContentChange = (event: any, value: number | number[]) => {
    this.stores.simulation.setMoistureContent(value as number);
  }
}
