import { useState } from "react";
import ReactBpmn from "react-bpmn";
import api from "../../api";
import BpmnViewer from "bpmn-js";
// import { BpmnEditor } from "react-bpmn";

export default function BpmnFrame({ token, xmlString }) {
  const [xml, setXml] = useState();
  var viewer = new BpmnViewer();
  function onShown() {
    console.log("diagram shown");
  }

  function onLoading() {
    console.log("diagram loading");
  }

  function onError(err) {
    console.log("failed to show diagram");
  }

  function fetchDiagram() {
    // console.log(this.props.token);
    api
      .get(`/pop/1678924046diagram`, {
        headers: {
          Accept: "aplication/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        // console.log("ola", response.data);
        setXml(response.data);
        // this.setState({ diagramXML: response.data });
      })
      .catch((err) => console.log(err));
  }
  // fetchDiagram();

  // async function teste(params) {
  //   try {
  //     const { warnings } = await viewer.importXML(xml);

  //     console.log("rendered");
  //   } catch (err) {
  //     console.log("error rendering", err);
  //   }
  // }
  // teste();

  return (
    <ReactBpmn
      diagramXML={xmlString}
      onShown={onShown}
      onLoading={onLoading}
      onError={onError}
    />
  );
}

// import React, { useState } from "react";
// import Modeler from "bpmn-js/lib/Modeler";

// export default async function BpmnFrame(props) {
//   const [bpmn1, setBpmn1] = useState("/diagram1.bpmn");
//   const [bpmn2, setBpmn2] = useState("/diagram.bpmn");

//   // const modeler1 = new BpmnModeler();
//   // modeler1.importXML(bpmn1, function (err) {
//   //   if (err) {
//   //     console.log("Failed to import BPMN 1:", err);
//   //   }
//   // });
//   const modeler1 = new Modeler();

//   // import diagram

//   try {
//     const createdUser = await modeler1.importXML(bpmn1);

//     console.log(createdUser);
//     // business logic goes here
//   } catch (error) {
//     console.error(error); // from creation or business logic
//   }

//   // const definitions1 = modeler1.getDefinitions();
//   // const definitions2 = modeler2.getDefinitions();
//   // console.log(modeler1);
//   // // Iterate over the elements of the second BPMN diagram and add them to the first diagram
//   // definitions2.rootElements.forEach(function (element) {
//   //   definitions1.rootElements.push(element);
//   // });

//   // // Set the new definitions for the first BPMN diagram
//   // modeler1.importDefinitions(definitions1, function (err) {
//   //   if (err) {
//   //     console.log("Failed to import merged BPMN:", err);
//   //   } else {
//   //     console.log("Merged BPMN imported successfully!");
//   //   }
//   // });

//   // const mergedBpmn = ... // The merged BPMN XML

//   return (
//     <>
//       <div id="canvas"></div>
//     </>
//   );
// }
