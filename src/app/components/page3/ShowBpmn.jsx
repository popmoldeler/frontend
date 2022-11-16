import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import BpmnJS from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./ShowBpmn.css";

export default class ReactBpmn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { url, diagramXML } = this.props;

    const container = this.containerRef.current;

    this.bpmnViewer = new BpmnJS({
      container,
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
      propertiesPanel: {
        parent: "#properties",
      },
    });

    this.bpmnViewer.on("import.done", (event) => {
      const { error, warnings } = event;

      if (error) {
        return this.handleError(error);
      }

      this.bpmnViewer.get("canvas").zoom("fit-viewport");

      return this.handleShown(warnings);
    });

    if (url) {
      return this.fetchDiagram(url);
    }

    if (diagramXML) {
      return this.displayDiagram(diagramXML);
    }
  }

  componentWillUnmount() {
    this.bpmnViewer.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;

    if (props.url !== prevProps.url) {
      return this.fetchDiagram(props.url);
    }

    const currentXML = props.diagramXML || state.diagramXML;

    const previousXML = prevProps.diagramXML || prevState.diagramXML;

    if (currentXML && currentXML !== previousXML) {
      return this.displayDiagram(currentXML);
    }
  }

  displayDiagram(diagramXML) {
    this.bpmnViewer.importXML(diagramXML);
  }

  fetchDiagram(url) {
    this.handleLoading();

    fetch(url)
      .then((response) => response.text())
      .then((text) => this.setState({ diagramXML: text }))
      .catch((err) => this.handleError(err));
  }

  handleLoading() {
    const { onLoading } = this.props;

    if (onLoading) {
      onLoading();
    }
  }

  handleError(err) {
    const { onError } = this.props;

    if (onError) {
      onError(err);
    }
  }

  handleShown(warnings) {
    const { onShown } = this.props;

    if (onShown) {
      onShown(warnings);
    }
  }

  render() {
    return (
      <>
        <Box
          sx={{ margin: 1, width: "90%", height: "91%" }}
          ref={this.containerRef}
        >
          {/* <div
          className="react-bpmn-diagram-container"
          ref={this.containerRef}
        ></div> */}
          {/* <div ref={this.containerRef}></div> */}
        </Box>
        <div id="properties"></div>
        <ul class="buttons">
          <li>
            <a id="js-download-diagram" href title="download BPMN diagram">
              BPMN diagram
            </a>
          </li>
          <li>
            <a id="js-download-svg" href title="download as SVG image">
              SVG image
            </a>
          </li>
        </ul>
      </>
    );
  }
}
