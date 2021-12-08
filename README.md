# How to run app

1. Pull backend image: **`docker pull webbylabhub/movies`**
2. Pull fronend image: **`docker pull alexlyakhotskiy/movies`**
3. Run backend container:
   **`docker run --name moviesBE -p 8000:8000 webbylabhub/movies`**
4. Run fronend container:
   **`docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 alexlyakhotskiy/movies`**

# Technologies

1. React.js
2. Redux/toolkit
3. Axios

# About app

1. Redux storage contains two entities: auth and movies
2. To manage storage used createSlice
3. Works with backend implemented through createAsyncThunk
4. Error validation is done through the backend
5. SPA's got two "pages" auth and movies
6. On auth page user can create account or signin into existed account
7. Movies page provides: <br> `1.` Add one movie <br> `2.` Import movies from
   .txt file <br> `3.` Remove one movie by id <br> `4.` Review a movie details
   <br> `5.` Show the list of movies sorted by title in alphabetical order <br>
   `6.` Find a movie by title or name of the actor <br>
