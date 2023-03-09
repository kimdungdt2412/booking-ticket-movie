import React, { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";

import { materialTheme } from "./styles";
import TextField from "./Textfield";
import { useStyles } from "./styles";
import Button from "@material-ui/core/Button";
import { GPID } from "../../util/settings/config";
export default function FormInput({ selectedPhim, onUpdate, onAddMovie }) {
  const classes = useStyles();

  const [srcImage, setSrcImage] = useState(selectedPhim?.hinhAnh);
  const setThumbnailPreviews = (e) => {
    let file = e.target;
    // Tạo đối tượng để đọc file
    var reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = function () {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(reader.result);
    };
  };

  const movieSchema = yup.object().shape({
    tenPhim: yup.string().required("*Không được bỏ trống!"),
    trailer: yup
      .string()
      .required("*Không được bỏ trống!")
      .matches(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        "*Sai link youtube"
      ),
    hinhAnh: yup.string().required("*Chưa chọn hình!"),
    moTa: yup
      .string()
      .required("*Không được bỏ trống!")
      .min(50, "*Mô tả cần 50 ký tự trở lên!"),
    ngayKhoiChieu: yup.string().required("*Chưa chọn ngày!"),
    danhGia: yup
      .number()
      .integer()
      .required("*Không được bỏ trống!")
      .min(0, "*Điểm đánh giá phải từ 0 đến 10")
      .integer("*Điểm đánh giá phải từ 0 đến 10")
      .max(10, "*Điểm đánh giá phải từ 0 đến 10"),
  });

  const handleSubmit = (movieObj) => {
    movieObj = {
      ...movieObj,
      ngayKhoiChieu: movieObj.ngayKhoiChieu.toLocaleDateString("en-GB"),
    };

    if (selectedPhim.maPhim) {
      onUpdate(movieObj);
      return;
    }
    // Xoá đi các thuộc tính hide
    const newMovieObj = { ...movieObj };
    delete newMovieObj.maPhim;
    delete newMovieObj.biDanh;
    delete newMovieObj.danhGia;

    onAddMovie(newMovieObj);
  };

  return (
    <Formik
      initialValues={{
        maPhim: selectedPhim.maPhim,
        tenPhim: selectedPhim.tenPhim,
        biDanh: selectedPhim.biDanh,
        trailer: selectedPhim.trailer,
        hinhAnh: selectedPhim.hinhAnh,
        moTa: selectedPhim.moTa,
        maNhom: GPID,
        ngayKhoiChieu: selectedPhim?.ngayKhoiChieu
          ? new Date(selectedPhim.ngayKhoiChieu)
          : new Date(),
        danhGia: selectedPhim.danhGia,
      }}
      validationSchema={movieSchema}
      onSubmit={handleSubmit}
    >
      {(formikProp) => (
        <Form className={classes.form}>
          <div className="form-group">
            <TextField name="tenPhim" fullWidth label="Tên Phim" />
          </div>
          <div className="form-group">
            <TextField fullWidth name="trailer" label="Trailer" />
          </div>
          <div className="form-group">
            <label>Hình ảnh&nbsp;</label>
            <ErrorMessage
              name="hinhAnh"
              render={(msg) => <span className="text-danger">{msg}</span>}
            />
            <div className="form-row">
              <div className="col-2">
                {srcImage ? (
                  <img
                    src={srcImage}
                    id="image-selected"
                    alt="movie"
                    className="img-fluid rounded"
                  />
                ) : (
                  <ImageOutlinedIcon style={{ fontSize: 60 }} />
                )}
              </div>
              <div className="col-10">
                <input
                  type="file"
                  accept=".jpg,.png"
                  id="contained-button-file"
                  className="form-control"
                  // thêm async await vào để setFieldValue xong mới thêm hình ảnh không lỗi update sever
                  onChange={async (e) => {
                    await formikProp.setFieldValue(
                      "hinhAnh",
                      e.target.files[0]
                    );
                    setThumbnailPreviews(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              name="moTa"
              label="Mô tả"
              id="fullWidth"
              multiline={true}
              rows={2}
            />
          </div>
          <div className="form-row mb-5">
            <div className="col-6">
              {" "}
              <div className="form-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <ThemeProvider theme={materialTheme}>
                    <KeyboardDatePicker
                      fullWidth
                      inputVariant="outlined"
                      label="Ngày khởi chiếu"
                      value={formikProp.values.ngayKhoiChieu}
                      onChange={(date) =>
                        formikProp.setFieldValue("ngayKhoiChieu", date)
                      }
                      format="MM/dd/yyyy"
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="col-6">
              <div
                className="form-group"
                hidden={selectedPhim.maPhim ? false : true}
              >
                <TextField
                  label="Đánh giá"
                  name="danhGia"
                  type="number"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
