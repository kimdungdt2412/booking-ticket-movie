import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function MovieItem(props) {
  let { item } = props;
  const renderStar = () => {
    let ratingStar = [];
    if (item.danhGia) {
      let i = 0;
      for (i; i < Number(item.danhGia)/2; i++) {
        ratingStar.push(
          <img key={i} src="./img/star1.png" alt="star" className="smallStar" />
        );
      }
    }
    return ratingStar;
  };
  return (
    <div className="movie-item col-12 col-md-4 col-lg-3">
      <div className="movie__content">
        <Link className="movie__main" to={`/detail-movie/${item.maPhim}`}>
          <div className="img-movie">
            <img src={item.hinhAnh} alt={item.biDanh} />
            <div className="hoverInfo"></div>
            <div className="rating__star">
              <p className="point">{item.danhGia}</p>
              <p className="star">{renderStar()}</p>
            </div>
          </div>

          <div className="info">
            <div className="nameMovie hide">
              <h6>{item.tenPhim}</h6>
            </div>

            <div className="showHover">
              <Button className="buyTicket ">Mua vé</Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
