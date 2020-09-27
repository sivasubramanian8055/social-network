import React, { Component } from 'react';
//import {Button,Image,Col,Row,Card, Container} from 'react-bootstrap';
//import Header from './Header';
  import 'bootstrap/dist/css/bootstrap.css'
import Postz from './Postz'
import  Web3 from 'web3';
//import logo from '../logo.png';
import Insta from '../abis/insta.json'
import './App.css';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlochainData()
  }

  async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
}
async loadBlochainData()
{
  const web3=window.web3
  const accounts =await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  //const networkId= await web3.eth.net.getId()
  //const networkData=Insta.networks[networkId]
  if(1){
      const insta=web3.eth.Contract(Insta.abi,"0x7beb687AcDC70bf0f97bf812242522b5E21B22FB")
      this.setState({insta:insta})
      const PostCount =await insta.methods.postCount().call()
      this.setState({PostCount:PostCount})
      for(var i=0;i<PostCount;i++)
       { const post = await insta.methods.posts(i).call()
        this.setState({
        posts:[...this.state.posts, post]
      })
      console.log(this.state.posts)
      }
}
  else{
    window.alert('Insta contract not deployed to detected network')
  }

}

captureContent = (event) => {
  this.setState({content:event.target.value})
}

captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })

    }
  }

onCommit = () => {
   console.log("Submitting file to ipfs...")
   console.log('buffer', this.state.buffer)
    ipfs.add(this.state.buffer, (error, result) => {
     console.log('Ipfs result', result)
     if(error) {
       console.error(error)
       return
     }
      this.state.insta.methods.create(this.state.content,result[0].hash).send({ from: this.state.account }).then((r) => {
      console.log(result[0].hash)
     })
   })
 }

constructor(props){
    super(props)
    this.state={
      account:'',
      insta:null,
      PostCount:null,
      posts:[],
      buffer:null,
      content:null
    }
  }
  render() {
    return (
      <div>
      <form onSubmit={this.onCommit}>
                <div className="form-group mr-sm-2">
                  <input
                    id="postContent"
                    type="text"
                    onChange={this.captureContent}
                    className="form-control"
                    placeholder="What's on your mind?"
                    required />
                </div>
                <input type='file' onChange={this.captureFile} />
                <button type="submit" className="btn btn-primary btn-block">Share</button>
              </form>
    <Postz post={this.state.posts}/>
    </div>
  );
  }
}
export default App;
