# CLI Game: Blackjack

## About This Project

This project is a Command Line Interfect (CLI) game based on the famous casino card game, Blackjack.

In this game, the goal is to get a hand of cards that’s worth as close to 21 points as possible! If a player’s hand goes over 21 points, they are eliminated from the game. 

## Project Links
Repo: https://github.com/christianaao/blackjack-card-game

## Features of This Project
This project was written in JavaScript. There is no frontend or API server for this project (but maybe in the future).

This project was created using the following frameworks:
- **Node.js:** runtime environment
- **Jest:** for testing
- **Chalk:** for font colours and styles

## Running This Project Locally
### Installation

Ensure that you have installed Node.js: https://nodejs.org/en/download

**_In order to run this game locally:_**

1. In your terminal, locate the directory you would like to save the code to and enter the following. This command will clone this repo:
   ```bash
   git clone https://github.com/christianaao/blackjack-card-game
   ```

2. In the cloned directory, type `pnpm install` in your terminal to install all dependencies.

3. Enter the following Scripts into your packet.json file:
- "test": "jest",
- "start": "node blackjack.js"

To start the game locally, run:
   ```bash
   npm start
   ```

To run the test suites and verify the game’s functionality, run:
   ```bash
   npm test
   ```

☺ I hope you enjoy playing the game ☺

## Dependencies and Software Requirements
### Dev Dependencies
- "jest": "^29.7.0"

### Dependencies
- "chalk": "4.1.2"