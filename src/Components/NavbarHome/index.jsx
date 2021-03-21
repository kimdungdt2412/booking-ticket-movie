import React, { Component, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import { connect } from "react-redux";
import { actSetUserLogin } from "../../redux/action/userAction";
import Avatar from "@material-ui/core/Avatar";
import Swal from "sweetalert2";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";

function NavbarHome(props) {
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      props.setUserLogin(user);
    }
  }, []);

  function handleOnClick() {
    let { history } = props;

    localStorage.removeItem("user");
    props.setUserLogin({});
    const url = props.match;

    if (url.path === "/" || url.path === "/detail-muave/:id") {
      Swal.fire({
        icon: "success",
        title: "Đã đăng xuất",
        text: "",
      });
    } else {
      let timerInterval;
      Swal.fire({
        icon: "success",
        title: "Đã đăng xuất",
        text: "",
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },

        onClose: () => {
          history.push(`/`);
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          history.push(`/`);
        }
      });
    }
  }
  function renderLogin() {
    if (props.user.taiKhoan) {
      return (
        <div className="header__right__content">
          <div className="accountMenu dropdown">
            <a
              className="avatarAccount"
              href="#"
              role="button"
              id="dropdownMenuUser"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="./img/kirby.jpg" alt="avatar" />
              <span className="name">{props.user.hoTen}</span>
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
              <p className="name">{props.user.hoTen}</p>
              <Link className="dropdown-item" to="/info-user">
                <SettingsIcon style={{ fontSize: 30 }} />
                <span>Thông tin tài khoản</span>
              </Link>
              <Link className="dropdown-item" to="/" onClick={handleOnClick}>
                <ExitToAppIcon style={{ fontSize: 30 }} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="header__right__content">
            <NavLink to="./sign-in/" className="login">
              <img src="../../../img/avatar.png" alt="tix.vn" />
              <p>Đăng Nhập</p>
            </NavLink>
            <NavLink to="./sign-up/" className="login">
              <img src="../../../img/avatar.png" alt="tix.vn" />
              <p>Đăng Ký</p>
            </NavLink>
          </div>
        </>
      );
    }
  }

  function renderLoginMobile() {
    if (props.user.taiKhoan) {
      return (
        <>
          <div className="accountMenu dropdown">
            <a
              className="avatarAccount"
              href="#"
              role="button"
              id="dropdownMenuUser"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="./img/kirby.jpg" alt="avatar" />
              <span className="name">{props.user.hoTen}</span>
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
              <p className="name">{props.user.hoTen}</p>
              <Link className="dropdown-item" to="/info-user">
                <SettingsIcon style={{ fontSize: 30 }} />
                <span>Thông tin tài khoản</span>
              </Link>
              <Link className="dropdown-item" to="/" onClick={handleOnClick}>
                <ExitToAppIcon style={{ fontSize: 30 }} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/sign-in/" className="isLogin">
            <img src="../../../img/avatar.png" alt="tix.vn" />
            <p>Đăng Nhập</p>
          </NavLink>
        </>
      );
    }
  }
  const openSideMenu = () => {
    document.getElementById("sideMenu").style.display = "block";
    document.getElementsByClassName("sideNav")[0].className =
      "sideNav fadeInRight";
  };

  const closeSideMenu = () => {
    document.getElementsByClassName("sideNav")[0].className =
      "sideNav fadeOutRight";

    setTimeout(() => {
      document.getElementById("sideMenu").style.display = "none";
    }, 400);
  };

  return (
    <header className="header fixed-top" id="header">
      <div className="header__content row">
        <div className="header__left col-6 col-md-1 col-lg-2 col-xl-4">
          <Link to="/" className="header__logo">
            <img src="../../../img/web-logo.png" alt="tix.vn" />
          </Link>
        </div>
        <div className="header__center col-12 col-md-6 col-lg-6 col-xl-4">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link active" to="#text">
                Lịch Chiếu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/list-movie">
                Danh sách phim
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Cụm rạp
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Tin Tức
              </Link>
            </li>
          </ul>
        </div>
        <div className="header__right col-6 col-md-5 col-lg-4 col-xl-4">
          {renderLogin()}
        </div>
        <div className="header__right__mobile col-6">
          <button className="btn" id="open-sideMenu" onClick={openSideMenu}>
            <img src="./img/menu-options.png" alt="tix.vn" />
          </button>
        </div>

        <div id="sideMenu">
          <nav className="sideNav">
            <span href="#" className="login ">
              {renderLoginMobile()}
              <button
                className="close-btn"
                id="close-btn"
                onClick={closeSideMenu}
              >
                <img
                  className="close-btn"
                  src="./img/next-session.png"
                  alt="tix.vn"
                />
              </button>
            </span>
            <Link className="sideNav__item" to="#" onClick={closeSideMenu}>
              Lịch Chiếu
            </Link>
            <Link className="sideNav__item" to="#" onClick={closeSideMenu}>
              Cụm rạp
            </Link>
            <Link className="sideNav__item" to="#" onClick={closeSideMenu}>
              Tin Tức
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserLogin: (user) => {
      dispatch(actSetUserLogin(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarHome));
