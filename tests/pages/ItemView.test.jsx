import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import ItemView from "../../src/pages/ItemView.jsx";

vi.mock("../../src/hooks/apis/useUpdateToCollected.jsx", () => ({
    default: vi.fn(() => ({
        collectedID: 123,
    })),
}));

describe("ItemView component", () => {

    const itemData = {
        id: 1,
        title: "Test Item",
        date: "2024-01-01",
        address: "123 Test Street",
        latitude: 51.5074,
        longitude: -0.1278,
        image: "test-image.jpg",
        description: "Test description",
        taken: 0,
    };

    const setItemData = vi.fn();
    const setReFetchAllItems = vi.fn();

    beforeEach(() => {
        setItemData.mockClear();
        setReFetchAllItems.mockClear();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
        cleanup();
    });

    it("renders item data correctly", () => {
        render(
            <ItemView
                itemData={itemData}
                setItemData={setItemData}
                setReFetchAllItems={setReFetchAllItems}
            />
        );

        expect(screen.queryByText("Test Item")).not.toBeNull();
        expect(screen.queryByText("Date Uploaded: 2024-01-01")).not.toBeNull();
        expect(screen.queryByText("Location: 123 Test Street")).not.toBeNull();
        expect(screen.queryByText("Test description")).not.toBeNull();
    });

    it("opens Google Maps when 'Get Directions' is clicked", () => {
        window.open = vi.fn(); // Mock window.open
        render(
            <ItemView
                itemData={itemData}
                setItemData={setItemData}
                setReFetchAllItems={setReFetchAllItems}
            />
        );

        const directionsButton = screen.getByRole("button", {name: "Get Directions"});
        fireEvent.click(directionsButton);

        expect(window.open).toHaveBeenCalledWith(
            `https://www.google.com/maps/search/?api=1&query=${itemData.latitude},${itemData.longitude}`,
            "_blank"
        );
    });


    it("displays success message and calls setItemData and setReFetchAllItems when item is collected", async () => {
        render(
            <ItemView
                itemData={itemData}
                setItemData={setItemData}
                setReFetchAllItems={setReFetchAllItems}
            />
        );

        const collectButton = screen.getByRole("button", {name: "Collect"});
        fireEvent.click(collectButton);

        await waitFor(() => {
            const successMessage = screen.getByAltText("Success GIF");
            expect(successMessage).toBeTruthy();
        });
    });


    it("Change Button name to item already collected", () => {
        const takenItemData = {...itemData, taken: 1};
        render(
            <ItemView
                itemData={takenItemData}
                setItemData={setItemData}
                setReFetchAllItems={setReFetchAllItems}
            />
        );

        const collectButton = screen.getByText("Item already collected");
        expect(collectButton).not.toBeNull();
    });
});