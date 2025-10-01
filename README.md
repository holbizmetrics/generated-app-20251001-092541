# Aura Code

An AI-powered vibe-coding platform designed for a focused and aesthetically pleasing development experience.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/holbizmetrics/generated-app-20251001-092443)

Aura Code is an AI-powered, vibe-coding platform designed to provide a serene, focused, and aesthetically pleasing development experience. It transforms the coding session into a calm, creative process by combining a minimalist, visually stunning user interface with a powerful AI assistant running on Cloudflare's edge network. The application features a clean, two-panel layout with a persistent session manager and a central chat interface. Users can interact with various AI models, leverage integrated tools like web search and documentation lookup, and manage their conversation history seamlessly.

## Key Features

- **AI-Powered Chat**: Interact with various large language models (Gemini, GPT-4o, etc.) for coding assistance.
- **Minimalist UI**: A clean, two-panel layout designed for focus and a calm, creative process.
- **Session Management**: Persistent chat history with the ability to create, switch, and manage conversations.
- **Integrated Tools**: The AI can leverage tools like web search and documentation lookup to provide more accurate answers.
- **Streaming Responses**: AI responses are streamed token-by-token for a real-time conversational feel.
- **Light & Dark Modes**: A beautiful, harmonious interface in both light and dark themes.
- **Built on the Edge**: The entire backend runs on Cloudflare's global network for low latency and high performance.
- **Responsive Design**: Flawless experience across all device sizes, from mobile to desktop.

## Technology Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Backend**: Cloudflare Workers, Hono
- **Persistence**: Cloudflare Agents (Durable Objects)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or later recommended)
- [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/aura_code.git
    cd aura_code
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.dev.vars` file in the root of the project for local development. This file is used by Wrangler to load environment variables.

    ```ini
    # .dev.vars

    # Required: Cloudflare AI Gateway URL
    # Example: https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_NAME/openai
    CF_AI_BASE_URL="your-cloudflare-ai-gateway-url"

    # Required: Cloudflare API Key for the AI Gateway
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    > **Note**: For the AI features to work, you must have a Cloudflare account and set up an AI Gateway. The `CF_AI_API_KEY` is a secret and should never be committed to version control.

## Development

To run the application locally, you'll need to run the Vite frontend development server and the Cloudflare Wrangler development server concurrently.

1.  **Start the frontend server:**
    ```sh
    bun dev
    ```
    This will start the Vite development server, typically on `http://localhost:3000`.

2.  **Start the backend worker:**
    In a separate terminal, run:
    ```sh
    bun wrangler dev
    ```
    This starts the local Cloudflare Worker, which handles API requests.

Now you can access the application in your browser at the address provided by the Vite server.

## Usage

- **Start a Conversation**: Simply type your query into the input box at the bottom and press Enter.
- **New Chat**: Click the "New Chat" button in the sidebar to start a fresh conversation.
- **Switch Sessions**: Previous conversations are listed in the sidebar. Click on any session to load its history.
- **Select a Model**: Use the dropdown menu at the top of the chat view to switch between different AI models.

## Deployment

This project is designed for easy deployment to Cloudflare Pages.

1.  **Build the project:**
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    The `deploy` script in `package.json` handles both the build step and deployment.
    ```sh
    bun run deploy
    ```
    This command will build the application and deploy it using Wrangler.

3.  **Configure Production Secrets:**
    After deploying for the first time, you must add your production environment variables as secrets in the Cloudflare dashboard.

    Go to your Worker -> Settings -> Variables and add the following secrets:
    - `CF_AI_BASE_URL`: Your production Cloudflare AI Gateway URL.
    - `CF_AI_API_KEY`: Your production Cloudflare API Key.

    This ensures your API keys are not exposed.

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/holbizmetrics/generated-app-20251001-092443)

## Architecture

Aura Code uses a modern client-server architecture:

-   **Frontend**: A single-page application built with React and Vite. It provides the user interface and communicates with the backend API.
-   **Backend**: A Cloudflare Worker running a Hono server handles API requests.
-   **Stateful Logic**: Cloudflare Agents (built on Durable Objects) manage the state for each chat session (`ChatAgent`) and the overall session list (`AppController`), ensuring conversation history is persistent and scalable.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.