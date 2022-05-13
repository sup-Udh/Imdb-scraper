const express = require('express');
const app = express();
const scraper = require('../scraper');
const path = require('path');


// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const port = process.env.PORT || 3000;


//route for index page
app.get("/", function (req: any, res: any) {
    res.send("Hello World!");

  });


app.get('/search/:title',  (req: any, res: any) => {
    var titles = req.params.title;
    scraper.searchMovies(titles)
    scraper.searchMovies(titles)
    .then((movies: any []) => {
     //  console log the movies title
     res.json(movies);
    //  create a slector for the title of the movie

    //  res.render('index.ejs', {
    //     //  
    //         movies: movies 
    //     });
         
     })    
})

app.get('/movie/:imdbID', (req: any, res: any) => {
    scraper.getMovie(req.params.imdbID)
    .then((movie: any) => {
        res.json(movie);
        // get the movie title
    })
})


app.listen(port, () => {
    console.log(`Listening on port http://localhost${port}`);
})