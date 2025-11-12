# Blockchain Mobile Wallet App 🪙

A modern, cross-platform mobile application built with React Native and Expo for managing and tracking cryptocurrency assets. This project serves as a robust foundation for a feature-rich blockchain wallet, featuring a clean architecture, modern tooling, and a focus on user experience.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

-   **Cross-Platform:** Built with Expo to run seamlessly on iOS, Android, and Web from a single codebase.
-   **Modern UI:** Styled with NativeWind (Tailwind CSS for React Native) for rapid, utility-first styling.
-   **Type-Safe:** Developed entirely in TypeScript for enhanced code quality and maintainability.
-   **File-Based Routing:** Utilizes Expo Router for intuitive, file-system-based navigation.
-   **State Management:** Structured with React Context API for managing global state like authentication.
-   **Component-Based Architecture:** Organized into reusable components for a scalable and clean codebase.

## 🛠️ Technologies Used

| Technology                                                    | Description                                            |****
| ------------------------------------------------------------- | ------------------------------------------------------ |
| [**React Native**](https://reactnative.dev/)                  | Core framework for building native mobile applications |
| [**Expo**](https://expo.dev/)                                 | Toolchain for building and deploying React Native apps |
| [**TypeScript**](https://www.typescriptlang.org/)             | Statically typed superset of JavaScript                |
| [**NativeWind**](https://www.nativewind.dev/)                 | Tailwind CSS for React Native                          |
| [**Expo Router**](https://docs.expo.dev/router/introduction/) | File-system based routing for React Native apps        |

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   Expo CLI (`npm install -g expo-cli`)
-   A mobile simulator (Xcode for iOS, Android Studio for Android) or a physical device with the Expo Go app.

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/tejHacks/blockchain-mobile-wallet-app.git
    cd blockchain-mobile-wallet-app
    ```

2.  **Install Dependencies**
    Use `npm` to install the required packages.
    ```bash
    npm install
    ```

3.  **Run the Application**
    Start the development server.
    ```bash
    npm start
    ```
    This will open the Expo Developer Tools in your browser. From there, you can choose to run the app on a simulator or a physical device.

## 📈 Usage

After starting the development server, you can:

-   **Press `i`** to launch the app on the iOS Simulator.
-   **Press `a`** to launch the app on an Android Emulator.
-   **Press `w`** to launch the app in a web browser.
-   Alternatively, scan the QR code with the Expo Go app on your physical device.

The application is structured with a clear navigation flow, starting from authentication screens and leading to the main dashboard where users can view their assets, check coin details, and manage their wallet.

## 📂 Project Structure

The project follows a feature-driven directory structure to keep the codebase organized and scalable.

```
/app
├── _layout.tsx         # Root layout for the app
├── index.tsx           # Initial screen
├── (auth)              # Authentication-related screens
│   ├── Login.tsx
│   └── Register.tsx
├── (main)              # Main application screens after login
│   ├── Home.tsx
│   ├── Wallet.tsx
│   └── CoinDetails.tsx
├── components/         # Reusable UI components
├── context/            # Global state management (React Context)
└── hooks/              # Custom React hooks
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the app, please feel free to open an issue or submit a pull request.

1.  **Fork the repository**
2.  **Create a new branch** (`git checkout -b feature/your-feature-name`)
3.  **Make your changes**
4.  **Commit your changes** (`git commit -m 'Add some feature'`)
5.  **Push to the branch** (`git push origin feature/your-feature-name`)
6.  **Open a Pull Request**

## 📄 License

This project is not licensed for open-source distribution. All rights are reserved.

## 👤 Author

Connect with me on social media!

-   **Twitter:** [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)
-   **LinkedIn:** [YourLinkedInProfile](https://linkedin.com/in/YourLinkedInProfile)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)