import { SyntheticEvent, useRef } from "react";
export interface ImageData {
  hits: Item[];
  totalHits: number;
  total: number;
}

export interface Item {
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

interface props {
  onChangeEvent: (images: string) => void;
}

const SearchInput = ({ onChangeEvent }: props) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const changeHandler = (e: SyntheticEvent) => {
    clearTimeout(timeout.current);

    // Query images after timeout
    timeout.current = setTimeout(async () => {
      const el = e.target as HTMLInputElement;
      if (el.value.length > 0) {
        onChangeEvent(el.value);
      }
    }, 600);
  };

  return (
    <input
      placeholder="search"
      className="rounded-lg block my-2 py-1 bg-white w-64 text-lg text-center text-black"
      type="text"
      onChange={changeHandler}
    />
  );
};

export default SearchInput;
