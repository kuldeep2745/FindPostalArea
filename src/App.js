import React, { Component } from "react";
import axios from "axios";
import ComponentOne from "./ComponentOne";
import {
  Button,
  Navbar,
  Container,
  FormControl,
  Form,
  Row,
  Col,
  Table
} from "react-bootstrap";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostalCode: 0,
      Message: "",
      Status: "",
      data: [],
    };
   
  }

  OnChangeHandler = (e) => {
   
    this.setState({ [e.target.name]: e.target.value });
  };
  OnSearchData = () => {
    axios
      .get(`https://api.postalpincode.in/pincode/${this.state.PostalCode}`)
      .then((response) => {
        console.log(response.data);
        let msg = response.data[0].Message;
        let PostOffice = response.data[0].PostOffice;
        let Status = response.data[0].Status;
        this.setState({ Message: msg, Status: Status, data: PostOffice });
      })
      .catch((error) => { } );
  };

  componentDidMount() {
    let count =  this.countDigit(this.state.PostalCode)
    if(count === 6){
      this.OnSearchData();
    }
  }





  countDigit=(n)=>
  {
      let count = 0;
      while (n != 0)
      {
          n = Math.floor(n / 10);
          ++count;
      }
      return count;
  }

  render() {
  
   
    let ListOfPostalCode =
      this.state.data.length !== 0 
        ? this.state.data.map((post, key) => (
            <ComponentOne key={key} postal={post} />
          ))
        : "loading...";

        
        
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Row style={{ width: "100%" }}>
              <Col >
                <Navbar.Brand href="#">Find Postal Area</Navbar.Brand>
              </Col>

              <Col >
                <Form className="d-flex justify-content-between">
                  <FormControl
                    type="number"
                    placeholder="search Your Postal Location...."
                    name="PostalCode"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => this.OnChangeHandler(e)}
                  />
                  <Button variant="outline-success" onClick={this.OnSearchData}>Search</Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Container className="mt-5" >
          <Table striped bordered hover variant="dark">
          
            <thead>
              <tr>
                <th>#Pincode</th>
                <th>Name</th>
                <th>Block</th>
                <th>City</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
            {ListOfPostalCode}
            </tbody>
          </Table>
        </Container>

   
      </>
    );
  }
}
