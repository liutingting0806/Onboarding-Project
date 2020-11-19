import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import { Input,  Row, Col, Label,ListGroup, ListGroupItem, ListGroupItemText, Card, CardBody, CardTitle, CardSubtitle,} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // 引入axios库


// import App from './App';
// import reportWebVitals from './reportWebVitals';
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {/* TODO */}
//       </button>
//     );
//   }
// }
// class NavList extends React.Component{
//   constructor(props){
//     console.log(props)
//       super(props);
//       // 在构造器函数中进行this坏境的绑定
//       // this.state = {currentIndex:'new'}
//       // this.handleNavClick = this.handleNavClick.bind(this);
//   }
  
//   render(){
//       return (
//         listData.map((data,index) =>
//         <li className="nav-item" key={index}>
//           <button className={`nav-link ${data===this.props.currentIndex?"active":null}`} name={data} onClick={this.props.handleNavClick}>{data}</button>
//         </li>
//         )
//       );
//   }
// } 
// const listData = ['New', 'Contacted','Replied', 'Offer']
// function NavList(props){
//   return listData.map((data,index) =>
//         <li className="nav-item" key={index}>
//           <button className={`nav-link ${data===props.currentIndex?"active":null}`} name={data} onClick={handleNavClick}>{data}</button>
//         </li>
//         // <li className="nav-item">
//         //   <button className="nav-link" className={`nav-link ${'Contacted'===this.state.currentIndex?"active":''}`} name="Contacted" onClick={this.handleNavClick}>Contacted</button>
//         // </li>
//         // <li className="nav-item">
//         //   <button className="nav-link"  className={`nav-link ${'Replied'===this.state.currentIndex?"active":''}`} name="Replied" onClick={this.handleNavClick}>Replied</button>
//         // </li>
//         // <li className="nav-item">
//         //   <button className="nav-link" className={`nav-link ${'offer'===this.state.currentIndex?"active":''}`} name="offer" onClick={this.handleNavClick}>Offer</button>
//         // </li>
//     )  
// }
function CardData (props){
  if(props.listData.length === 0 ){
    return <div style={{height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}><h6>No search results.......</h6></div>
  }
  return props.listData.map((data) =>
        <li key={data.id}>
          <Card>
            {/* <CardImg left width="10" src="/assets/default-avatar.png" alt="Card image cap" /> */}
            <CardBody>
              <img width="70px" src="/assets/default-avatar.png" alt="Card image cap" />
              <CardTitle tag="h5">Name: {data.user_name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Email: {data.email}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Address: {data.address}</CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Skills: {data.skill_name}</CardSubtitle>
              {/* <CardText> */}
                <p>Position: {data.position}</p>
                <p>Express: {data.explain}</p>
              {/* </CardText> */}
            </CardBody>
          </Card>
        </li>
      );
}
function SkillOption(props){
  if(props.listData.length !== 0 ){
    return props.listData.map((data) =>
      <option key={data.id} value={data.skill_name}>{data.skill_name}</option>
    );
  }
  return null
}
function JobOption(props){
  console.log('job------',props);
  if(props.listData.length !== 0 ){
    return props.listData.map((data) =>
      <option key={data.id} value={data.job_name}>{data.job_name}</option>
    );
  }
  return null
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: '',titleSelectValue:'', killsSelectValue:'', filterValue:'', listItems:[],skillItems:[],jobItems:[],currentIndex:''};
    this.handleChange = this.handleChange.bind(this);
    this.baseUrl = 'http://localhost:8000/api/user';
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }
  
  handleChange(e) {
    const target = e.target;
    let typeMap = new Map([['selectTitle','position'],['selectKills','skill_name'],['search','searchName']]);
    this.setState({filterValue: target.value});
    if(typeMap.get(target.name) === 'searchName'){
      // return;
      this.setState({inputValue: target.value});
    }else if(typeMap.get(target.name) === 'position'){
      this.setState({titleSelectValue: target.value});
      this.search(typeMap.get(target.name),target.value)
    }else{
      this.setState({killsSelectValue: target.value});
      this.search(typeMap.get(target.name),target.value)
    }
    
  }
  handleKeyDown(e){
    if (e.keyCode === 13) {
      this.search('user_name',e.target.value)
		}
  }
  handleNavClick(e){
    e.preventDefault();
    console.log(e);
    this.setState({currentIndex:e.target.name});
    this.searchData('type',e.target.name);
  }
  search(type,val){
    console.log(type)
    console.log(val);
    this.searchData(type,val);
    
  }
  searchData(type,val){
    // this.setState({currentIndex:'0'})
    //post请求
    // let params = {
    //   user_name:type==='user_name' ? val:this.state.inputValue,
    //     skill_name:type==='skill_name'? val:this.state.killsSelectValue,
    //     position:type==='position'? val:this.state.titleSelectValue
    // }
    // axios.post(`${this.baseUrl}/getUser`,params)
    //   .then(res => {
    //     console.log(res);
    //     let goodlists = res.data;
    //     if(goodlists){
    //       this.setState({listItems: res.data});
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //get请求
    let params = {
      user_name:type==='user_name' ? val:this.state.inputValue,
        skill_name:type==='skill_name'? val:this.state.killsSelectValue,
        position:type==='position'? val:this.state.titleSelectValue,
        type:type==='type'?val : this.state.currentIndex
    };
    axios.get(`${this.baseUrl}/getUser`,{params})
      .then(res => {
        console.log(res);
        let goodlists = res.data;
        if(goodlists){
          this.setState({listItems: res.data});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  getSkillList(){
    axios.get(`${this.baseUrl}/getSkill`)
    .then(res => {
      console.log(res);
      let goodlists = res.data;
      goodlists.unshift({id:0,skill_name:''})
      if(goodlists){
        this.setState({skillItems: res.data});
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  getJobList(){
    axios.get(`${this.baseUrl}/getJobs`)
    .then(res => {
      console.log(res);
      let goodlists = res.data;
      goodlists.unshift({id:0,job_name:'NONE'})
      if(goodlists){
        this.setState({jobItems: res.data});
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  componentDidMount(){
    // 在这里进行Ajax数据请求，axios,fetch,jquery Ajax或者request都可以
    // 使用axios完成ajax数据请求
   this.getSkillList();
   this.getJobList();

  }
  render() {
    return (
      <div id="all-lay">
        <Row className="title" xs="1">
        <Col className="title-container one">logo title  someThings</Col>
        <Col className="title-container two"><Input type='text' placeholder="userName" name="search" value={this.state.inputValue} onChange={this.handleChange} onKeyDown={this.handleKeyDown} className="title-container-search" ></Input></Col>
      </Row>
      <Row className="body">
        <Col xs="4" sm="4"> 
          <div className="content-left-filter">
            <ListGroup>
              <label>Filter Information</label>
              <ListGroupItem>
                <ListGroupItemText>
                {/* <FormGroup> */}
                  <Label for="exampleSelect">Skills</Label>
                  <Input type="select" name="selectKills" id="exampleSelect" value={this.state.killsSelectValue} onChange={this.handleChange} >
                    <SkillOption listData={this.state.skillItems}></SkillOption>
                    {/* <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="node">node.js</option> */}
                  </Input>
                {/* </FormGroup> */}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemText>
                {/* <FormGroup> */}
                  <Label for="exampleSelectMulti">Job Titles</Label>
                  <Input type="select" name="selectTitle"   onChange={this.handleChange}>
                    <JobOption listData={this.state.jobItems}></JobOption>
                    {/* <option value="developer">Developer</option>
                    <option value="ui">UI</option>
                    <option value="productManager">Product manager</option>
                    <option value="developmentManager">Development manager</option>
                    <option value="engineer">Engineer</option> */}
                  </Input>
                {/* </FormGroup> */}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemText>
                {/* <FormGroup> */}
                  <Label for="exampleSelectMulti">Podition</Label>
                  <Input type="select" name="selectTitle" disabled  onChange={this.handleChange}>
                    <JobOption listData={this.state.jobItems}></JobOption>
                    <option value="NONE">NONE</option>
                    <option value="ui">UI</option>
                    <option value="productManager">Product manager</option>
                    <option value="developmentManager">Development manager</option>
                    <option value="engineer">Engineer</option>
                  </Input>
                {/* </FormGroup> */}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemText>
                {/* <FormGroup> */}
                  <Label for="exampleSelectMulti">Age</Label>
                  <Input type="select" name="selectTitle"  disabled  onChange={this.handleChange}>
                    <JobOption listData={this.state.jobItems}></JobOption>
                    <option value="NONE">NONE</option>
                    <option value="ui">UI</option>
                    <option value="productManager">Product manager</option>
                    <option value="developmentManager">Development manager</option>
                    <option value="engineer">Engineer</option>
                  </Input>
                {/* </FormGroup> */}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemText>
                {/* <FormGroup> */}
                  <Label for="exampleSelectMulti">Education</Label>
                  <Input type="select" name="selectTitle"  disabled  onChange={this.handleChange}>
                    <JobOption listData={this.state.jobItems}></JobOption>
                    <option value="NONE">NONE</option>
                    <option value="ui">UI</option>
                    <option value="productManager">Product manager</option>
                    <option value="developmentManager">Development manager</option>
                    <option value="engineer">Engineer</option>
                  </Input>
                {/* </FormGroup> */}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemText>
                {/* <FormGroup> */}
                  <Label for="exampleSelectMulti">Industry</Label>
                  <Input type="select" name="selectTitle"  disabled  onChange={this.handleChange}>
                    <JobOption listData={this.state.jobItems}></JobOption>
                    <option value="NONE">NONE</option>
                    <option value="ui">UI</option>
                    <option value="productManager">Product manager</option>
                    <option value="developmentManager">Development manager</option>
                    <option value="engineer">Engineer</option>
                  </Input>
                {/* </FormGroup> */}
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        <Col xs="8" sm="8">
          <div className="content-left-filter">
            {/* <NavList></NavList> */}
            <ul className="conten-candidate-nav">
              <li className="nav-item">
                <button className={`nav-link ${'0'===this.state.currentIndex?"active":null}`} name="0" onClick={this.handleNavClick}>New</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" className={`nav-link ${'1'===this.state.currentIndex?"active":''}`} name="1" onClick={this.handleNavClick}>Contacted</button>
              </li>
              <li className="nav-item">
                <button className="nav-link"  className={`nav-link ${'2'===this.state.currentIndex?"active":''}`} name="2" onClick={this.handleNavClick}>Replied</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" className={`nav-link ${'3'===this.state.currentIndex?"active":''}`} name="3" onClick={this.handleNavClick}>Offer</button>
              </li>
            </ul>
            <ul className="content-list-scroll"><CardData listData={this.state.listItems} /></ul>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
