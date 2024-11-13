import React from 'react';

function QuestionList({ questions, handleVote }) {
	return (
		<div className="question-list">
			{questions.map((question) => (
				<div className={`question-box ${question.changed ? 'changed' : ''}`} key={question.id}>
					<p>{question.question}</p>
					<div className="button-group">
						<span className="vote-count">Votes: {question.votes}</span>
						<span className="id">ID: {question.id}</span>
						<button className="upvote" onClick={() => handleVote(question.id, 1)}> 👍 </button>
						<button className="downvote" onClick={() => handleVote(question.id, -1)}>👎</button>


					</div>
				</div>
			))}
		</div>
	);

}
export default QuestionList;
