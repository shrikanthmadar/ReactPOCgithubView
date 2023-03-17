import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from 'react-bootstrap/Table';

function Repository() {
    const {owner,name}= useParams()
    const BASE_URL = "https://api.github.com";
    // const owner='';
    // const name='';
    const [repo,setRepo]=useState<any>();

    useEffect(()=>{
        getRpository()
    },[owner, name])

    async function getRpository(){
        const url = `${BASE_URL}/repos/${owner}/${name}`;
        try {
            const res = await fetch(url);
            const repoData = await res.json();
            setRepo(repoData)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            <div style={{ padding: "10px" }}>
                <AppBar position="static" style={{backgroundColor:"white",color:"black"}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h1>GitHub Repository Details</h1>
                        </Typography>
                        
                    </Toolbar>
                </AppBar></div>
            <div style={{padding:"10px"}}>
                <Row>
                    <Col md={4} sm={6} xs={6}>
                        <Card style={{height:'100%'}}>
                            <div style={{padding:"10px"}}>
                            <img src={repo?.owner?.avatar_url} alt={`${repo?.owner?.login} 's profile photo`} style={{height:'auto',maxWidth:"100%"}}/>
                            </div>
                        </Card>
                        </Col>
                    <Col md={8} sm={6} xs={6}>
                        <Card>
                            <div style={{padding:"10px"}}>
                                <Table striped>
                                    <tbody>
                                        <tr>
                                            <td>Repository name</td>
                                            <td>{repo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>{repo?.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Owner</td>
                                            <td> {repo?.owner.login}</td>
                                        </tr>
                                        <tr>
                                            <td>Created at</td>
                                            <td>{repo?.created_at}</td>
                                        </tr>
                                        <tr>
                                            <td>Update at</td>
                                            <td>{repo?.updated_at}</td>
                                        </tr>
                                        <tr>
                                            <td>View on GitHub</td>
                                            <td><a href={repo?.html_url}>{repo?.html_url}</a></td>
                                        </tr>
                                        <tr>
                                            <td>Languages</td>
                                            <td>{repo?.language}</td>
                                        </tr>
                                        <tr>
                                            <td>Stars</td>
                                            <td>{repo?.stargazers_count}</td>
                                        </tr>
                                        <tr>
                                            <td>Forks</td>
                                            <td>{repo?.forks_count}</td>
                                        </tr>
                                        <tr>
                                            <td>Watchers</td>
                                            <td>{repo?.watchers_count}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Repository;