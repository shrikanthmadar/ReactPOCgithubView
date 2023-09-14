import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

function Search(props: any) {
  const { payload, pageNumber } = props;
  const [repoName, setRepoName] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [sortBy, setSortBy] = useState("name");
  const [sortType, setSortType] = useState("asc");
  const perPage = 10;

  const handleSortByChange = (event: any) => {
    setSortBy(event.target.value as string);
  };
  const handleSortTypeChange = (event: any) => {
    setSortType(event.target.value as string);
  };

  async function GetRepositories() {
    if (repoName || userName || language) {
      let query: any = repoName ? repoName : "";
      query += language ? `+language:${language}` : "";
      query += userName ? `+user:${userName}` : "";
      query += ` sort:${sortBy}-${sortType}`;

      payload({
        query: query,
        sortType: sortType,
        perPage: perPage,
        pageNumber: pageNumber,
      });
    } else {
      setRepoName("");
      setUserName("");
      setLanguage("");
    }
  }

  useEffect(() => {
    if (pageNumber !== 1) {
      GetRepositories();
    }
  }, [pageNumber]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <td>
              <h2>Search By</h2>
            </td>
          </tr>
        </thead>
        <tbody style={{ borderBottomColor: "white" }}>
          <tr>
            <td>
              <TextField
                id="filled-search"
                label="Repository Name"
                type="search"
                variant="filled"
                error={repoName === ""}
                onChange={(event) => setRepoName(event.target.value)}
              />
            </td>
            <td>
              <TextField
                id="filled-search"
                label="Users Name"
                type="search"
                variant="filled"
                error={userName === ""}
                onChange={(event) => setUserName(event.target.value as string)}
              />
            </td>
            <td>
              <TextField
                id="filled-search"
                label="language"
                type="search"
                variant="filled"
                error={language === ""}
                onChange={(event) => setLanguage(event.target.value as string)}
              />
            </td>
            <td>
              <Button
                style={{ backgroundColor: "green" }}
                variant="contained"
                onClick={GetRepositories}
              >
                Search
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="sortBy"
                  onChange={(event) => setSortBy(event.target.value as string)}
                >
                  <MenuItem value={"name"}>Name</MenuItem>
                  <MenuItem value={"description"}>Description</MenuItem>
                  <MenuItem value={"owner"}>Owner</MenuItem>
                  <MenuItem value={"created_at"}>Created at</MenuItem>
                  <MenuItem value={"update_at"}> Update at</MenuItem>
                </Select>
              </FormControl>
            </td>
            <td>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  label="sortType"
                  onChange={(event) =>
                    setSortType(event.target.value as string)
                  }
                >
                  <MenuItem value={"asc"}>Ascending</MenuItem>
                  <MenuItem value={"desc"}>Descending</MenuItem>
                </Select>
              </FormControl>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Search;
