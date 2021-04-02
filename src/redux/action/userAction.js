import axios from "axios";
import * as ActionType from "./../constant/constant";
import Swal from "sweetalert2";
import {toast} from 'react-toastify'


export const actLoginUserApi = (user, history) => {
    return (dispatch) => {
        dispatch(actLoginUserRequest())
        axios({
                method: "POST",
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
                data: user,
            }).then((result) => {
                dispatch(actLoginUserSuccess(result.data))
                localStorage.setItem("user", JSON.stringify(result.data));

                toast.success('Đăng nhập thành công', {
                    position: "top-right",
                    autoClose: 1000,
                    });
                history.push('/')
            })
            .catch((error) => {
                console.log(error.response.data)
                dispatch(actLoginUserFailed())
                toast.error(`${error.response.data}`, {
                    position: "top-right",
                    autoClose: 2000,
                })
            });
    };
};

const actLoginUserRequest = () => {
    return {
        type: ActionType.USER_LOGIN_REQUEST,

    }
}

const actLoginUserSuccess = (data) => {
    return {
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: data

    }
}

const actLoginUserFailed = () => {
    return {
        type: ActionType.USER_LOGIN_FAILED,

    }
}


export const actSetUserLogin = (user) => {
    return {
        type: ActionType.SET_USER_LOGIN,
        payload: user,
    }
}
export const actLoginAdmin = (user, history) => {
    axios({
            method: "POST",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
            data: user,
        })
        .then(result => {
            if (result.data.maLoaiNguoiDung === "QuanTri") {
                localStorage.setItem("UserAdmin", JSON.stringify(result.data));
                history.push("/dashboard");
                Swal.fire({
                    icon: "success",
                    title: "Đăng nhập thành công",
                    text: "",
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tài khoản không có quyền truy cập!",
                    timer: 4000,
                });
            }
        }).catch(err => {
            console.log(err)
            toast.error(`Đăng nhập thất bại`, {
                position: "top-right",
                autoClose: 2000,
            })
        })
}


export const actGetListUser = () => {
    return dispatch => {
        axios({
            method: "GET",
            url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP05",
        }).then(result => {
            dispatch({
                type: ActionType.GET_LIST_USER,
                listUser: result.data,
            });
        }).catch(err => {
            console.log(err);
        })
    }
}

export const actGetInfoUser = user => {
    return dispatch => {
        axios({
                method: "POST",
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
                data: user,
            })
            .then(result => {
                dispatch(actGetInfoUserSuccess(result.data))
            })
            .catch(err => {
                console.log(err);
            });
    }
}

const actGetInfoUserSuccess = (data) => {
    return {
        type: ActionType.GET_INFO_USER,
        payload: data,
    }
}
export const actResetInfoLoad = (stateLoad) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.RESET_LOAD_INFO_USER,
            loadingInfo: stateLoad,
        });
    };
};

export const actSignUpApi = (user, history) => {
    return dispatch => {
       dispatch(actSignUpRequest())
        axios({
                method: "POST",
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
                data: user,

            })
            .then((result) => {
                
                dispatch(actSignUpSuccess())
                toast.success(`Đăng ký thành công`, {
                    position: "top-right",
                    autoClose: 2000,
                })
                history.push('/sign-in')
            })
            .catch((err) => {
                toast.error(`Đăng kí thất bại`, {
                    position: "top-right",
                    autoClose: 2000,
                })
                dispatch(actSignUpFailed())
                console.log(err)
                
            });
    }
}

const actSignUpRequest = () => {
    return {
        type: ActionType.USER_SIGN_UP_REQUEST
    }
}

const actSignUpSuccess = () => {
    return {
        type: ActionType.USER_LOGIN_SUCCESS
    }
}

const actSignUpFailed = () => {
    return {
        type: ActionType.USER_LOGIN_FAILED
    }
}