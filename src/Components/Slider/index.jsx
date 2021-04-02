import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import { connect } from "react-redux";
import { actGetListMovieApi } from "../../Container/HomeTemplate/ListMoviePage/module/action";
import { Link } from "react-router-dom";
import MovieItem from "../Movie";

const settings = {
  infinite: true,
  slidesToShow: 4,
  speed: 500,
  slidesToScroll: 4,
  rows: 2,
  adaptiveHeight: false,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        
      
      },
    },
    {
        breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      
      },
    }
  ],
};

function SliderMovie(props) {
  useEffect(() => {
    if (props.listMovie.length === 0) {
      props.getListMovie();
    }
  }, []);

  function renderSlider() {
    if (props.listMovie.length > 0) {
      return props.listMovie.map((item, index) => {
        return (
            <div className="slider-item" key={index}>
                <MovieItem item={item}/>
            </div>
          
        );
      });
    }
  }
  return (
    <div className="movie-slick" id='homeMovies'>
      <Link to="/list-movie" className='btn btn-all'>Xem tất cả</Link>
      <Slider {...settings}>{renderSlider()}</Slider>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListMovie: () => {
      dispatch(actGetListMovieApi());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    listMovie: state.listMovieReducer.list,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SliderMovie);
