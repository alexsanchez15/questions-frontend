import React, { useState } from 'react';
import './App.css';
import QuestionBox from './components/QuestionBox';
import QuestionList from './components/QuestionList';
import MakeHeading from './components/header';
import HomePage from './components/HomePage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [questions, setQuestions] = useState([]); //initialize as empty array
  const [hasError, setHasError] = useState(false);

  const path = window.location.pathname;

  const apiUrl = `http://localhost:8080/api${path}`; // api uri also a const

  // fetch questions from the site (for now using only /alex)
  const fetchQuestions = () => {

    const apiUrl = `http://localhost:8080/api${path}`; // api uri also a const
    console.log(apiUrl);
    if (apiUrl === `http://localhost:8080/api/`) {
      return
    }
    fetch(apiUrl).then(response => {
      if (!response.ok) {
        setHasError(true);
        throw new Error("table doesnt exist :p");
      }
      return response.json();
    }).then(data => {

      setQuestions(data);
      console.log("successfully read: ", data)
      console.log("successfully read from:", apiUrl)
    }).catch(error => console.error("error fetching data,", error));
  };

  //useEffect that polls for new database information every 5 seconds
  //initially fetch when componenet mounts
  //runs furst thing. If causes an error, show error page.
  React.useEffect(() => {
    fetchQuestions();
    const intervalID = setInterval(fetchQuestions, 10000);
    return () => clearInterval(intervalID);

  }, []);



  //function to add a new state to the state
  // now i am going to deal with my database :> 
  // need to add it first, and then fetch questions from db. somewhat inefficent but i dont want issues with two items of the same id EVER existing.
  const addQuestion = (question) => {
    const newQuestion = {
      action: 'create',
      question: question,
    }
    const jsonData = JSON.stringify(newQuestion);
    postData(apiUrl, jsonData).then((response) => {
      console.log("Server response:", response)
      fetchQuestions(); //reload the questions with new stuff
    })
      .catch((error) => {
        console.error("failed to send data", error);
      });
  };

  // handle votes logic
  const handleVote = (id, type) => {
    setQuestions((allQs) =>
      allQs.map((question) => {
        if (question.id === id) {
          const voteData = {
            action: "vote",
            question_id: id,
            vote_type: (type === -1) ? "downvote" : "upvote"
          }
          console.log("sending data now:");
          const jsonData = JSON.stringify(voteData);
          postData(apiUrl, jsonData).then((response) => {
            console.log("Server response:", response)
          })
            .catch((error) => {
              console.error("failed to send voting data", error);
            });



        }

        fetchQuestions()
        return question;
      })
    )
  }

  async function postData(url, data) {
    try {
      //data is already a stringified JSON object smile
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (!response.ok) {
        throw new Error('Error in http : ( status:', response.status);
      }
      const responseData = await response.text(); // wait for the response
      return responseData;
    } catch (error) {
      console.error("error posting to url ", error);
      return { error: error.message };
    }
  }

  if (hasError) {
    return <div>404 - Website does not exist.</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={
          <div>
            <MakeHeading />
            <QuestionBox addQuestion={addQuestion} />
            <QuestionList questions={questions.sort((a, b) => b.votes - a.votes)} handleVote={handleVote} />
          </div>
        } />
      </Routes>
    </Router>

  );

}
export default App;
