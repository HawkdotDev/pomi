# Pomo (cli tool)

Pomo is a CLI tool that allows you to start a Pomodoro timer web app using a command-line interface. It interacts with an Express.js backend and utilizes a frontend framework (React, Vue.js, or Angular) for the UI.

## Features

- **Start Pomodoro Timer**: Start the Pomodoro timer web app in the default browser with a single command.
- **Frontend Framework Support**: Choose from React, Vue.js, or Angular for the frontend framework is you want to create your custom UI.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HawkdotDev/pomo.git
   ```

2. Install dependencies:

   ```bash
   cd pomo && npm install
   ```

## Usage

- To start the Pomodoro timer web app, run the following command:
   
   ```bash
   pomo start
   ```

- Replace `pomo` with the appropriate path if needed.

<!--  
## Configuration

- **Web App URL**: Replace `'https://your-pomo-timer-url.com'` in the code with the actual URL of your Pomodoro timer web app.
- **Express.js Backend**: Customize the Express.js server code in `server.js` to fit your requirements.
-->

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Commander.js](https://github.com/tj/commander.js) - For command-line interface handling.
- [Express.js](https://expressjs.com/) - As the backend server. (soon migrating to hono or elysia)
- [React](https://reactjs.org/) - As the frontend framework.
