import React, { useState } from "react";
function QuestionBox({ addQuestion }) {
	const [question, setQuestion] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (question.trim()) {
			addQuestion(question); // add to list
		}
		console.log("Submitted Question:", question);
		setQuestion(""); //clear the input after the question
	};

	return (
		<div className="question-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					placeholder="Ask a question!"
				/>
				<button type="submit">Submit</button>

			</form>
		</div>
	)
}
export default QuestionBox;
