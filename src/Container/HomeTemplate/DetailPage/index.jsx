import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actGetInfoMovieApi } from "../../../redux/action/movie";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import { HashLink } from 'react-router-hash-link';

const override = css`
  display: block;
  margin: 300px auto;
  text-align: center;
`;

function DetailPage(props) {
  let location = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    console.log(location.id);
    props.getInfoMovie(location.id);
  }, []);

  useEffect(() => {
    setMovie(props.infoMovie);
  }, [props.infoMovie]);

  function date(){
      let date = new Date(movie.ngayKhoiChieu);
      let _date = date.toLocaleDateString();
      return _date;
  }
  function renderInfoMovie() {
    if (props.loading) {
      return (
        <div className="sweet-loading">
          <BeatLoader css={override} size={25} color={"#fb4226"} />
        </div>
      );
    } else {
      return (
        <div className="backgroundMain">
          <div className="styleBlur">
            <img
              className="img-background "
              src={movie.hinhAnh}
              alt={movie.biDanh}
            />
          </div>

          <div
            className="styleGradient"
            style={{
              background:
                "linear-gradient(to top, rgb(10, 32, 41), transparent 100%)",
            }}
          />

          <div className="detailMainInfo row">
            <div className="posterMovie col-sm-3 col-xs-4">
              <div
                className="posterMovie__img"
                style={{
                  backgroundImage: `url(${movie.hinhAnh})`,
                }}
              >
                <button
                  className="btn trailer"
                  data-toggle="modal"
                  data-target="#movieTrailer"
                >
                  <img src="../img/play-video.png" alt="tix" />
                </button>
              </div>
            </div>
            <div className="infoMain col-sm-5">
                <div className="infoMain__time">
                    <span>{date()}</span>
                </div>
                <div className="infoMain__name">
                    <span>{movie.tenPhim}</span>
                </div>
                {movie.lichChieu && movie.lichChieu.length > 0 ? (<span>{movie.lichChieu[0].thoiLuong} phút</span>) : (<></>)}
              
                <br/>
                <HashLink to='#buyTicket'>
                <button className="btn buyTicket">
                        Mua vé
                </button>
                </HashLink>
                
            </div>
          
          </div>

        </div>
      );
    }
  }
  return (
    <div className="detail-movie">
      <div
        className="modal fade"
        id="movieTrailer"
        tabIndex={-1}
        aria-labelledby="modalVideo"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body" id="modalVideo">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img src="../img/close.png" />
              </button>
              <iframe
                width="100%"
                height="85%"
                src={movie.trailer}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      </div>
      {renderInfoMovie()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    infoMovie: state.movieReducer.infoMovie,
    loading: state.movieReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoMovie: (id) => {
      dispatch(actGetInfoMovieApi(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
