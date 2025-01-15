import {describe, expect, it} from "vitest";
import CloseButton from "../../src/ui-elements/CloseButton.jsx";
import {render, screen} from "@testing-library/react";

describe("CloseButton", () => {
    it("should render a close button and handle click", () => {
        let close = false;
        const handleClick = () => {
            close = true;
        };

        render(<CloseButton handelClick={handleClick}/>);

        expect(screen.getByRole("img")).toBeTruthy();

        screen.getByRole("img").click();
        expect(close).toBe(true);
    });
});