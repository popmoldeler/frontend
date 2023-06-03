import * as React from "react";
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

export default function ExtractReliabilityDialog({
  openReliabilityDialog,
  setOpenReliabilityDialog,
  mission
}) {
    const handleClose = () => {
        setOpenReliabilityDialog(false);
    };

    const formik = useFormik({
        initialValues: {
            pop_mission_id: mission.id,
            mission: mission
        },
        onSubmit: async (values) => {
            ExtractReliabilityRequirements({ mission: values.mission });
            formik.resetForm();
        },
    });
    
    return (
    <>
        <Dialog open={openReliabilityDialog} onClose={handleClose}>
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
                            ><FormControlLabel value="confiability" control={<Radio />} label="Include Confiability Requirements" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </form> 
            </DialogContent>
        </Dialog>
    </>
    );
}
