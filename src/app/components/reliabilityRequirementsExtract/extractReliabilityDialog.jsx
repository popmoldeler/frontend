import React, {useState} from "react";
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
import ExtractReliabilityRequirements from "./extractReliabilityRequirements";
import { CSVLink } from "react-csv";

export default function ExtractReliabilityDialog({
  openReliabilityDialog,
  setOpenReliabilityDialog,
  mission
}) {
   
    const handleClose = () => {
        setOpenReliabilityDialog(false);
        setCsvData(undefined);
    };
    const [csvData, setCsvData] = useState(undefined);

    const formik = useFormik({
        initialValues: {
            pop_mission_id: mission.id,
            mission: mission
        },
        onSubmit: async (values) => {
            setCsvData(ExtractReliabilityRequirements({ mission: values.mission }));
            formik.resetForm();
        },
    });
    
    return (
    <>
        <Dialog open={openReliabilityDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "0px" }}>
            Extract Fault Tolerance Requirements (Portuguese)
        </DialogTitle>
                <DialogContent sx={{ padding: "10px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
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
                                filename={`${mission.tittle}_reability_requirements`}
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
