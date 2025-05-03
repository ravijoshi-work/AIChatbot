interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
  }
  
  const MessageCard = ({ message }: { message: Message }) => {
    const { text, sender, timestamp } = message;
  
    return (
      <div className={`message-card ${sender}`}>
        <div className="message-content">
          <div className="message-text">{text}</div>
          <div className="message-timestamp">
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default MessageCard;