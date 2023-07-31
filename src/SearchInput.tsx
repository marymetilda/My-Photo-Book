import { SyntheticEvent, useRef } from "react";
import axios from "axios";

interface Item {
  collections: number;
  comments: number;
  downloads: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

const API_KEY = "20524329-a56f712174c95d9a33f77f075";
const SearchInput = (props: { setImageData: (data: string[]) => void }) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const changeHandler = (e: SyntheticEvent) => {
    clearTimeout(timeout.current);

    // Query images after timeout
    timeout.current = setTimeout(async () => {
      const el = e.target as HTMLInputElement;
      if (el.value.length > 0) {
        const res = await axios.get("https://pixabay.com/api/", {
          params: {
            key: API_KEY,
            q: encodeURIComponent(el.value),
            image_type: "photo",
            per_page: 24,
            orientation: "vertical",
          },
        });
        props.setImageData(res.data.hits.map((it: Item) => it.webformatURL));
        console.log(res.data);
      }
    }, 600);
  };

  return (
    <input
      className="rounded-lg block my-2 py-1 bg-white w-64 text-lg text-center text-black"
      type="text"
      onChange={changeHandler}
    />
  );
};

export default SearchInput;
