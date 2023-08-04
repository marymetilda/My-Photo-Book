import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ImageData } from "./SearchInput";

function useGetImageDataMutation() {
  return useMutation(["Image data"], async (imageToBeShown: string) => {
    const API_KEY = "20524329-a56f712174c95d9a33f77f075";
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: API_KEY,
        q: encodeURIComponent(imageToBeShown),
        image_type: "photo",
        per_page: 24,
        orientation: "vertical",
      },
    });

    const imageData: ImageData = response.data;
    return imageData;
  });
}

export default useGetImageDataMutation;
