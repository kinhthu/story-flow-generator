import React, { useState } from "react";
import axios from "axios";
import { DEFAULT_CHARACTERS } from "../data/characters";

export default function StepIdeas({
 active,
 onNext,
 setIdeas,
 ideas,
 selectedIdeas,
 setSelectedIdeas,
}) {
 const [topic, setTopic] = useState(
  "Biển, núi lửa, sóng thần, đại dương, hải sản, đáy biển, bơi, lướt sóng, thuyền, vui vẻ, chiến tranh, quái vật"
 );
 const [duration, setDuration] = useState(30);
 const [sceneTime, setSceneTime] = useState(5);
 const [numberOfIdeas, setNumberOfIdeas] = useState(5);
 const [characters, setCharacters] = useState(DEFAULT_CHARACTERS);
 const [selectedChars, setSelectedChars] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const provider = "openai";
 const model = "gpt-4o-mini";

 const handleCharToggle = (label) => {
  setSelectedChars((prev) =>
   prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
  );
 };

 const handleGenerate = async () => {
  setError("");
  if (!topic.trim()) return setError("Vui lòng nhập chủ đề");
  if (selectedChars.length === 0) return setError("Chọn ít nhất 1 nhân vật");
  setLoading(true);
  try {
   const res = await axios.post("/api/ideas", {
    topic,
    characters: selectedChars,
    numberOfIdeas,
    duration,
    sceneTime,
    provider,
    model,
   });
   setIdeas(res.data);
   onNext();
  } catch (e) {
   setError(e?.response?.data?.detail || "Lỗi khi gọi API");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className={`step${active ? " active" : ""}`}>
   <div className="step-header" onClick={() => {}}>
    <h3>
     <span className="step-number">1</span> Tạo Ý Tưởng
    </h3>
    <span>▼</span>
   </div>
   {active && (
    <div className={`step-content`}>
     <div className="form-group">
      <label>Chủ đề:</label>
      <input
       className="form-control"
       value={topic}
       onChange={(e) => setTopic(e.target.value)}
       disabled={loading}
      />
     </div>
     <div className="form-group">
      <label>Thời lượng video (giây):</label>
      <input
       type="number"
       className="form-control"
       value={duration}
       min={10}
       max={120}
       onChange={(e) => setDuration(Number(e.target.value))}
       disabled={loading}
      />
     </div>
     <div className="form-group">
      <label>Thời gian mỗi cảnh (giây):</label>
      <input
       type="number"
       className="form-control"
       value={sceneTime}
       min={3}
       max={10}
       onChange={(e) => setSceneTime(Number(e.target.value))}
       disabled={loading}
      />
     </div>
     <div className="form-group">
      <label>Số lượng ý tưởng cần tạo:</label>
      <input
       type="number"
       className="form-control"
       value={numberOfIdeas}
       min={1}
       max={20}
       onChange={(e) => setNumberOfIdeas(Number(e.target.value))}
       disabled={loading}
      />
     </div>
     <div className="form-group">
      <label>Chọn nhân vật:</label>
      <div className="character-grid">
       {characters.map((char) => (
        <div
         key={char.label}
         className={`character-card${
          selectedChars.includes(char.label) ? " selected" : ""
         }${loading ? " disabled" : ""}`}
         onClick={() => !loading && handleCharToggle(char.label)}
        >
         <div className="character-image">
          <img
           src={char.image_link}
           alt={char.label}
           onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
           }}
          />
          <div className="character-placeholder" style={{ display: "none" }}>
           {char.label.charAt(0).toUpperCase()}
          </div>
         </div>
         <div className="character-info">
          <h4>{char.label}</h4>
         </div>
        </div>
       ))}
      </div>
     </div>
     {error && <div className="error-message">{error}</div>}
     <button className="btn" onClick={handleGenerate} disabled={loading}>
      {loading && <span className="loading"></span>}
      <span>🎭 Tạo Ý Tưởng</span>
     </button>
    </div>
   )}
  </div>
 );
}
