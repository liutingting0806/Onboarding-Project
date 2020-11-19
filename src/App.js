// import logo from './logo.svg';s
import './App.css';
import { Container,  Row, Col,Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { attachTypeApi } from 'antd/lib/message';

function App() {
  return (
    <div className="App">
      {/* <Container> */}
      <Row className="title" xs="1">
        <Col className="title-container one">logo title  someThings</Col>
        <Col className="title-container two"><Input placeholder="userName" onChange="aaa()"></Input></Col>
      </Row>
      <Row className="body">
        <Col>.col</Col>
        <Col>.col</Col>
      </Row>
      {/* </Container> */}
    </div>
  );
  
}


export default App;
