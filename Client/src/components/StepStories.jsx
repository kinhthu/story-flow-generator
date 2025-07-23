import React, { useState } from "react";
import axios from "axios";
import { getCharacterImage } from "../data/characters";

export default function StepStories({
 active,
 onNext,
 ideas,
 selectedIdeas,
 setSelectedIdeas,
 stories,
 setStories,
 selectedStories,
 setSelectedStories,
}) {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const provider = "openai";
 const model = "gpt-4o-mini";

 // Lấy duration và numberOfScenes từ ý tưởng đầu tiên (giả sử các ý tưởng cùng giá trị)
 const duration = ideas[0]?.duration || 30;
 const numberOfScenes = ideas[0]?.scene_number || 6;

 const handleIdeaToggle = (idx) => {
  setSelectedIdeas((prev) => {
   const newSelected = prev.includes(idx)
    ? prev.filter((i) => i !== idx)
    : [...prev, idx];
   return newSelected;
  });
 };

 const handleGenerate = async () => {
  setError("");
  if (selectedIdeas.length === 0) return setError("Chọn ít nhất 1 ý tưởng");
  setLoading(true);
  try {
   const selectedIdeasData = selectedIdeas.map((idx) => ideas[idx]);
   const res = await axios.post("/api/stories/batch", {
    stories: selectedIdeasData.map((story) => ({
     videoDuration: duration,
     numberOfScenes: numberOfScenes,
     characterDescription: story?.characters?.join(", "),
     style: story?.styles,
     idea: story?.idea,
     provider,
     model,
    })),
   });
   const responseStories = res.data.stories.map((s, idx) => ({
    ...s,
    feelings: selectedIdeas[idx].feelings,
    styles: selectedIdeas[idx].styles,
   }));
   setStories(responseStories);
   setSelectedStories([0]);
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
     <span className="step-number">2</span> Tạo Câu Chuyện
    </h3>
    <span>▼</span>
   </div>
   {active && (
    <div className={`step-content`}>
     <div>
      <h4>Chọn ý tưởng để tạo câu chuyện:</h4>
      {ideas.map((idea, idx) => (
       <div
        key={idx}
        className={`idea-card${selectedIdeas.includes(idx) ? " selected" : ""}${
         loading ? " disabled" : ""
        }`}
        onClick={() => !loading && handleIdeaToggle(idx)}
       >
        <h4>Ý tưởng {idx + 1}</h4>
        <p>{idea.idea}</p>
        <div className="character-tags">
         <div className="idea-info">
          <div className="idea-characters">
           <b>Nhân vật:</b>{" "}
           {idea.characters.map((char) => {
            const imageLink = getCharacterImage(char);
            return (
             <span key={char} className="character-tag">
              {imageLink ? (
               <img
                src={imageLink}
                alt={char}
                className="character-tag-image"
                onError={(e) => {
                 e.target.style.display = "none";
                 e.target.nextSibling.style.display = "inline";
                }}
               />
              ) : null}
              <span
               className="character-tag-text"
               style={{ display: imageLink ? "none" : "inline" }}
              >
               {char}
              </span>
             </span>
            );
           })}
          </div>
          <div className="idea-details">
           <div className="idea-detail">
            <b>Số cảnh:</b> {idea.scene_number}
           </div>
           <div className="idea-detail">
            <b>Cảm xúc:</b> {idea.feelings}
           </div>
           <div className="idea-detail">
            <b>Phong cách:</b> {idea.styles}
           </div>
          </div>
         </div>
        </div>
       </div>
      ))}
     </div>
     {error && <div className="error-message">{error}</div>}
     <button
      className="btn"
      onClick={handleGenerate}
      disabled={loading || selectedIdeas.length === 0}
     >
      {loading && <span className="loading"></span>}
      <span>📖 Tạo Câu Chuyện</span>
     </button>
     <div className="results-container">
      {stories.map((story, idx) => (
       <div key={idx} className="story-card selected">
        <h2>{story.title}</h2>
        <p>
         <b>Mô tả:</b> {story.description}
        </p>
        <div className="story-meta">
         <div>
          <b>Hashtags:</b>{" "}
          {story.hashtags &&
           story.hashtags.map((tag) => (
            <span key={tag} className="story-hashtag">
             {tag}
            </span>
           ))}
         </div>
         <div>
          <b>Tags:</b>{" "}
          {story.tags &&
           story.tags.map((tag) => (
            <span key={tag} className="story-tag">
             {tag}
            </span>
           ))}
         </div>
        </div>
        <div className="hook-section">
         <h5>🎣 Hook:</h5>
         <div className="hook-text">{story.hook}</div>
        </div>
        <div className="scenes-section">
         <h4>📽️ Danh sách cảnh quay:</h4>
         <table className="scenes-table">
          <thead>
           <tr>
            <th>#</th>
            <th>Thời lượng</th>
            <th>Mô tả</th>
            <th>Nhân vật</th>
            <th>Bối cảnh</th>
            <th>Hành động</th>
           </tr>
          </thead>
          <tbody>
           {story.scenes &&
            story.scenes.map((scene) => (
             <tr key={scene.scene_number}>
              <td>{scene.scene_number}</td>
              <td>{scene.duration}</td>
              <td>{scene.description}</td>
              <td>{scene.characters && scene.characters.join(", ")}</td>
              <td>{scene.setting}</td>
              <td>{scene.action}</td>
             </tr>
            ))}
          </tbody>
         </table>
        </div>
       </div>
      ))}
     </div>
    </div>
   )}
  </div>
 );
}
