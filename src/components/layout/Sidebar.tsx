import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/chatbot.png";
import OpenIcon from "../../assets/icons/hide (1).png";
import CloseIcon from "../../assets/icons/show.png";
import ChatIcon from "../../assets/icons/bubble-chat.png";
import AskIcon from "../../assets/icons/question.png";
import SearchIcon from "../../assets/icons/search-interface-symbol.png";
import WriteIcon from "../../assets/icons/copy-writing.png";
import ImageIcon from "../../assets/icons/image-gallery.png";
import ChatfileIcon from "../../assets/icons/link.png";
import VisionIcon from "../../assets/icons/vision.png";
  
const sidebarItems = [
  { path: "/chat", icon: ChatIcon, label: "Chat" },
  { path: "/ask", icon: AskIcon, label: "Ask" },
  { path: "/search", icon: SearchIcon, label: "Search" },
  { path: "/write", icon: WriteIcon, label: "Write" },
  { path: "/image", icon: ImageIcon, label: "Image" },
  { path: "/chatfile", icon: ChatfileIcon, label: "ChatFile" },
  { path: "/vision", icon: VisionIcon, label: "Vision" },
];

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} className="logo" alt="logo" />
          <label>AI ChatBot </label>
        </div>
        <img
          src={open ? CloseIcon : OpenIcon}
          className="icon"
          onClick={() => setOpen((prev) => !prev)}
          alt="toggle"
          style={{cursor:'pointer'}}
        />
      </header>
      <div className="sidebar" style={{ display: open ? "block" : "none" }}>
        <div className="sidebar-header">
          <img
            src={open ? CloseIcon : OpenIcon}
            className="icon"
            onClick={() => setOpen((prev) => !prev)}
            alt="toggle"
          />
        </div>
        {sidebarItems.map((item, index) => (
          <div
            key={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleItemClick(item.path)}
            style={
              index === sidebarItems.length - 1 ? { marginBottom: "60px" } : {}
            }
          >
            <img src={item.icon} className="icon" alt={item.label} />
            <label>{item.label}</label>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </>
  );
};

export default Sidebar;
