import axios from "axios";
import { useState } from "react";

function App() {
  const [img, setImg] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(URL.createObjectURL(e.target[0].value));
    setImg(new Blob(Array.from(e.target[0].value), { type: "image/jpeg" }));
    //const res = axios.post("Url")
  };
  console.log(img);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <button type="submit">send</button>
      </form>
      {img ? <img src={"data:image/png;base64," + img} /> : null}
    </>
  );
}

export default App;
