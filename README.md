# Chat Project Frontend

This project is the frontend for a chat application. It is built using modern web technologies to provide a seamless and responsive user experience.

## Table of Contents

- [Architecture](#architecture)
- [Implementation Choices](#implementation-choices)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)

## Architecture

The architecture of this project follows a component-based structure using React. The main components are:

- **Main**: The root component that sets up the routing and context providers.
- **ChatWindow**: Displays the chat messages and handles user input.
- **MessageList**: Renders the list of messages.
- **MessageInput**: Handles the input and submission of new messages.
- **UserList**: Displays the list of active users.

The state management is handled using Redux to provide a global state accessible throughout the application.

## Implementation Choices

- **React**: Chosen for its component-based architecture and efficient rendering.
- **Redux**: Used for state management to provide a global state and manage complex state logic.
- **TypeScript**: For static typing and improved developer experience.
- **TailwindCSS**: For maintainable styles.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

```sh
git clone https://github.com/Thu-Min/chat_project_fe.git
cd chat_project_fe
```

2. **Install dependencies**:

```sh
npm install
```

## Running the Project

To run the project locally, use the following command:

```sh
npm run dev
```

This will start the development server and open the application in your default web browser. The application will automatically reload if you make any changes to the code.
