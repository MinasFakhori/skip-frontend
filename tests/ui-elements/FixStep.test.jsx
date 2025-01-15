import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import FixStep from "../../src/ui-elements/FixStep.jsx";

describe("FixStep", () => {
    const stepData = {
        title: "Step 1",
        img: "https://example.com/icon.png",
    };

    it("renders the title, image, and description based on step prop", () => {
        render(<FixStep step={stepData}/>);

        // Level 3 is H3
        const title = screen.getByRole("heading", {level: 3});
        expect(title.textContent).to.equal(stepData.title);

        const img = screen.getByRole("img");
        expect(img.getAttribute("src")).to.equal(stepData.img);
        expect(img.getAttribute("alt")).to.equal(stepData.title);

    });
});