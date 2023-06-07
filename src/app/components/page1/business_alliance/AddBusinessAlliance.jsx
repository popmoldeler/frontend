import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import SearchAllianceMember from "./SearchAllianceMember";
import BusinessAllianceTransferList from "./BusinessAllianceTransferList";

import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../../features/auth/authSlice";
import { useGetAllianceMemberQuery } from "../../../features/alliance_member/allianceMemberApiSlice";
import {
  useAddBusinessAllianceMutation,
  useAddInternalCollaborationMutation,
} from "../../../features/business_alliance/bussinesAllianceApiSlice";
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function RegisterAlliance({
  openRegAlliance,
  handleOpenRegAlliance,
  handleClose,
}) {
  const [nome, setNome] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [date, setDate] = useState(new Date());
  const [setOrganizationMember] = useState("");
  const [relationship, setRelationship] = useState("");
  const [entryDate] = useState("");
  const [responsableOrganization, setResponsableOrganization] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [member, setMember] = useState([]);
  const [index, setIndex] = useState();

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [checked, setChecked] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [addBusinessAlliance] = useAddBusinessAllianceMutation();
  const [addInternalCollaboration] = useAddInternalCollaborationMutation();

  const { isLoading, isSuccess, data } = useGetAllianceMemberQuery();
  let content;

  if (isLoading) {
    content = [
      {
        category_id: 0,
        category: { id: 0 },

        city: "Loading",
        cnpj: "Loading",
        country: "Loading",
        id: 1,
        name: "Loading",
        neighborhood: "Loading",
        number: "Loading",
        site: "Loading",
        state: "Loading",
        street: "Loading",
        zip_code: "Loading",
      },
    ];
  } else if (isSuccess) {
    content = data;
  }

  const user_id = useSelector(selectCurrentUserId);

  const handlePublic = (event) => {
    setIsPublic(!isPublic);
  };

  function handleCloseClick() {
    setNome("");
    setGoal("");

    setDate("");
    setLeft([]);
    setRight([]);
    setChecked([]);
    setResponsableOrganization("");
    handleOpenRegAlliance();
  }

  function handleSetOrganization(e) {
    const org = e.target.value;

    setResponsableOrganization(org);
  }

  const handleSearchFilter = (e) => {
    const searchWorld = e;

    const newFilter = filteredOrganizations.filter((value) => {
      return value.name.toLowerCase().includes(searchWorld.toLowerCase());
    });

    setLeft(newFilter);
  };

  useEffect(() => {
    if (responsableOrganization) {
      const teste = content.filter((org) => org !== responsableOrganization);

      setFilteredOrganizations(teste);
      setLeft(teste);
    }
  }, [responsableOrganization, content]);

  useEffect(() => {
    if (responsableOrganization) {
      setRight([]);
      const teste = content.filter((org) => org !== responsableOrganization);

      setFilteredOrganizations(teste);
      setLeft(teste);
    }
  }, [responsableOrganization]);

  useEffect(() => {
    var teste = filteredOrganizations.filter(function (element, index, array) {
      if (right.indexOf(element) === -1) return element;
    });

    setFilteredOrganizations(teste);
  }, [right]);

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setFilteredOrganizations(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setMember(not(right, rightChecked));

    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setFilteredOrganizations(left.concat(right));
    setRight([]);
    setMember([]);
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function handleSetEntryDate(org, date, relation) {
    var options = { year: "numeric", month: "2-digit", day: "2-digit" };
    if (date !== "" && relation !== "") {
      const m = {
        alliance_member_id: org.toString(),
        relationship: relation,
        entry_date: date.toLocaleString("en-US", options),
        business_alliance_id: "",
      };
      setMember([...member, m]);
    }
  }
  function handleSetDate(date) {
    if (date !== null) {
      setDate(date);
    }
  }

  return (
    <>
      <form
        onSubmit={function handleCriarOrg(e) {
          e.preventDefault();
          handleSetDate(date);
          var options = { year: "numeric", month: "2-digit", day: "2-digit" };

          const alianca = {
            name: nome,
<<<<<<< HEAD
            creation_date: date.toLocaleString("pt-BR", options).toString(),
=======
            creation_date: date.toLocaleString("en-US", options),
>>>>>>> 36de723860bda071dedf71fc32d5c44d47b820f0
            business_goal: goal,
            responsable_member_id: responsableOrganization.id,
            user_id: user_id,
            is_public: isPublic,
          };

          addBusinessAlliance(alianca).then((res) => {
            var teste = member.filter(function (element, index, array) {
              if (right.indexOf(element) === -1) return element;
            });
            const m = {
              alliance_member_id: responsableOrganization.id,
              relationship: "Responsible",
<<<<<<< HEAD
              entry_date: date.toLocaleString("pt-BR", options).toString(),
=======
              entry_date: date.toLocaleString("en-US", options),
>>>>>>> 36de723860bda071dedf71fc32d5c44d47b820f0
              business_alliance_id: res.data.id,
              is_public: isPublic,
            };

            addInternalCollaboration(m);
            setIndex(res.data.id);
            teste.map((membro) => (membro.business_alliance_id = res.data.id));
            teste.map((membro) => addInternalCollaboration(membro));
          });

          // const dispatch = useDispatch();

          // dispatch(fetchAlliances());

          setRight([]);
          setMember([]);
          setNome("");
          setGoal("");
          setIsPublic(false);
          setIndex("");
          handleSetDate(new Date());
          setResponsableOrganization("");
          handleClose();
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            m: 1,
          }}
        >
          <TextField
            id="standard-basic"
            sx={{ width: "320px" }}
            label="Name"
            variant="standard"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            id="standard-basic"
            sx={{ width: "320px" }}
            variant="standard"
            label="Business Goal"
            name="businessGoal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <FormControlLabel
            sx={{ width: "320px", justifyContent: "flex-end", margin: 0 }}
            value="public"
            control={<Checkbox checked={isPublic} onChange={handlePublic} />}
            label="Public"
            labelPlacement="start"
          />

          <TextField
            id="standard-basic"
            sx={{ width: "320px" }}
            variant="standard"
            select
            label="Responsible Member"
            value={responsableOrganization}
            onChange={handleSetOrganization}
          >
            {content.map((option) => (
              <MenuItem value={option} key={option.cnpj}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <SearchAllianceMember
            filteredOrganizations={filteredOrganizations}
            handleSearchFilter={handleSearchFilter}
          ></SearchAllianceMember>
          <BusinessAllianceTransferList
            left={left}
            handleAllRight={handleAllRight}
            handleCheckedRight={handleCheckedRight}
            handleCheckedLeft={handleCheckedLeft}
            handleAllLeft={handleAllLeft}
            handleToggle={handleToggle}
            right={right}
            checked={checked}
            leftChecked={leftChecked}
            rightChecked={rightChecked}
            setOrganizationMember={setOrganizationMember}
            entryDate={entryDate}
            handleSetEntryDate={handleSetEntryDate}
            relationship={relationship}
            setRelationship={setRelationship}
          ></BusinessAllianceTransferList>

          <Box sx={{ paddingTop: "20px" }}>
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
        </Grid>
      </form>
    </>
  );
}

export default RegisterAlliance;
