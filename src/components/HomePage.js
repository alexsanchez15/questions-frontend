import { React, useState } from "react";

const HomePage = () => {
	const [table_name, setTableName] = useState("");
	const path = window.location.pathname;

	const apiUrl = `http://localhost:8080/api${path}`; // api uri also a const
	const homePageSubmit = async (e) => {
		e.preventDefault();
		if (table_name.trim()) {
			//if their response is an actual response, post to homepage and get redirected.
			try {
				const response = await fetch(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(table_name)

				});
				console.log(response);

				if (response.ok) {
					// Redirect the client to the server-provided URL
					window.location.href = `${window.location.origin}/${table_name}`;

				} else {
					console.log("Server did not redirect.");
				}
			}
			catch (error) {
				console.error("Error posting to homepage,", error);
			}

		}

		console.log("Submitted to homepage: ", table_name);
	};
	return (
		<div>
			<h1>Questions app Homepage :  )</h1>
			<p> This is the main landing page.
				You can either enter an existing room name, or create a new one!</p>

			<div className="question-form">
				<form onSubmit={homePageSubmit}>
					<input
						type="text"
						value={table_name}
						onChange={(e) => setTableName(e.target.value)}
						placeholder="Enter a room name, or create a new one!"
					/>
					<button type="submit">Submit</button>

				</form>
			</div>
		</div>
	);

};
export default HomePage;
