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
    FormControlLabel
} from "@mui/material";
import { useFormik } from "formik";
import ExtractInteroperabilityRequirements from "./extractInteroperabilityRequirements";
import { CSVLink } from "react-csv";

export default function ExtractRequirementsDialog({
  openRequirementsDialog,
  setOpenRequirementsDialog,
  mission
}) {
    const [csvData, setCsvData] = useState(undefined);
    const handleClose = () => {
        setOpenRequirementsDialog(false);
        setCsvData(undefined);
    };

    const formik = useFormik({
        initialValues: {
            pop_mission_id: mission.id,
            mission: mission
        },
        onSubmit: async (values) => {
            setCsvData(ExtractInteroperabilityRequirements({ mission: values.mission }));
            formik.resetForm();
        },
    });
    
    return (
    <>
        <Dialog open={openRequirementsDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
            Extract Interoperability Requirements
        </DialogTitle>
                <DialogContent sx={{ padding: "10px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                    name="radio-buttons-group"
                                    sx={{marginTop:"10px"}}
                            >
                                <FormControlLabel value="confiability" control={<Radio />} label="Include Confiability Requirements" />
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
                            {csvData ?<CSVLink
                                data={csvData}
                                separator={";"}
                                filename={`${mission.tittle}_interoperability_requirements`}
                                headers={['Campo', 'Descricao']}
                                style={{
                                    "backgroundColor": "blue",
                                    "color": "white",
                                    "border": "2px solid blue",
                                    "padding": "10px 20px",
                                    "textAlign": "center",
                                    "textDecoration": "none",
                                    "display": "inline-block"
                                }}
                            >Download CSV File</CSVLink> : ''}
                    </Grid>
                </form> 
            </DialogContent>
        </Dialog>
    </>
    );
}
