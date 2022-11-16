import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useGetBusinessAlliancesQuery } from "../../../features/business_alliance/bussinesAllianceApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../features/auth/authSlice";

import SelectPoPMission from "./SelectPoPMission";

export default function SelectPop() {
  const user_id = useSelector(selectCurrentUserId);
  const { isLoading, isSuccess, isError, error, data } =
    useGetBusinessAlliancesQuery(user_id);
  let content;

  if (isLoading) {
    content = [
      {
        business_goal: "Loading",
        id: 0,
        name: "Loading",
        responsable_member_id: 0,
        creation_date: "2022-03-16",
        pops: [
          {
            id: 1,
            name: "loading",
            description: "loading",
            business_alliance_id: 1,
            pop_missions: [
              {
                id: 1,
                status: 1,
                description: "loading",
                tittle: "loading",
                pop_id: 1,
              },
            ],
          },
        ],
        permission: [
          {
            type: "View",
          },
        ],
        responsable_member: {
          category_id: 0,
          category: { id: 0 },
          city: "Loading",
          cnpj: "Loading",
          country: "Loading",
          id: 0,
          name: "Loading",
          neighborhood: "Loading",
          number: "Loading",
          site: "Loading",
          state: "Loading",
          street: "Loading",
          zip_code: "Loading",
        },
        internal_collaborations: [
          {
            alliance_member_id: 1,
            business_alliance_id: 1,
            exit_date: null,
            id: 1,
            relationship: "Loading",
            alliance_member: {
              category_id: 0,
              category: { id: 0 },
              city: "Loading",
              cnpj: "Loading",
              country: "Loading",
              id: 0,
              name: "Loading",
              neighborhood: "Loading",
              number: "Loading",
              site: "Loading",
              state: "Loading",
              street: "Loading",
              zip_code: "Loading",
            },
          },
        ],
        external_collaborations: [],
      },
    ];
  } else if (isSuccess) {
    content = data;
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <TableContainer
      sx={{ margin: 1, width: "100%", height: "91%" }}
      component={Paper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "98%",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            paddingLeft: "16px",
            marginTop: "16px",
          }}
        >
          Business Alliances
        </Typography>
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <Row row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ row }) {
  const [openShowPopMission, setOpenShowPopMission] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenShowPopMission(!openShowPopMission)}
          >
            {openShowPopMission ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
      </TableRow>
      <TableRow>
        {/* PoP */}
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={openShowPopMission} timeout="auto" unmountOnExit>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "98%",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  paddingLeft: "16px",
                  marginTop: "16px",
                }}
              >
                PoP
              </Typography>
            </Box>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.pops.map((mission) => (
                  <SelectPoPMission
                    mission={mission}
                    key={mission.id}
                    allianceMembers={row.internal_collaborations}
                  />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
