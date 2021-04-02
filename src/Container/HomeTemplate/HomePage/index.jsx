import React, { Component } from "react";
import SliderMovie from "../../../Components/Slider";
import Carousel from "../Carousel";


export default class HomePage extends Component {
  render() {
    
    return (
      <div>
        <Carousel />

        <div id='movieList'>
          <SliderMovie/>
        </div>
        

        
      </div>
    );
  }
}
