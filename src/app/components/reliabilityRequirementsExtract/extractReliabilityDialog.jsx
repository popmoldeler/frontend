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
  RadioGroup,
  Radio,
  FormControlLabel,
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

  const formik = useFormik({
    initialValues: {
      pop_mission_id: mission.id,
      mission: mission,
      language: "Portuguese", // Opção padrão
    },
    onSubmit: async (values) => {
      let headers;
      if (values.language === "Portuguese") {
        setCsvData(ExtractReliabilityRequirements({ mission: values.mission }));
        headers = ["Campo", "Descrição"];
      } else if (values.language === "English") {
        setCsvData(
          ExtractReliabilityRequirementsEnglish({ mission: values.mission })
        );
        headers = ["Field", "Description"];
      }

      //IF compacts
      if (values.language === "PortugueseCompact") {
        setCsvData(ExtractReliabilityRequirementsCompact({ mission: values.mission }));
        headers = ["Campo", "Descrição"];
      } else if (values.language === "EnglishCompact") {
        setCsvData(
          ExtractReliabilityRequirementsEnglishCompact({ mission: values.mission })
        );
        headers = ["Field", "Description"];
      }

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
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="language"
                  name="language"
                  value={formik.values.language}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="PortugueseCompact"
                    control={<Radio />}
                    label=" Compact (Portuguese)"
                  />
                  <FormControlLabel
                    value="Portuguese"
                    control={<Radio />}
                    label=" Detailed (Portuguese)"
                  />
                  <FormControlLabel
                    value="EnglishCompact"
                    control={<Radio />}
                    label="Compact (English)"
                  />
                  <FormControlLabel
                    value="English"
                    control={<Radio />}
                    label="Detailed (English)"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                sx={{
                  paddingTop: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{ m: 1, width: "20ch" }}
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  sx={{ m: 1, width: "20ch" }}
                  color="success"
                  variant="outlined"
                  fullWidth
                  type="submit"
                >
                  Extract Requirements
                </Button>
              </Box>
              {csvData ? (
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
              ) : (
                ""
              )}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
