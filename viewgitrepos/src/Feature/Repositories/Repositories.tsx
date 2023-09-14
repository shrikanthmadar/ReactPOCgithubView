import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./Repositories.css";
import { useEffect, useState } from "react";
import { Pagination, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { getRepos, setTotalRepos } from "../../Redux/repos/reposSlice";
import {
  IQueryParameter,
  useFecthReposQuery,
} from "../../Redux/repo-api/repos-api-slice";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";

function Repositories(props: any) {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState<IQueryParameter>({});
  //const [skip, setSkip] = useState<boolean>(true);
  const repos = useSelector((state: any) => state.repos);

  const { data, isFetching, isError, isSuccess } = useFecthReposQuery(payload);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const perPage = 10;

  const handleChange = (event: any, value: number) => {
    setPageNumber(value);
  };

  const handleClick = (name: any, owner: any) => {
    navigate(`/Repository/${owner}/${name}`);
  };

  async function GetRepositories(data: IQueryParameter) {
    setPayload(data);
    if (isError) {
      dispatch(getRepos({ items: [], total_count: 0 }));
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(getRepos(data));
    }
  }, [isSuccess, isError, data]);

  return (
    <Card>
      <div className="px-4 py-2">
        <Row>
          <Col>
            <Search pageNumber={pageNumber} payload={GetRepositories} />
          </Col>
        </Row>
        {repos?.total_count && repos?.total_count > 0 && !isFetching ? (
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
                    {repos?.items.map((repo: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{repo.name} </td>
                          <td>{repo.description}</td>
                          <td>{repo.owner.login}</td>
                          <td>{repo.created_at}</td>
                          <td>{repo.updated_at}</td>
                          <td>
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleClick(repo.name, repo.owner.login)
                              }
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
                          count={Math.ceil(repos.total_count / perPage)}
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
        ) : isFetching && !isError ? (
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

export default Repositories;
