#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to ask for confirmation
ask_confirmation() {
    while true; do
        read -p "$1 (y/n): " yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

# Detect OS
OS="$(uname)"
if [ "$OS" == "Darwin" ]; then
    INSTALL_CMD="brew install"
    PACKAGE_MANAGER="Homebrew"
elif [ "$OS" == "Linux" ]; then
    INSTALL_CMD="apt-get install -y"
    PACKAGE_MANAGER="apt-get"
else
    echo "Unsupported OS: $OS"
    exit 1
fi

# Debug output
echo "Operating System: $OS"
echo "Package Manager: $PACKAGE_MANAGER"

# Store the original user
ORIGINAL_USER=$(logname)

# Ensure brew is run without sudo on macOS
run_brew() {
    sudo -u "$ORIGINAL_USER" HOMEBREW_NO_AUTO_UPDATE=1 brew "$@"
}

# Ensure npm is run without sudo
run_npm() {
    sudo -u "$ORIGINAL_USER" npm "$@"
}

# Check for Docker
if command_exists docker; then
    echo "Docker is already installed."
else
    echo "Docker is not installed."
    ask_confirmation "Do you want to install Docker?" && {
        if [ "$PACKAGE_MANAGER" == "Homebrew" ]; then
            run_brew install docker
        else
            sudo $INSTALL_CMD docker.io
        fi
    } || exit 1
fi

# Check for Docker Compose
if command_exists docker-compose; then
    echo "Docker Compose is already installed."
else
    echo "Docker Compose is not installed."
    ask_confirmation "Do you want to install Docker Compose?" && {
        if [ "$PACKAGE_MANAGER" == "Homebrew" ]; then
            run_brew install docker-compose
        else
            sudo $INSTALL_CMD docker-compose
        fi
    } || exit 1
fi

# Check if Docker daemon is running
if ! docker ps >/dev/null 2>&1; then
    echo "Docker daemon is not running. Please start Docker and try again."
    exit 1
fi

# Check for Node.js
if command_exists node; then
    echo "Node.js is already installed."
else
    echo "Node.js is not installed."
    ask_confirmation "Do you want to install Node.js?" && {
        if [ "$PACKAGE_MANAGER" == "Homebrew" ]; then
            run_brew install node
        else
            sudo $INSTALL_CMD nodejs
        fi
    } || exit 1
fi

# Check for npm (Node Package Manager)
if command_exists npm; then
    echo "npm is already installed."
else
    echo "npm is not installed."
    ask_confirmation "Do you want to install npm?" && {
        if [ "$PACKAGE_MANAGER" == "Homebrew" ]; then
            run_brew install npm
        else
            sudo $INSTALL_CMD npm
        fi
    } || exit 1
fi

# Check for TypeScript
if command_exists tsc; then
    echo "TypeScript is already installed."
else
    echo "TypeScript is not installed."
    ask_confirmation "Do you want to install TypeScript?" && run_npm install -g typescript || exit 1
fi

# Check for k6
if command_exists k6; then
    echo "k6 is already installed."
else
    echo "k6 is not installed."
    ask_confirmation "Do you want to install k6?" && {
        if [ "$PACKAGE_MANAGER" == "Homebrew" ]; then
            run_brew install k6
        else
            sudo $INSTALL_CMD k6
        fi
    } || exit 1
fi

# Navigate to the root directory
cd "$(dirname "$0")"

# Install Node.js dependencies for each service
echo "Installing Node.js dependencies for task-api..."
if [ -d "task-api" ]; then
  cd task-api && run_npm install --legacy-peer-deps && run_npm install --save-dev @types/express && cd ..
fi

echo "Installing Node.js dependencies for scheduler..."
if [ -d "scheduler" ]; then
  cd scheduler && run_npm install --legacy-peer-deps && run_npm install --save-dev @types/express && cd ..
fi

echo "Installing Node.js dependencies for worker..."
if [ -d "worker" ]; then
  cd worker && run_npm install --legacy-peer-deps && run_npm install --save-dev @types/express && cd ..
fi

echo "Installing Node.js dependencies for frontend..."
if [ -d "frontend" ]; then
  cd frontend && run_npm install --legacy-peer-deps && run_npm install --save-dev --legacy-peer-deps @types/react @types/react-dom @types/react-router-dom @types/axios @types/mermaid && cd ..
fi

echo "Installing Node.js dependencies for metrics..."
if [ -d "metrics" ]; then
  cd metrics && run_npm install --legacy-peer-deps && run_npm install --save-dev @types/express && cd ..
fi

echo "All dependencies installed successfully."