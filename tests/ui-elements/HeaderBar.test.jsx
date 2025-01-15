import {beforeEach, describe, expect, it, vi} from "vitest";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import HeaderBar from "../../src/ui-elements/HeaderBar.jsx";

describe("HeaderBar", () => {
    const mockSetMapCenter = vi.fn();
    const mockSetRecenterMap = vi.fn();

    beforeEach(() => {
        mockSetMapCenter.mockReset();
        mockSetRecenterMap.mockReset();

        cleanup();
    });


    it("renders the logo, input fields, and submit button", () => {
        render(
            <HeaderBar
                setMapCenter={mockSetMapCenter}
                setRecenterMap={mockSetRecenterMap}
                recenterMap={false}
            />
        );

        const logo = screen.getByRole("img");
        expect(logo.getAttribute("alt")).toBe("Skip Logo");

        const searchInput = screen.getByPlaceholderText("Search a city or postcode to discover items...");
        expect(searchInput).toBeDefined();

        const submitButton = screen.getByRole("button");
        expect(submitButton.getAttribute("value")).toBe("Go");
    });

    it("submits the form and sets loading state", async () => {
        render(
            <HeaderBar
                setMapCenter={mockSetMapCenter}
                setRecenterMap={mockSetRecenterMap}
                recenterMap={false}
            />
        );

        const searchInput = screen.getByPlaceholderText("Search a city or postcode to discover items...");
        fireEvent.change(searchInput, {target: {value: "Brighton"}});
        fireEvent.click(screen.getByRole("button", {name: "Go"}));

        await waitFor(() => {
            const loading = screen.getByRole("img", {name: "Loading GIF"});
            expect(loading).toBeTruthy();
        });
    });

    it("displays an error message if there is an error", async () => {
        render(
            <HeaderBar
                setMapCenter={mockSetMapCenter}
                setRecenterMap={mockSetRecenterMap}
                recenterMap={false}
            />
        );

        fireEvent.change(screen.getByPlaceholderText("Search a city or postcode to discover items..."), {
            target: {value: "Bn25p"},
        });
        fireEvent.click(screen.getByRole("button", {name: "Go"}));

        await waitFor(() => {
            const errorMessage = screen.getByText("Failed to find the location, please try again");
            expect(errorMessage).toBeTruthy();
        });
    });
});