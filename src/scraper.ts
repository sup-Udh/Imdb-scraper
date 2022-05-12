
const cheerio = require('cheerio');
import { response } from "express";
import fetch from "node-fetch";

const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';
const movieUrl = 'https://www.imdb.com/title/'; 

async function searchMovies(searchTerm : any){
    return fetch(`${url}${searchTerm}`)
    .then(response => response.text())

    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        // get all the images from the page
        const $images = $('td a img');
        // console logging only the src of the images

        var $eachImage = $('td a img').each((i: any, element: any) => {
            movies.push($images.attr('src'))
        })
         
        var $eachtitle = $('td.result_text a').each((i: any, title: any) => {
            movies.push(title.children[0].data);
        })

        // show imdb id for each movie
        var $eachid = $('td.result_text a').each((i: any, id: any) => {
            movies.push(id.attribs.href.split('/')[2]);
        })

        // get the rating for each movie
        var $eachrating = $('td.result_text span[itemprop="ratingValue"]').each((i: any, rating: any) => {
            movies.push(rating.children[0].data);
        })

        const movie = {
            title: $eachtitle.text(), 
            imdbID: $eachid.text(),
            rating: $eachrating.text(),
            images: $eachImage.attr('src')
        
        }
        movies.push(movie);

        return movies
    
    })
    
    
}



async function getMovie(imdbID : any){
    return fetch(`${movieUrl}${imdbID}`)
    .then(response => response.text())
    .then(async body => {
        const $ = cheerio.load(body);
        // get the title of the movie inside the div with class
        const $title = $('div h1').text();
        // get the rating of the movie with the selector
        // await this.getRating(imdbID);

        const $rating = $('span[class="sc-7ab21ed2-1 jGRxWM"]')
        console.log($rating.text());
        // trim the rating to only show the number
        const finalRating = $rating.text().slice(0, -5) + '/10';
    
        const description = $('span[class="sc-16ede01-2 gXUyNh"]').text();

        const genere = $('a ul li').text();
        const generes: any[] = []
        const $eachGenere = $('a ul li').each((i: any, genere: any) => {
            generes.push(genere.children[0].data);
        })
        let content = $('span[class="sc-8c396aa2-2 itZqyK"]').text();
        // slice the first four characters from the content
        let contentSliced = content.slice(4);
        let datePublished = $('span[class="sc-8c396aa2-2 itZqyK"]').text();
        // slice two charaters from the right 
        let datePublishedSliced = datePublished.slice(0, -2);
        return{
            title: $title,
            rating: finalRating,
            description: description,
            genere: generes,
            Content: contentSliced,
            datePublished: datePublishedSliced
            

        }

    });
}


module.exports = {
    searchMovies,
    getMovie
    
}