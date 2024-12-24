import React, { useState } from "react";
import styles from './styles.module.css';
import { Mood, Book, Movie } from "@mui/icons-material";

const Home = () => {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mood, setMood] = useState("");
    const [genres, setGenres] = useState("");

    const dummySuggestions = [
        { type: "Movie", name: "Inception", genre: "Science Fiction" },
        { type: "Book", name: "Dune", genre: "Science Fiction" },
        { type: "Manga", name: "One Piece", genre: "Adventure" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Input:", { age, gender, mood, genres });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Find Your Next Adventure</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={styles.input}
                />
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={styles.select}
                >
                    <option value="" disabled>
                        Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="text"
                    placeholder="Your mood (e.g., Happy)"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Favorite genres (e.g., Sci-Fi)"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Get Suggestions
                </button>
            </form>
            <div className={styles.suggestions}>
                <h2 className={styles.subtitle}>Suggestions for You</h2>
                <div className={styles.suggestionsList}>
                    {dummySuggestions.map((item, index) => (
                        <div key={index} className={styles.suggestionItem}>
                            {item.type === "Movie" && <Movie className={styles.icon} />}
                            {item.type === "Book" && <Book className={styles.icon} />}
                            <div>
                                <h3 className={styles.suggestionTitle}>{item.name}</h3>
                                <p className={styles.suggestionGenre}>Genre: {item.genre}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
