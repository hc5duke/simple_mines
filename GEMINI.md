# Simple Mines

Simple Mines is a classic puzzle game where the objective is to clear a grid of mines without detonating any of them. The game is played on a rectangular grid, where each cell can either contain a mine or be empty. The player can click on a cell to reveal its contents, or flag it as a potential mine with right-click.

## Gameplay
The game starts with a grid of cells, some of which contain mines. The player's goal is to clear the grid by revealing all the cells that do not contain mines. To do this, the player can click on a cell to reveal its contents. If the cell contains a mine, the game is over. If the cell does not contain a mine, the number of adjacent mines is revealed. The player can also flag a cell as a potential mine with right-click.

## Rules
- The game starts with a grid of cells, some of which contain mines.
- The player's goal is to clear the grid by revealing all the cells that do not contain mines.
- To do this, the player can click on a cell to reveal its contents.
- If the cell contains a mine, the game is over.
- If the cell does not contain a mine, the number of adjacent mines is revealed.
- The player can also flag a cell as a potential mine with right-click.
- The game ends when all non-mine cells are revealed or when a mine is detonated.

## Design

- Simple Mines is built using react frontend

## Development

The application is built with a component-based architecture, which makes it easy to manage and scale the codebase.

- `App.js`: The main component that renders the game board and other UI elements.
- `Board.js`: This component is responsible for creating the game board, handling user interactions, and managing the game state.
- `Cell.js`: This component represents a single cell on the board and displays its state (e.g., revealed, flagged, or hidden).

### Game Logic

The core game logic is implemented in the `Board.js` component and the `utils.js` file.

- `initializeBoard()`: This function creates a new game board, places the mines randomly, and calculates the number of adjacent mines for each cell.
- `handleLeftClick()`: This function handles left-clicks on the cells, revealing them and checking for game-over conditions.
- `handleRightClick()`: This function handles right-clicks, allowing the user to flag or unflag cells.
- `checkWinCondition()`: This function checks if the player has won the game by revealing all the non-mine cells.
