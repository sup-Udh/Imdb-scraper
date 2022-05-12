
const express = require('express');
const app = express();
const scraper = require('../scraper');
const port = process.env.PORT || 3000;
app.get('/', (req: any, res: any) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.get('/search/:title',  (req: any, res: any) => {
    const title = req.params.title;
     scraper.searchMovies(title)
     .then((movies: any []) => {
      //  console log the movies title
      res.json(movies);
          
      })

})

app.get('/movie/:imdbID', (req: any, res: any) => {
    scraper.getMovie(req.params.imdbID)
    .then((movie: any) => {
        res.json(movie);
    })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})