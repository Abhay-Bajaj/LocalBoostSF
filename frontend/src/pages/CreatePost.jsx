import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

const styleOptions = [
    "Casual",
    "Professional",
    "Playful",
    "Minimal",
    "Energetic",
];

function CreatePost() {
    const [showLogin, setShowLogin] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
    const [promptText, setPromptText] = useState("");
    const [generateImage, setGenerateImage] = useState(false);
    const [imageFileName, setImageFileName] = useState("");
    const [previewText, setPreviewText] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [postStatus, setPostStatus] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFileName(file.name);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = () => {
        if (!promptText.trim()) {
            setPreviewText("Please enter some post details to generate preview.");
            return;
        }

        setPreviewText(`Style: ${selectedStyle}\n\n${promptText}`);

        if (generateImage && !previewImage) {
            setPreviewImage("https://via.placeholder.com/640x360?text=Generated+Image");
        }
    };

    const handlePost = async () => {
        const postPayload = {
            business_id: 'business-001',
            title: promptText.slice(0, 60) || 'New post',
            summary: promptText.slice(0, 120),
            content: promptText,
            image_path: previewImage || '',
            date: new Date().toISOString().slice(0, 10),
            views: 0,
            likes: 0,
            comments: 0,
            saves: 0,
            engagement_rate: 0,
        };

        const created = await createPost(postPayload);
        setPostStatus(`Post saved ${created.id.startsWith('mock-') ? 'locally' : 'to backend'}.`);
        setPreviewText(`Posted: ${created.title}\n\n${created.content}`);
    };

    const handleTryAgain = () => {
        setPromptText("");
        setPreviewText("");
        setPreviewImage("");
        setImageFileName("");
        setGenerateImage(false);
        setPostStatus("");
    };

    return (
        <>
            <Navbar onLoginClick={() => setShowLogin(true)} />

            <div className="container create-post-page">
                <div className="page-intro">
                    <h1>Create Post</h1>
                    <p>Build your business post with a style, text, optional image upload, and preview it live.</p>
                </div>

                <div className="create-post-grid">
                    <section className="create-post-form">
                        <label>
                            Style
                            <select value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
                                {styleOptions.map((style) => (
                                    <option key={style} value={style}>
                                        {style}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Post Details
                            <textarea
                                rows={10}
                                placeholder="Enter the text for your post here..."
                                value={promptText}
                                onChange={(e) => setPromptText(e.target.value)}
                            />
                        </label>

                        <label className="checkbox-row">
                            <input
                                type="checkbox"
                                checked={generateImage}
                                onChange={(e) => setGenerateImage(e.target.checked)}
                            />
                            Generate an image
                        </label>

                        <div className="upload-generate-row">
                            <label className="upload-button">
                                Upload Image
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                            </label>
                            <button className="button" type="button" onClick={handleGenerate}>
                                Generate
                            </button>
                        </div>
                    </section>

                    <section className="create-post-preview">
                        <div className="preview-card">
                            <div className="preview-header">
                                <h2>Post Preview</h2>
                                <span className="preview-badge">{selectedStyle}</span>
                            </div>

                            {previewImage ? (
                                <img src={previewImage} alt="Post preview" className="preview-image" />
                            ) : (
                                <div className="preview-image placeholder">Image preview will appear here</div>
                            )}

                            <div className="preview-content">
                                <p>{previewText || "Your generated post content will display here."}</p>
                                {imageFileName && <p className="preview-meta">Uploaded: {imageFileName}</p>}
                            </div>
                        </div>

                        <div className="preview-actions">
                            <button className="button" type="button" onClick={handlePost}>
                                Post
                            </button>
                            <button className="button button-secondary" type="button" onClick={handleTryAgain}>
                                Try Again
                            </button>
                        </div>
                        {postStatus && <p className="post-status">{postStatus}</p>}
                    </section>
                </div>
            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    );
}

export default CreatePost;
