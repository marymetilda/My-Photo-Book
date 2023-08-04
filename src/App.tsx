import SearchInput, { Item } from "./SearchInput";
import Photobook from "./Photobook";

import useGetImageDataMutation from "./UseGetImageDataMutation";
import { useEffect } from "react";

function App() {
  const { mutate, data: imageData } = useGetImageDataMutation();

  useEffect(() => {
    mutate("rose");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageURLs = imageData?.hits.map(
    (it: Item) => it.webformatURL
  ) as string[];

  const onChangeEvent = (imageValue: string) => {
    console.log({ imageValue });
    mutate(imageValue);
  };

  return (
    <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden">
      <h1 className="text-center text-2xl font-bold m-2">
        My React Photo book
      </h1>
      <SearchInput onChangeEvent={onChangeEvent} />
      <Photobook imageData={imageURLs || []} />
    </div>
  );
}

export default App;
