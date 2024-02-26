import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  Box,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import ExtractReliabilityRequirements from "./extractReliabilityRequirements";
import ExtractReliabilityRequirementsCompact from "./extractReliabilityRequirementsCompact";
import ExtractReliabilityRequirementsEnglish from "../reliabilityRequirementsExtractEnglish/extractReliabilityRequirementsEnglish";
import ExtractReliabilityRequirementsEnglishCompact from "../reliabilityRequirementsExtractEnglish/extractReliabilityRequirementsEnglishCompact";
import { CSVLink } from "react-csv";

export default function ExtractReliabilityDialog({
  openReliabilityDialog,
  setOpenReliabilityDialog,
  mission,
}) {
  const handleClose = () => {
    setOpenReliabilityDialog(false);
    setCsvData(undefined);
  };
  const [csvData, setCsvData] = useState(undefined);
  const [language, setLanguage] = useState("Portuguese");
  const [type, setType] = useState("Detailed");

  const formik = useFormik({
    initialValues: {
      pop_mission_id: mission.id,
      mission: mission,
    },
    onSubmit: async () => {
      let extractedData;
      let headers;
      if (language === "Portuguese") {
        extractedData = type === "Detailed" ?
          ExtractReliabilityRequirements({ mission }) :
          ExtractReliabilityRequirementsCompact({ mission });
        headers = ["Campo", "Descrição"];
      } else if (language === "English") {
        extractedData = type === "Detailed" ?
          ExtractReliabilityRequirementsEnglish({ mission }) :
          ExtractReliabilityRequirementsEnglishCompact({ mission });
        headers = ["Field", "Description"];
      }
      setCsvData(extractedData);
      formik.resetForm();
      formik.setFieldValue("headers", headers);
    },
  });

  return (
    <>
      <Dialog open={openReliabilityDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
          Extract Fault Tolerance Requirements
        </DialogTitle>
        <DialogContent sx={{ padding: "10px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <FormLabel id="language-label">Language:</FormLabel>
                  <Select
                    labelId="language-label"
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <MenuItem value="Portuguese">Portuguese</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <FormLabel id="type-label">Type:</FormLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="Detailed">Detailed</MenuItem>
                    <MenuItem value="Compact">Compact</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  paddingTop: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    m: 1,
                    minWidth: "120px",
                    backgroundColor: "blue",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkblue",
                    },
                  }}
                  variant="contained"
                  fullWidth
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  sx={{
                    m: 1,
                    minWidth: "120px",
                    backgroundColor: "green",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Extract Requirements
                </Button>
              </Box>
              {csvData && (
                <CSVLink
                  data={csvData}
                  separator={";"}
                  filename={`${mission.tittle} - Fault Tolerance Requirements`}
                  headers={formik.values.headers || ["Campo", "Descrição"]}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "2px solid blue",
                    padding: "10px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Download CSV File
                </CSVLink>
              )}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
