import React from "react";
import MovieItem from "../../../Components/Movie";
import { useState, useEffect } from "react";
import {connect} from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from "@emotion/core";
import {actGetListMovieApi} from './module/action'


const override = css`
  display: block;
  margin: 150px auto;
  text-align: center;
  

  
`;

function ListMoviePage(props) {
  const [state, setstate] = useState();
  
  useEffect(() => {
  
    props.getListMovie();
    
  }, [])

  useEffect(() => {
    setstate(props.listMovie)
  }, [props.listMovie])
  

  const renderListMovie = () => {
      if(props.loading){
        return (
            <div className="sweet-loading">
                <BeatLoader css={override} size={25} color={"#fb4226"} />
            </div>

        )
      }
     
      if(state){
          return state.map((item) => {
              return (
                <div className="col-12 col-md-4 col-lg-3" key={item.maPhim}>
                    <MovieItem  item={item}/>
                </div>
              )
              
              
          })
      }
  }
  return (
    <div className="listmovie">
      <div className="listmovie_nav">
        <h4 className="nowShowing">Đang chiếu</h4>
        <input type="text" placeholder="search" />
      </div>
      <div className="movie-list row">
        {renderListMovie()}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListMovie: () => {
            dispatch(actGetListMovieApi())
        }
    }
}
const mapStateToProps = (state) => {
    return {
        listMovie: state.listMovieReducer.list,
        loading: state.listMovieReducer.loading,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMoviePage)