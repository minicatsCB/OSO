import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Helper function to click on cells
async function clickCells(cellsToClick: HTMLElement[], doubleClick: boolean = false) {
    for (const cell of cellsToClick) {
        await act(async () => {
            if (doubleClick) {
                userEvent.dblClick(cell);
            } else {
                userEvent.click(cell);
            }
        });
    }
}

// Helper function to check score
async function checkScore(playerName: string, score: number) {
    await screen.findByText(`${playerName}: ${score}`);
}


export { clickCells, checkScore }