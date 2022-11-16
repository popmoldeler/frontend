import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useGetAllianceMemberQuery ,useAddBusinessProcessModelMutation} from "../../../features/alliance_member/allianceMemberApiSlice";
// import { useAddBusinessProcessModelMutation } from "../../../features/constituent_process/constituenProcessApiSlice";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUserId,
} from "../../../features/auth/authSlice";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddBusinesProcessModel({
  id,
  openRegisterBusinessProcessModel,
  setOpenRegisterBusinessProcessModel,
  handleClose,
}) {
  const user_id = useSelector(selectCurrentUserId);
  const [files, setFiles] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      alliance_member_id: id,
      user_id: user_id,
      name: "",
      description: "",
      file_name:'',
      file_type:files[0]?.fileExtension,
      location:"ConstituentProcess",
    },
    onSubmit: async (values) => {
      values.file_type=files[0]?.fileExtension;
      
      values.file_name=files[0]?.serverId;
      addBusinessProcessModel(values);
     
      handleClose();
     

    },
  });

  const { data } = useGetAllianceMemberQuery();
  const [addBusinessProcessModel] = useAddBusinessProcessModelMutation();
  function handleCloseClick() {
    setOpenRegisterBusinessProcessModel();
  }

  const token = useSelector(selectCurrentToken);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: "320px", marginBottom: 1 }}
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <FilePond
            files={files}
            allowReorder={false}
            allowMultiple={false}
            onupdatefiles={setFiles}
            instantUpload={false}
            server={{
              url: "http://popmodeler.ledes.net/api/store",
              headers: {
                Authorization: "Bearer " + token,
              },
            }}
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          <TextField
            sx={{ width: "320px", marginBottom: 1 }}
            id="description"
            name="description"
            label="Description"
            variant="standard"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
          />

          <Box
            sx={{
              paddingTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ m: 1, width: "15ch" }}
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              sx={{ m: 1, width: "15ch" }}
              color="success"
              variant="outlined"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </Box>
          {/* </form> */}
        </Box>
      </form>
    </>
  );
}

export default AddBusinesProcessModel;
