import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import ScreenBtn from "../../src/ui-elements/ScreenBtn.jsx";

import {afterEach, describe, expect, it} from "vitest";

describe("ScreenBtn component", () => {

    afterEach(() => {
        cleanup();
    });

    it("renders the button image", () => {
        render(
            <ScreenBtn
                img="https://example.com/icon.png"
                alt="test icon"
                hasOrangeBg={false}
            />
        );

        const imgElement = screen.getByAltText("test icon");
        expect(imgElement.getAttribute("src")).toBe("https://example.com/icon.png");
    });

    it("calls handleClick when clicked", () => {
        let clicked = false;
        const handleClick = () => {
            clicked = true
        };

        render(
            <ScreenBtn
                img="https://example.com/icon.png"
                alt="test icon"
                hasOrangeBg={false}
                handleClick={handleClick}
            />
        );

        const button = screen.getByRole("img");
        fireEvent.click(button);
    });
});