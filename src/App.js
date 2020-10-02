import React, { useState, useEffect } from "react";
import Article from "./components/Article";

function App() {
	const [articles, setArticles] = useState([]);
	const [subreddit, setSubreddit] = useState("webdev");

	useEffect(
		() => {
			fetch(`https://www.reddit.com/r/${subreddit}.json`).then((result) => {
				if (result.status !== 200) {
					console.log(`fetch() Error: result.status = ${result.status}`);
					return;
				}

				result.json().then((data) => {
					if (data !== null) {
						setArticles(data.data.children);
					}
				});
			});
		},
		// The second argument for useEffect() is the dependency, i.e. useEffect will only run if
		// the dependency updates. In this case, the fetch() method will only run if the subreddit
		// state updates
		[subreddit]
	);

	return (
		<div className="App">
			<header className="App-header">
				<input
					type="text"
					className="input"
					value={subreddit}
					onChange={(e) => setSubreddit(e.target.value)}
				/>
			</header>
			<div className="articles">
				{articles != null
					? articles.map((article, index) => (
							<Article key={index} article={article.data} />
					  ))
					: ""}
			</div>
		</div>
	);
}

export default App;
