import React from "react";

const About = () => {
  return (
    <div>
      {/* Header */}
      <h1>About Us</h1>

      {/* General Introduction */}
      <div className="intro-section">
        <h2 className="section-title">Hey there</h2>
        {/* Your content for general introduction */}
      </div>

      {/* About 200 Words */}
      <div className="about-section">
        <h2 className="section-title">About 200 Words</h2>
        <p>Your 200 words about the app...</p>
      </div>
    </div>
  );
};

export default About;
