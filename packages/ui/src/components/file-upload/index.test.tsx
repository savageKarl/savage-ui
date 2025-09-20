import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FileUpload from "./index"; // 假设你的组件导出为 default

describe("FileUpload", () => {
	it("renders the default placeholder when no file is provided", () => {
		render(<FileUpload value={null} onFileChange={() => {}} />);

		const placeholderText = screen.getByText(/Click or drag and drop a file/i);
		expect(placeholderText).toBeInTheDocument();
	});

	it("renders the preview when a file is provided", () => {
		const mockFile = new File(["hello"], "hello.png", { type: "image/png" });
		const onFileChange = vi.fn();
		render(<FileUpload value={mockFile} onFileChange={onFileChange} />);

		// URL.createObjectURL is not available in JSDOM, so we test for filename presence
		const fileNameElement = screen.getByText("hello.png");
		expect(fileNameElement).toBeInTheDocument();
	});

	it("is disabled when the disabled prop is true", () => {
		render(<FileUpload value={null} onFileChange={() => {}} disabled={true} />);

		// The component's root div should have the cursor-not-allowed class
		const container = screen
			.getByText(/Click or drag and drop a file/i)
			.closest('div[aria-disabled="true"]');
		expect(container).toBeInTheDocument();
	});
});
