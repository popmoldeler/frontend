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
    MenuItem
} from "@mui/material";
import { useFormik } from "formik";
import ExtractInteroperabilityRequirements from "./extractInteroperabilityRequirements";
import ExtractInteroperabilityRequirementsPortuguese from "./extractInteroperabilityRequirementsPortuguese";
import { CSVLink } from "react-csv";

export default function ExtractRequirementsDialog({
  openRequirementsDialog,
  setOpenRequirementsDialog,
  mission
}) {
    const [csvData, setCsvData] = useState(undefined);
    const [extractTypeText, setExtractTypeText] = useState(undefined);
    const [language, setLanguage] = useState('portuguese');
    const [extractType, setExtractType] = useState('detailed');

    const handleClose = () => {
        setOpenRequirementsDialog(false);
        setCsvData(undefined);
        setLanguage('');
        setExtractType('');
    };

    const formik = useFormik({
        initialValues: {
            extractType: '',
            pop_mission_id: mission.id,
            mission: mission
        },
        onSubmit: async (values) => {
            switch (language){
                case 'english':
                    const csvDataTemp = ExtractInteroperabilityRequirements({ mission: values.mission, options: extractType });
                    if (csvDataTemp !== '') {
                        setCsvData(csvDataTemp);
                        setExtractTypeText(extractType);
                    } else {
                        setCsvData(undefined);
                        setExtractTypeText(undefined);
                    }
                    break;
                case 'portuguese':
                    const csvDadosTemp = ExtractInteroperabilityRequirementsPortuguese({ mission: values.mission, options: extractType });
                    if (csvDadosTemp !== '') {
                        setCsvData(csvDadosTemp);
                        setExtractTypeText(extractType);
                    } else {
                        setCsvData(undefined);
                        setExtractTypeText(undefined);
                    }
                    break;
                default:
                    break;
            }
            formik.resetForm();
        },
    });
    
    return (
    <>
        <Dialog open={openRequirementsDialog} onClose={handleClose}>
        <DialogTitle sx={{ alignSelf: "center", paddingBottom: "10px" }}>
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
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <FormLabel id="language-label">Language:</FormLabel>
                            <Select
                                labelId="language-label"
                                id="language"
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e.target.value);
                                    setCsvData(undefined);
                                }}
                            >
                                <MenuItem value="portuguese">Portuguese</MenuItem>
                                <MenuItem value="english">English</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <FormLabel id="type-label">Type:</FormLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={extractType}
                                onChange={(e) => {
                                    setExtractType(e.target.value);
                                    setCsvData(undefined);
                                }}
                            >
                                <MenuItem value="detailed">Detailed</MenuItem>
                                <MenuItem value="compact">Compact</MenuItem>
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
                            {
                            csvData ? 
                            <CSVLink
                                data={csvData}
                                separator={";"}
                                filename={`${extractTypeText}_${mission.tittle}_interoperability_requirements`}
                                headers={ extractType == 'english' ? ['Field', 'Description']: ['Campo', 'Descricao']}
                                style={{
                                    "backgroundColor": "blue",
                                    "color": "white",
                                    "border": "2px solid blue",
                                    "padding": "10px 20px",
                                    "textAlign": "center",
                                    "textDecoration": "none",
                                    "display": "inline-block"
                                }}
                            >Download CSV File</CSVLink> : ''
                            }
                    </Grid>
                </form> 
            </DialogContent>
        </Dialog>
    </>
    );
}
