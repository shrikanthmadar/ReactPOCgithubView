import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./Repositories.css";
import { useEffect, useState } from "react";
import { Pagination, TextField, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { RotatingLines } from "react-loader-spinner";
import { connect } from "react-redux";
import * as reposAction from "../../Redux/actions/repos";
import { useDispatch } from "react-redux";

function Repositories(props: any) {
  const dispatch = useDispatch();
  const [repositories, setRepositories] = useState([]);
  const [totalRepositories, setTotalRepositories] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [repoName, setRepoName] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "https://api.github.com";
  const perPage = 10;

  const handleChange = (event: any, value: number) => {
    console.log({ value: value, event: event });
    setPageNumber(value);
  };

  const handleClick = (name: any, owner: any) => {
    navigate(`/Repository/${owner}/${name}`);
  };

  async function getRepositories() {
    dispatch(reposAction.getRepos(props.state));
    let query = repoName;
    query += language ? `+language:${language}` : "";
    query += userName ? `+user:${userName}` : "";
    query += ` sort:${sortBy}-${sortType}`;
    const url = `${BASE_URL}/search/repositories?q=${query}&order=${sortType}&per_page=${perPage}&page=${pageNumber}`;
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const repoData = await res.json();
      if (res && repoData) {
        setTotalRepositories(repoData.total_count);
        let data = repoData.items.map((x: any) => {
          let repo = {
            Name: x?.name,
            Description: x?.description,
            Owner: x?.owner.login,
            CreatedAt: x?.created_at,
            UpdatedAt: x?.updated_at,
          };
          return repo;
        });
        props.dispatch(reposAction.getReposSuccess(data));
        setRepositories(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setTotalRepositories(0);
      setRepositories([]);
      console.log(error, "catched error");
    }
  }

  const handleSortByChange = (event: any) => {
    setSortBy(event.target.value as string);
  };
  const handleSortTypeChange = (event: any) => {
    setSortType(event.target.value as string);
  };

  useEffect(() => {
    dispatch(reposAction.getRepos());
    if (language || userName || repoName) {
      //getRepositories();
      dispatch(reposAction.getRepos());
    }
  }, [pageNumber]);

  return (
    <Card>
      <div className="px-4 py-2">
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <div>
                    <h2>Search By</h2>
                  </div>
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
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setRepoName(event.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      id="filled-search"
                      label="Users Name"
                      type="search"
                      variant="filled"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUserName(event.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      id="filled-search"
                      label="language"
                      type="search"
                      variant="filled"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setLanguage(event.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      style={{ backgroundColor: "green" }}
                      variant="contained"
                      onClick={getRepositories}
                    >
                      Search
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Sort by
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortBy}
                        label="sortBy"
                        onChange={handleSortByChange}
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
                      <InputLabel id="demo-simple-select-label">
                        Sort Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortType}
                        label="sortType"
                        onChange={handleSortTypeChange}
                      >
                        <MenuItem value={"asc"}>Ascending</MenuItem>
                        <MenuItem value={"desc"}>Descending</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {totalRepositories && !isLoading ? (
          <div>
            <Row className="justify-content-md-center">
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Owner</th>
                      <th className="px-4 py-2">Created at</th>
                      <th className="px-4 py-2">Update at</th>
                      <th className="px-4 py-2"> Veiw Repository</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repositories.map((repo: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{repo.Name} </td>
                          <td>{repo.Description}</td>
                          <td>{repo.Owner}</td>
                          <td>{repo.CreatedAt}</td>
                          <td>{repo.UpdatedAt}</td>
                          <td>
                            <Button
                              variant="contained"
                              onClick={() => handleClick(repo.Name, repo.Owner)}
                            >
                              view Repo
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan={6}>
                        <Pagination
                          count={Math.ceil(totalRepositories / perPage)}
                          page={pageNumber}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        ) : isLoading ? (
          <div className="loadder">
            <Row className="justify-content-md-center">
              <Col>
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              </Col>
            </Row>
          </div>
        ) : (
          <div className="loadder"> No Data Found </div>
        )}
      </div>
    </Card>
  );
}
function mapStateToProps(state: any) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps)(Repositories);
