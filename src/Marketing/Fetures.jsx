import "../Style/features.css";

import {  MapPin,  Smile,  Zap,  Camera,  MessageCircle,  Pizza,} from "lucide-react";

const Features = () => {
  const featuresData = [
    {
      icon: <MapPin />,
      title: "Nearby Discovery",
      desc: "Find people within 1–5 km radius.",
      color: "purple",
    },
    {
      icon: <Smile />,
      title: "Mood Matching",
      desc: "Match based on current vibe and intent.",
      color: "pink",
    },
    {
      icon: <Zap />,
      title: "Talk Now",
      desc: "Start instant real-time conversations.",
      color: "purple",
    },
    {
      icon: <Camera />,
      title: "Social Feed",
      desc: "Share stories, posts, and moments.",
      color: "pink",
    },
    {
      icon: <MessageCircle />,
      title: "Icebreakers",
      desc: "Smart prompts to start conversations.",
      color: "purple",
    },
    {
      icon: <Pizza />,
      title: "Meet Planning",
      desc: "Plan nearby hangouts and activities.",
      color: "pink",
    },
  ];

  return (
    <section className="features-section">

      {/* Background Glow */}
      <div className="bg-glow"></div>

      {/* Heading */}
      <h1 className="features-heading">
        Everything You Need To Start <br/>
        <span>Real Connections</span>
      </h1>

      {/* Cards */}
      <div className="features-grid">
        {featuresData.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className={`icon-box ${item.color}`}>
              {item.icon}
            </div>

            <h2>{item.title}</h2>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;