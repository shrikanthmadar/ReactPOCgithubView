import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import  './Repositories.css'
import { useEffect, useState } from 'react';
import { Pagination,TextField,Button, Card } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function Repositories() {
    const [repositories, setRepositories] = useState([]);
    const [totalRepositories, setTotalRepositories] = useState(0);
    const [pageNumber,setPageNumber]=useState(1)
    const [repoName,setRepoName]=useState('');
    const [userName,setUserName]=useState('');
    const [language,setLanguage]=useState('');
    const [sortBy,setSortBy]=useState('');
    const [sortType,setSortType]=useState('');
    const navigate=useNavigate();
    const BASE_URL = "https://api.github.com";
    const perPage = 10

    
  

  const handleChange = (event: any, value: number) => {
    console.log({"value":value,"event":event})
    setPageNumber(value);
  };

  const handleClick= (name:any,owner:any)=>{
    navigate(`/Repository/${owner}/${name}`);
  }

  async function getRepositories() {
      let query = repoName;
      query += language ? `+language:${language}` : "";
      query += userName ? `+user:${userName}` : "";
      query += ` sort:${sortBy}-${sortType}`;
    const url = `${BASE_URL}/search/repositories?q=${query}&order=${sortType}&per_page=${perPage}&page=${pageNumber}`;

    try {
        const res = await fetch(url);
        const repoData = await res.json();
        if (res&&repoData) {
            setTotalRepositories(repoData.total_count)
            let data = repoData.items.map((x: any) => {
                let repo = {
                    Name: x?.name,
                    Description: x?.description,
                    Owner: x?.owner.login,
                    CreatedAt: x?.created_at,
                    UpdatedAt: x?.updated_at
                }
                return repo;
            })
            setRepositories(data)
        }
    } catch (error) {
        setTotalRepositories(0);
        setRepositories([])
        console.log(error,"catched error")
    }
}

const handleSortByChange = (event: any) => {
    setSortBy(event.target.value as string);
  };
  const handleSortTypeChange = (event: any) => {
    setSortType(event.target.value as string);
  };

    useEffect(() => {
        getRepositories();
    },[pageNumber])

    return ( 
        <Card>
            <div className="px-4 py-2">
                <Row>
                    <Col>
                        <Table >
                            <thead>
                                <tr>
                                    <th>
                                        <h2>Search By</h2>
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{borderBottomColor:"white"}}>
                                <tr>
                                    <td><TextField
                                        id="filled-search"
                                        label="Repository Name"
                                        type="search"
                                        variant="filled"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setRepoName(event.target.value);
                                          }}
                                    /></td>
                                    <td><TextField
                                        id="filled-search"
                                        label="Users Name"
                                        type="search"
                                        variant="filled"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setUserName(event.target.value);
                                          }}
                                    /></td>
                                    <td><TextField
                                        id="filled-search"
                                        label="language"
                                        type="search"
                                        variant="filled"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setLanguage(event.target.value);
                                          }}
                                    /></td>
                                    <td>
                                        <Button variant="contained" onClick={
                                            getRepositories
                                        }>Search</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sort by</InputLabel><Select
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
                                            <InputLabel id="demo-simple-select-label">Sort Type</InputLabel><Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sortType}
                                                label="sortType"
                                                onChange={handleSortTypeChange}
                                            >
                                                <MenuItem value={"asc"}>Ascending</MenuItem>
                                                <MenuItem value={"desc"}>Descending</MenuItem>
                                            </Select>
                                        </FormControl></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {totalRepositories ?
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {repositories.map((repo: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{repo.Name} <VisibilityIcon onClick={()=>{handleClick(repo.Name,repo.Owner)}}/> </td>
                                                <td>{repo.Description}</td>
                                                <td>{repo.Owner}</td>
                                                <td>{repo.CreatedAt}</td>
                                                <td>{repo.UpdatedAt}</td>
                                            </tr>)
                                    })}
                                    <tr>
                                        <td  colSpan={6}> 
                                            
                                            <Pagination count={Math.ceil(totalRepositories/perPage)} page={pageNumber} onChange={handleChange} />
                                        
                                        </td>
                                    </tr>
        
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div> :
                <div>
                    <h1> </h1>
                    </div>}
                </div>
        </Card>
    )
}


export default Repositories