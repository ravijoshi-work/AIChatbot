# AIChatbot 💬

A simple, functional Chrome Extension built with React that simulates a chatbot interface using mock data.

## 🚀 Features

- Clean popup UI inside a Chrome Extension
- Chat window that displays user and bot messages
- Uses mock/sample responses for demo purposes
- Built using React

## 📁 Project Structure

```bash
.
├── public/          # Static assets
├── src/            # React components and logic
│   ├── components/
│   └── App.jsx
├── manifest.json   # Chrome Extension configuration
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/ravijoshi-work/AIChatbot.git
cd AIChatbot
```

2. **Install dependencies**

```bash
npm install
```

## 🔧 Development

To run the extension in development mode:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## 📥 Loading the Extension

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `dist` folder from your project directory

## 💻 Usage

1. Click the extension icon in Chrome toolbar
2. Type your message in the input field
3. Press Enter or click Send
4. View the chatbot's response

## ⚙️ Configuration

The extension can be configured through `manifest.json`:

```json
{
  "name": "AIChatbot",
  "version": "1.0.0",
  "manifest_version": 3,
  "description": "AI Chatbot Chrome Extension"
}
```

## 👥 Authors

- Ravi Kumar Joshi - [GitHub Profile](https://github.com/ravijoshi-work)
