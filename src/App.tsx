import { useState } from "react";
import SearchInput from "./SearchInput";
import Photobook from "./Photobook";

function App() {
  const [data, setData] = useState<{ imageData: string[] }>({ imageData: [] });

  const setImageData = (data: string[]) => {
    console.log(data);

    setData({ imageData: data });
  };

  return (
    <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden">
      <h1 className="text-center text-2xl font-bold m-2">
        My React Photo book
      </h1>
      <SearchInput setImageData={setImageData} />
      <Photobook imageData={data.imageData} />
    </div>
  );
}

export default App;
