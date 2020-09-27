import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Postz extends Component {

  render() {
      return (
        <div>
        {
         this.props.postz.map((post,key)=>{
                return(
                  <div class="container pt-3 ">

                  <div class="card  w-75 mx-auto">
                  <img src={`https://ipfs.infura.io/ipfs/${post.ipfsHash}`} class="card-img-top img-fluid" alt="Unknown Error"></img>
                  <div class="card-body">
                  <p class="card-text">{post.description}</p>
                  </div>
                  </div>
                  </div>

                );
        })
      }
      </div>
      );
    }
}
    export default Postz;
