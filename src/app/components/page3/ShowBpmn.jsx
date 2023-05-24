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
import "./ShowBpmn.css";
import api from "../../api";
import DialogShowBpmn from "./DialogShowBpmn";
import { useGetOverallViewQuery } from "../../features/overall_view/overallViewApiSlice";
import DialogAddConstituentProcessesConstraintsModel from "./DialogAddConstituentProcessesConstraintsModel";
import DialogOverallVIewOutOfDate from "./DialogOverallVIewOutOfDate";
import DialogShowIsBlocked from "./DialogShowIsBlocked";

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

export class ReactBpmn extends React.Component {
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
    const {
      url,
      diagramXML,
      addOverallView,
      user_id,
      popMissionId,
      setPopId,
      updateOverallView,
      overallViewXmlString,
    } = this.props;

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

  // fetchDiagram(url) {
  //   this.handleLoading();
  //   // console.log(this.props.token);
  //   api
  //     .get(`/pop/1678924046diagram`, {
  //       headers: {
  //         Accept: "aplication/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${this.props.token}`,
  //       },
  //     })

  //     .then((response) => {
  //       // console.log("ola", response.data);
  //       this.setState({ diagramXML: response.data });
  //     })
  //     .catch((err) => this.handleError(err));
  // }

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
      FileSaver.saveAs(blob, "overallview.bpmn");
    } catch (err) {
      console.error("Error happened saving XML: ", err);
    }
  }

  async saveFile(xmlArg) {
    try {
      const { xml } = await this.bpmnViewer.saveXML({ format: true });

      const overallview = {
        name: "overallview",
        file_text: xml,
        user_id: this.props.user_id,
        pop_id: this.props.popId,
      };
      if (this.props.saveOrUpdataOverallView == "save") {
        // console.log('s', this.props.saveOrUpdataOverallView);
        this.props.addOverallView(overallview);
      } else {
        const { xml } = await this.bpmnViewer.saveXML({ format: true });

        const newoverallview = {
          name: "overallview",
          file_text: xml,
          user_id: this.props.user_id,
          pop_id: this.props.popId,
          id: this.props.overallViewId,
          updated: true,
        };
        // console.log('update', this.props.saveOrUpdataOverallView, this.props.overallViewId, newoverallview);
        this.props.updateOverallView(newoverallview);
      }
      // this.props.addOverallView(overallview);
      // console.log('herre',overallview);
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
          <DialogShowBpmn
            handleSetXmlString={this.props.handleSetXmlString}
            setPopMissionId={this.props.setPopMissionId}
            setPopId={this.props.setPopId}
            sx={{
              position: "static",
              bottom: "20px",
            }}
            setSaveOrUpdataOverallView={this.props.setSaveOrUpdataOverallView}
            setOverallViewId={this.props.setOverallViewId}
            openDialogOutOfDate={this.props.openDialogOutOfDate}
            setOpenDialogOutOfDate={this.props.setOpenDialogOutOfDate}
            saveFile={this.props.addOverallView}
            updateFile={this.props.updateOverallView}
            setNameConstraintsButton={this.props.setNameConstraintsButton}
          />

          <Button
            variant="outlined"
            onClick={() => {
              this.saveFile();
            }}
          >
            Save PoP Overall Model
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              this.downloadFile();
            }}
          >
            Download PoP Overall Model
          </Button>
          <DialogAddConstituentProcessesConstraintsModel
            setNameConstraintsButton={this.props.setNameConstraintsButton}
            overallViewId={this.props.overallViewId}
            updateFile={this.props.updateOverallView}
            nameConstraintsButton={this.props.nameConstraintsButton}
          />

          <DialogOverallVIewOutOfDate
            setOpenDialogOutOfDate={this.props.setOpenDialogOutOfDate}
            openDialogOutOfDate={this.props.openDialogOutOfDate}
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
export default withMyHook(ReactBpmn);
