import { useEffect, useState } from "react";

function App() {
  const [imageSrc, setImageSrc] = useState("");
  const [imageBlob, setImageBlob] = useState(null);

  const handleSubmit = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };

      const blob = new Blob([file], { type: "image/jpeg" });
      setImageBlob(blob);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <button type="submit">send</button>
      </form>
      {imageBlob ? <img src={URL.createObjectURL(imageBlob)} /> : null}
    </>
  );
}

export default App;
