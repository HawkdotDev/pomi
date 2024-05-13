# Pomi (Python CLI Tool)

Pomi is a command-line interface (CLI) tool designed to create and manage Pomodoro timers. It leverages Python and integrates with OpenCV (cv2), Pygame, and NumPy libraries to offer a dynamic and interactive timer experience.

## Features

- **Create Pomodoro Timers**: Initiate Pomodoro timers directly from the command line.
- **Interactive UI**: Utilize OpenCV and Pygame to create an engaging visual interface for the timer.
- **Customizable Settings**: Tailor timer settings such as work and break durations to suit your workflow.

## Installation

1. Install Pomi from PyPI:

   ```bash
   pip install pomi

1. Clone the repository:

   ```bash
   git clone https://github.com/HawkdotDev/pomi.git
   ```

2. Install dependencies:

   ```bash
   cd pomi && npm install
   ```

## Usage

- To start the Pomodoro timer web app, run the following command:
   
   ```bash
   pomi start
   ```

- Replace `pomi` with the appropriate path if needed.

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
