import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import BpmnJS from "bpmn-js/lib/Modeler";
import FileSaver from "file-saver";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { unstable_useBlocker as useBlocker } from "react-router-dom";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./PopDetailedViewBpmn.css";
import DialogShowBusinessAlliances from "./DialogShowBusinessAlliances";
import DialogPopMissionModelOutOfDate from "./DialogPopMissionModelOutOfDate";
import DialogShowIsBlocked from "../DialogShowIsBlocked";
import DialogAddVariabilityConstraintsMissionModel from "./DialogAddVariabilityConstraintsMissionModel";
function withMyHook(Component) {
  return function WrappedComponent(props) {
    // const history = useHistory();
    const [openIsBlocked, setOpenIsBlocked] = React.useState("");

    let blocker = useBlocker(openIsBlocked);

    // Reset the blocker if the user cleans the form
    React.useEffect(() => {
      if (blocker.state === "blocked" && !openIsBlocked) {
        blocker.reset();
      }
    }, [blocker, openIsBlocked]);

    // useEffect(() => {

    //   props.setRouteChange(location.pathname);

    // }, [location.pathname]);

    return (
      <Component
        {...props}
        setOpenIsBlocked={setOpenIsBlocked}
        blocker={blocker}
        openIsBlocked={openIsBlocked}
      />
    );
  };
}

export class PopDetailedViewBpmn extends React.Component {
  xmlBase =
    '<? xml version = "1.0" encoding = "UTF-8" ?>' +
    '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1bhm0pw" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="12.0.0">' +
    ' <bpmn:process id="Process_1lqc09i" isExecutable="false">' +
    '   <bpmn:startEvent id="StartEvent_1jdkmg0" />' +
    " </bpmn:process>" +
    ' <bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
    '   <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1lqc09i">' +
    '     <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1jdkmg0">' +
    '       <dc:Bounds x="156" y="82" width="36" height="36" />' +
    "     </bpmndi:BPMNShape>" +
    "   </bpmndi:BPMNPlane>" +
    " </bpmndi:BPMNDiagram>" +
    "</bpmn:definitions>";

  constructor(props) {
    super(props);

    this.state = {};

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { url, overallViewXmlString } = this.props;

    const container = this.containerRef.current;

    this.bpmnViewer = new BpmnModeler({
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

    if (overallViewXmlString == []) {
      console.log(overallViewXmlString);
      // return this.fetchDiagram(url);
    }

    if (!url) {
      return this.displayDiagram(this.xmlBase);
    }
  }

  componentWillUnmount() {
    this.bpmnViewer.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props, state } = this;
    this.props.setOpenIsBlocked(true);

    if (
      this.props.overallViewXmlString != undefined &&
      this.props.overallViewXmlString.length != 0
    ) {
      return this.displayDiagram(this.props.overallViewXmlString[0].text);
    }

    if (props.url !== prevProps.url) {
      this.setState({ diagramXML: props.url });
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

  async downloadFile() {
    try {
      const { xml } = await this.bpmnViewer.saveXML({ format: true });

      const blob = new Blob([xml], {
        type: "text;charset=utf-8",
      });
      FileSaver.saveAs(blob, "PoPDetailedModel.bpmn");
    } catch (err) {
      console.error("Error happened saving XML: ", err);
    }
  }

  async saveFile(xmlArg) {
    try {
      const { xml } = await this.bpmnViewer.saveXML({ format: true });

      const newPopDetailedModel = {
        name: "PoP Detailed Model",
        file_text: xml,
        user_id: this.props.user_id,
        pop_mission_id: this.props.popMissionId,
        id: this.props.popDetailedModelId,
        updated: true,
      };
      // console.log(newPopDetailedModel);
      this.props.updatePopMissionDetailedModel(newPopDetailedModel);
    } catch (err) {
      console.error("Error happened saving XML: ", err);
    }
  }

  render() {
    return (
      <>
        <Box
          sx={{ margin: 1, width: "90%", height: "91%" }}
          ref={this.containerRef}
        >
          <div
            className="react-bpmn-diagram-container"
            ref={this.containerRef}
          ></div>
          <div ref={this.containerRef}></div>
        </Box>
        <div id="properties"></div>
        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            left: "220px",
            display: "flex",
            padding: 0,
            margin: 0,
          }}
          variant="contained"
        >
          <DialogShowBusinessAlliances
            user_id={this.props.user_id}
            handleSetXmlString={this.props.handleSetXmlString}
            setPopMissionId={this.props.setPopMissionId}
            saveFile={this.props.addPopMissionDetailedModel}
            updateFile={this.props.updatePopMissionDetailedModel}
            setpopDetailedModelId={this.props.setpopDetailedModelId}
            setNameVariabilityButton={this.props.setNameVariabilityButton}
          />

          <Button
            variant="outlined"
            onClick={() => {
              this.saveFile();
            }}
          >
            Save PoP Mission Detailed Model
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              this.downloadFile();
            }}
          >
            Download PoP Mission Detailed Model
          </Button>
          {/* <DialogPopMissionModelOutOfDate
            openDialogPopMissionModelOutOfDate={
              this.props.openDialogPopMissionModelOutOfDate
            }
            setOpenDialogPopMissionModelOutOfDate={
              this.props.setOpenDialogPopMissionModelOutOfDate
            }
          /> */}

          <DialogAddVariabilityConstraintsMissionModel
            nameVariabilityButton={this.props.nameVariabilityButton}
            setNameVariabilityButton={this.props.setNameVariabilityButton}
            popDetailedModelId={this.props.popDetailedModelId}
            updateFile={this.props.updatePopMissionDetailedModel}
          />
        </Box>
        {this.props.blocker ? (
          <DialogShowIsBlocked
            blocker={this.props.blocker}
            openIsBlocked={this.props.openIsBlocked}
            setOpenIsBlocked={this.props.setOpenIsBlocked}
          />
        ) : null}
      </>
    );
  }
}
export default withMyHook(PopDetailedViewBpmn);
