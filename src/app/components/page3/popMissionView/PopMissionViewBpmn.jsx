import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import BpmnJS from "bpmn-js/lib/Modeler";
import BpmnModdle from "bpmn-moddle";
import FileSaver from "file-saver";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { unstable_useBlocker as useBlocker } from "react-router-dom";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./PopMissionViewBpmn.css";
import DialogShowBusinessAlliances from "./DialogShowBusinessAlliances";
import DialogPopMissionModelOutOfDate from "./DialogPopMissionModelOutOfDate";
import DialogAddConstituentProcessesConstraintsMissionModel from "./DialogAddConstituenProcessesConstraintsMissionModel";
import DialogShowIsBlocked from "../DialogShowIsBlocked";
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

    const [saveAnyway, setsaveAnyway] = React.useState(false);
    const [xmlToSaveAgain, setXxmlToSaveAgain] = React.useState(false);

    const [
      openDialogWithMoreCollaboration,
      setOpenDialogWithMoreCollaboration,
    ] = React.useState(false);

    return (
      <Component
        {...props}
        setOpenIsBlocked={setOpenIsBlocked}
        blocker={blocker}
        openIsBlocked={openIsBlocked}
        openDialogWithMoreCollaboration={openDialogWithMoreCollaboration}
        setOpenDialogWithMoreCollaboration={setOpenDialogWithMoreCollaboration}
        saveAnyway={saveAnyway}
        setsaveAnyway={setsaveAnyway}
        xmlToSaveAgain={xmlToSaveAgain}
        setXxmlToSaveAgain={setXxmlToSaveAgain}
      />
    );
  };
}
function DialogPopMissionsModelWithMoreCollaboration({
  openDialogWithMoreCollaboration,
  setOpenDialogWithMoreCollaboration,
  setsaveAnyway,
  save,
}) {
  const handleClose = () => {
    setOpenDialogWithMoreCollaboration(false);
  };
  const handleSave = () => {
    setsaveAnyway(true);
    save();
    handleClose();
  };

  return (
    <div>
      <Dialog open={openDialogWithMoreCollaboration} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>
            Your PoP Missions Model have more than one pool and/or more sub process than missions!
          </DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export class PopMissionViewBpmn extends React.Component {
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
      FileSaver.saveAs(blob, "popMissionsModel.bpmn");
    } catch (err) {
      console.error("Error happened saving XML: ", err);
    }
  }

  async saveFile() {
    
    try {
      const { xml } = await this.bpmnViewer.saveXML({ format: true });
     
      const newPopMissionModel = {
        name: "overallview",
        file_text: xml,
        user_id: this.props.user_id,
        pop_id: this.props.popId,
        id: this.props.popMissionModelId,
        updated: true,
      };

      const source = new DOMParser().parseFromString(xml, "text/xml");

      const collaboration = source.getElementsByTagName("bpmn:collaboration");
      const process = source.getElementsByTagName("bpmn:subProcess");


      

      if (
        collaboration[0].children.length > 1 &&
        this.props.saveAnyway == false
      ) {
        this.props.setXxmlToSaveAgain(xml);
        this.props.setOpenDialogWithMoreCollaboration(true);
      } else {
        if (process[0].children.length > this.props.popMissionNumber) {
          this.props.setOpenDialogWithMoreCollaboration(true);
        }

        this.props.updatePopMissionModel(newPopMissionModel);
      }
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
            left: "200px",
            display: "flex",
            padding: 0,
            margin: 0,
          }}
          variant="contained"
        >
          <DialogShowBusinessAlliances
            user_id={this.props.user_id}
            handleSetXmlString={this.props.handleSetXmlString}
            setSaveOrUpdataPopMissionModel={
              this.props.setSaveOrUpdataPopMissionModel
            }
            saveOrUpdataPopMissionModel={this.props.saveOrUpdataPopMissionModel}
            popMissionModelId={this.props.popMissionModelId}
            setPopMissionModelId={this.props.setPopMissionModelId}
            setOpenDialogPopMissionModelOutOfDate={
              this.props.setOpenDialogPopMissionModelOutOfDate
            }
            saveFile={this.props.addPopMissionModel}
            updateFile={this.props.updatePopMissionModel}
            setPopId={this.props.setPopId}
            setNameConstraintsButton={this.props.setNameConstraintsButton}
            setPopMissionNumber={this.props.setPopMissionNumber}
          />

          <Button
            variant="outlined"
            onClick={() => {
              this.saveFile();
            }}
          >
            Save PoP Missions Model
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              this.downloadFile();
            }}
          >
            Download PoP Missions Model
          </Button>
          <DialogPopMissionModelOutOfDate
            openDialogPopMissionModelOutOfDate={
              this.props.openDialogPopMissionModelOutOfDate
            }
            setOpenDialogPopMissionModelOutOfDate={
              this.props.setOpenDialogPopMissionModelOutOfDate
            }
          />

          <DialogAddConstituentProcessesConstraintsMissionModel
            nameConstraintsButton={this.props.nameConstraintsButton}
            setNameConstraintsButton={this.props.setNameConstraintsButton}
            popMissionModelId={this.props.popMissionModelId}
            updateFile={this.props.updatePopMissionModel}
          />
        </Box>
        {this.props.blocker ? (
          <DialogShowIsBlocked
            blocker={this.props.blocker}
            openIsBlocked={this.props.openIsBlocked}
            setOpenIsBlocked={this.props.setOpenIsBlocked}
          />
        ) : null}
        {this.props.openDialogWithMoreCollaboration ? (
          <DialogPopMissionsModelWithMoreCollaboration
            openDialogWithMoreCollaboration={
              this.props.openDialogWithMoreCollaboration
            }
            setOpenDialogWithMoreCollaboration={
              this.props.setOpenDialogWithMoreCollaboration
            }
            setsaveAnyway={this.props.setsaveAnyway}
            save={() => this.saveFile()}
          />
        ) : null}
      </>
    );
  }
}
export default withMyHook(PopMissionViewBpmn);
