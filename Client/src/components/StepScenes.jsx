import React, { useState } from "react";
import axios from "axios";

function CopyButton({ value }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = async (e) => {
  e.stopPropagation();
  try {
   await navigator.clipboard.writeText(value);
   setCopied(true);
   setTimeout(() => setCopied(false), 1200);
  } catch {}
 };
 return (
  <button className="copy-btn" onClick={handleCopy} type="button">
   📋
   {copied && <span className="copy-tooltip">Copied</span>}
  </button>
 );
}

export default function StepScenes({
 active,
 stories,
 selectedStories,
 setSelectedStories,
 scenes,
 setScenes,
}) {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [groupedResults, setGroupedResults] = useState([]); // Lưu kết quả group theo story
 const provider = "openai";
 const model = "gpt-4o-mini";

 const handleStoryToggle = (idx) => {
  setSelectedStories((prev) => {
   if (prev.includes(idx)) {
    return prev.filter((i) => i !== idx);
   } else {
    return [...prev, idx];
   }
  });
 };

 const handleGenerate = async () => {
  setError("");
  if (selectedStories.length === 0)
   return setError("Chọn ít nhất 1 câu chuyện");
  setLoading(true);
  try {
   const selectedStoriesData = selectedStories.map((idx) => stories[idx]);
   // Gom scene requests theo từng story
   const allSceneRequests = [];
   const storySceneCounts = [];
   selectedStoriesData.forEach((story) => {
    let count = 0;
    if (Array.isArray(story.scenes)) {
     story.scenes.forEach((scene) => {
      allSceneRequests.push({
       sceneDescription: scene?.description,
       characterDescription: scene?.characters?.join(", "),
       style: scene?.style || "",
       feelings: "",
       setting: scene?.setting,
       action: scene?.action,
       provider,
       model,
      });
      count++;
     });
    }
    storySceneCounts.push(count);
   });
   // Gọi batch API
   const res = await axios.post("/api/scenes/batch", {
    scenes: allSceneRequests,
   });
   setScenes(res.data.scenes);
   // Group lại kết quả theo từng story
   const grouped = [];
   let idx = 0;
   for (let i = 0; i < selectedStoriesData.length; i++) {
    const count = storySceneCounts[i];
    grouped.push({
     story: selectedStoriesData[i],
     scenes: res.data.scenes.slice(idx, idx + count),
    });
    idx += count;
   }
   setGroupedResults(grouped);
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
     <span className="step-number">3</span> Tạo Cảnh Quay
    </h3>
    <span>▼</span>
   </div>
   {active && (
    <div className={`step-content`}>
     <div>
      <h4>Chọn câu chuyện để tạo cảnh quay:</h4>
      {stories.map((story, idx) => (
       <div
        key={idx}
        className={`story-card${
         selectedStories.includes(idx) ? " selected" : ""
        }${loading ? " disabled" : ""}`}
        onClick={() => !loading && handleStoryToggle(idx)}
       >
        <h4>{story.title}</h4>
        <p>{story.description}</p>
        {story.hashtags &&
         Array.isArray(story.hashtags) &&
         story.hashtags.length > 0 && (
          <div className="story-meta">
           <strong>Hashtags:</strong>{" "}
           <span className="hashtags">
            {story.hashtags.map((tag, i) => (
             <span key={i} className="hashtag">
              {tag}
             </span>
            ))}
           </span>
          </div>
         )}
        {story.tags && Array.isArray(story.tags) && story.tags.length > 0 && (
         <div className="story-meta">
          <strong>Tags:</strong>{" "}
          <span className="tags">
           {story.tags.map((tag, i) => (
            <span key={i} className="tag">
             {tag}
            </span>
           ))}
          </span>
         </div>
        )}
        {story.hook && (
         <div className="story-meta">
          <strong>Hook:</strong> <span className="hook">{story.hook}</span>
         </div>
        )}
        {story.scenes &&
         Array.isArray(story.scenes) &&
         story.scenes.length > 0 && (
          <div className="story-scenes">
           <strong>Scenes:</strong>
           <ol>
            <div className="scenes-list">
             {story.scenes.map((scene, sidx) => (
              <div key={sidx} className="scene-card">
               <div className="scene-card-header">
                <span className="scene-number">
                 <strong>Cảnh {scene.scene_number}</strong>
                 {scene.duration && (
                  <span className="scene-duration"> ({scene.duration})</span>
                 )}
                 :
                </span>
               </div>
               <div className="scene-card-body">
                <div className="scene-desc">{scene.description}</div>
                <div className="scene-meta">
                 <div>
                  <em>Nhân vật:</em>{" "}
                  <span className="scene-characters">
                   {scene.characters && scene.characters.length > 0 ? (
                    scene.characters.join(", ")
                   ) : (
                    <span className="scene-empty">Không có</span>
                   )}
                  </span>
                 </div>
                 <div>
                  <em>Bối cảnh:</em>{" "}
                  <span className="scene-setting">
                   {scene.setting || (
                    <span className="scene-empty">Không có</span>
                   )}
                  </span>
                 </div>
                 <div>
                  <em>Hành động:</em>{" "}
                  <span className="scene-action">
                   {scene.action || (
                    <span className="scene-empty">Không có</span>
                   )}
                  </span>
                 </div>
                </div>
               </div>
              </div>
             ))}
            </div>
           </ol>
          </div>
         )}
       </div>
      ))}
     </div>
     {error && <div className="error-message">{error}</div>}
     <button
      className="btn"
      onClick={handleGenerate}
      disabled={loading || selectedStories.length === 0}
     >
      {loading && <span className="loading"></span>}
      <span>🎬 Tạo Cảnh Quay</span>
     </button>
     <div className="results-container">
      {/* Hiển thị kết quả group theo story */}
      {groupedResults.length > 0 &&
       groupedResults.map((group, idx) => (
        <div key={idx} className="story-group-card">
         <h2 className="story-title">{group.story.title}</h2>
         <div className="story-desc">{group.story.description}</div>
         <div className="scenes-list-vertical">
          {group.scenes.map((scene, sidx) => (
           <div key={sidx} className="scene-result-card">
            <h4 className="scene-title">Cảnh {sidx + 1}</h4>
            <b>Image Prompt:</b>
            <div className="prompt-card">
             <span className="prompt-text">{scene.image_prompt}</span>
             <CopyButton value={scene.image_prompt} />
            </div>
            <b>Video Prompt:</b>
            <div className="prompt-card">
             <span className="prompt-text">{scene.video_prompt}</span>
             <CopyButton value={scene.video_prompt} />
            </div>
            {scene.master_key_frame && (
             <div className="keyframe-section">
              <b>🎬 Master Key Frame:</b>{" "}
              <span className="keyframe-text">{scene.master_key_frame}</span>
             </div>
            )}
           </div>
          ))}
         </div>
        </div>
       ))}
     </div>
    </div>
   )}
  </div>
 );
}
