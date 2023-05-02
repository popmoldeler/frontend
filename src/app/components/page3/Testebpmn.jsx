import * as React from "react";
import { Box, Button } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BpmnFrame from "./BpmnFrame";
import DialogShowBpmn from "./DialogShowBpmn";


import {

  unstable_useBlocker as useBlocker,

} from "react-router-dom";

export default function Testebpmn(props,{ token }) {

  console.log(props);

  let [value, setValue] = React.useState("");
  const [isBlocked, setIsBlocked] = React.useState("");

  // let isBlocked = value !== "";
  let blocker = useBlocker(isBlocked);

  // Reset the blocker if the user cleans the form
  React.useEffect(() => {
    if (blocker.state === "blocked" && !isBlocked) {
      blocker.reset();
    }
  }, [blocker, isBlocked]);

  const [xmlString, setXmlString] = React.useState("");

  function handleSetXmlString(xml) {
    setXmlString(xml);
    console.log(xmlString);
  }
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 10,
            height: 30,
            display: "flex",
          }}
          variant="contained"
        >
          {/* <DialogShowBpmn handleSetXmlString={handleSetXmlString} /> */}
          <Button
            variant="outlined"
            onClick={() => setIsBlocked(true)}
          >
            Load
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsBlocked(false)}
          >
            cancel
          </Button>
        </Box>

        <Box
          sx={{
            position: "relative",
            top: "40px",
            width: 750,
            height: "500px",
            backgroundColor: "lightblue",
          }}
        >
          <BpmnFrame token={token} xmlString={xmlString}></BpmnFrame>
        </Box>
      </Box>

      {blocker ? <ConfirmNavigation blocker={blocker} /> : null}
    </>
  );
}

function ConfirmNavigation({ blocker }) {
  if (blocker.state === "blocked") {
    return (
      <>
        <p style={{ color: "red" }}>
          Blocked the last navigation to {blocker.location.pathname}
        </p>
        <button onClick={() => blocker.proceed?.()}>Let me through</button>
        <button onClick={() => blocker.reset?.()}>Keep me here</button>
      </>
    );
  }

  if (blocker.state === "proceeding") {
    return (
      <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
    );
  }

  return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
}

