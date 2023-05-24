import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        paddingTop: 1,
      }}
    >
      <Box>
        <Typography variant="h3" gutterBottom>
          Contributing to PoP Modeler
        </Typography>
        <Typography variant="h5" gutterBottom>
          Maria Istela Cagnin
        </Typography>
        <Typography variant="h5" gutterBottom>
          Murilo Gustavo Nabarrete Costa
        </Typography>
        <Typography variant="h5" gutterBottom>
          Wellington Gabriel de Mattia
        </Typography>
        <Typography variant="h5" gutterBottom>
          Igor Cassio Toledo Franco
        </Typography>
        <Typography variant="h6" gutterBottom>
          For the Documentation acess:{" "}
          {
            <Link to="http://popmodelerdoc.ledes.net/">
              http://popmodelerdoc.ledes.net/
            </Link>
          }
        </Typography>
        <Typography variant="h6" gutterBottom>
          Made with:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          ReactJS 18, Laravel Lumen 9.0
        </Typography>
        <Typography variant="h6" gutterBottom>
          Supported by: Capes, UFMS, CNPq, Fundect
        </Typography>
      </Box>
    </Box>
  );
}
