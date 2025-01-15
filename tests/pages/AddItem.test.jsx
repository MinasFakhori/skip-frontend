import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import AddItem from "../../src/pages/AddItem.jsx";


describe("AddItem Component", () => {


    afterEach(() => {
        cleanup();
    });

    beforeEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
    });

    test("should render the AddItem form", () => {
        render(<AddItem geoLocation={[0, 0]} setAddPage={vi.fn()} setReFetchAllItems={vi.fn()}/>);

        expect(screen.getByPlaceholderText("Item Title")).toBeTruthy();
        expect(screen.getByPlaceholderText("Write a description about the item...")).toBeTruthy();
        expect(screen.getByText("Location:")).toBeTruthy();
    });

    test("should show success message when form is submitted successfully", async () => {
        render(<AddItem geoLocation={[0, 0]} setAddPage={vi.fn()} setReFetchAllItems={vi.fn()}/>);
        const title = screen.getByPlaceholderText("Item Title");
        fireEvent.change(title, {target: {value: "Item Title"}});

        const description = screen.getByPlaceholderText("Write a description about the item...");
        fireEvent.change(description, {target: {value: "Item Description"}});


        fireEvent.click(screen.getByText("Post item!"));

        await waitFor(() => {
            const successMessage = screen.getByRole("img", {alt: "Success GIF"});
            expect(successMessage).toBeTruthy();
        });
    });


    test("should show loading overlay when the item is being added", async () => {
        render(<AddItem geoLocation={[0, 0]} setAddPage={vi.fn()} setReFetchAllItems={vi.fn()}/>);
        fireEvent.change(screen.getByPlaceholderText("Item Title"), {target: {value: "Item Title"}});
        fireEvent.change(screen.getByPlaceholderText("Write a description about the item..."), {target: {value: "Item Description"}});
        fireEvent.click(screen.getByText("Post item!"));

        await waitFor(() => {
            const loading = screen.getByRole("img", {alt: "Loading GIF"});
            expect(loading).toBeTruthy();
        });
    });
});