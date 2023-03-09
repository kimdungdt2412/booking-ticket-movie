
import { filmManagementService } from "../../services/FilmManagementService";
import { SET_CAROUSEL } from "./types/CarouselType";

export const getCarouselAction = () => {
  return async (dispatch) => {
    try {
      const result = await filmManagementService.layDanhSachBanner();
      // Đưa lên reducer
      // console.log("result", result);

      dispatch({
        type: SET_CAROUSEL,
        arrBanner: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
