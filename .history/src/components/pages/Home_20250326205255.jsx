import { useState } from "react";

const Home = ({brands}) => {
  const boxes = Array.from({ length: 15 }, (_, i) => `Box ${i + 1}`); // 15 boxes
  const boxesPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);

  const nextBoxes = () => {
    if (startIndex + boxesPerPage < boxes.length) {
      setStartIndex(startIndex + boxesPerPage);
    }
  };

  const prevBoxes = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - boxesPerPage);
    }
  };

  return (
    <div style={{ textAlign: "center",background:"green", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      
      {/* Hide "Previous" button when at the start */}
      {startIndex > 0 && (
        <button onClick={prevBoxes} style={{ padding: "10px", cursor: "pointer" }}>⬅</button>
      )}

      <div style={{ overflow: "hidden", width: "1000px" ,background:"blue" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: `translateX(-${startIndex * 110}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {brands.map((box, index) => (
            <div key={index} style={{
              width: "1150px",
              height: "100px",
              background: "lightblue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              flexShrink: 0,
              background:"red"
            }}>
              {box}
            </div>
          ))}
        </div>
      </div>

      {/* Hide "Next" button when at the end */}
      {startIndex + boxesPerPage < boxes.length && (
        <button onClick={nextBoxes} style={{ padding: "10px", cursor: "pointer", background:"blue" }}>➡</button>
      )}

    </div>
  );
};

export default Home;