#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const urljoin = require('url-join');
const chalk = require('chalk');
const Table = require('cli-table');
const axios = require('axios')

// Options Shortcuts - Commander

program
    .version('1.0.0')
    .option('-a, --charactersByName', 'Search heros by name and show ID and Description')
    .option('-b, --charactersStartWith', 'Search heros by beginning characters and show ID and Description')
    .option('-c, --comicsByCharacterId', 'Search comics by character ID')
    .option('-d, --comicsById', 'Search comics by ID and show Description and Price')
    .option('-e, --seriesByCharacterId', 'Search series by Character ID')
    .option('-f, --seriesById', 'Search series by ID')

program.parse(process.argv)

// Questions - Inquirer

const question_charactersByName = [
    {
      type : 'input',
      name : 'charactersByName',
      message : "Recherche de personnage par nom exact :"
    }
  ];

const question_charactersStartWith = [
    {
      type : 'input',
      name : 'charactersStartWith',
      message : "Recherche de personnage dont le nom commence par :"
    }
  ];

const question_comicsByCharacterId = [
    {
      type : 'input',
      name : 'comicsByCharacterId',
      message : "Recherche de comics par ID de personnage :"
    }
  ]; 

const question_comicsById = [
    {
      type : 'input',
      name : 'comicsById',
      message : "Recherche de comics par ID :"
    }
  ]; 

const question_seriesByCharacterId = [
    {
      type : 'input',
      name : 'seriesByCharacterId',
      message : "Recherche de series par ID de personnage :"
    }
  ];
  
const question_seriesById = [
    {
      type : 'input',
      name : 'seriesById',
      message : "Recherche de series par ID :"
    }
  ]; 

// Requête API - Recherche de héros par nom exact - Affiche l'ID, Description, Comics, Séries, Stories, Events disponibles.

if (program.charactersByName) {
    
    inquirer
    .prompt(question_charactersByName).then(answers => {
        
        url = 'characters?name=' + Object.values(answers)
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public', url, '&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')

        axios.get(fullUrl)
        .then((responseCharacters) => {
            
            const characters = responseCharacters.data.data.results
                    
            characters.forEach(element => {
                        
                if (Object.values(answers) == element.name) {
            
                    console.log(chalk.blue("\nID : ") + element.id + chalk.blue(" | Personnage : ") + element.name)
                    console.log(chalk.blue("\nDescription : \n\n") + element.description)
                    console.log(chalk.blue("\nComics disponibles : ") + element.comics.available 
                                + chalk.blue(" | Séries disponibles : ") + element.series.available 
                                + chalk.blue(" | Stories disponibles : ") + element.stories.available 
                                + chalk.blue(" | Evenements disponibles : ") + element.events.available + "\n")           
                };
            });     
        })
        .catch(function (error) {
            console.log(error);
        })
    })

// Requête API - Recherche de héros dont le nom commence par "?" - Affiche l'ID, Description, Comics, Séries, Stories, Events disponibles. 

} else if (program.charactersStartWith) {

    inquirer
    .prompt(question_charactersStartWith).then(answers => {
        
        url = 'characters?nameStartsWith=' + Object.values(answers)
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public/', url, '&limit=100&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
        axios.get(fullUrl)
        .then((responseCharacters) => {

            const characters = responseCharacters.data.data.results
                        
            characters.forEach(element => {           
                
                console.log(chalk.blue("\nID : ") + element.id + chalk.blue(" | Personnage : ") + element.name)
                if (element.description !== "") {  
                    console.log(chalk.blue("\nDescription : \n\n") + element.description)
                }
                console.log(chalk.blue("\nComics disponibles : ") + element.comics.available 
                            + chalk.blue(" | Séries disponibles : ") + element.series.available 
                            + chalk.blue(" | Stories disponibles : ") + element.stories.available 
                            + chalk.blue(" | Evenements disponibles : ") + element.events.available + "\n")      
            });
            
            console.log("\b")            
        })
        .catch(function (error) {
            console.log(error);
        })
    })

} 

// Requête API - Recherche de comics par ID de héros - Affiche l'ID du comic et le titre

else if (program.comicsByCharacterId) {
    
    inquirer
    .prompt(question_comicsByCharacterId).then(answers => {
        
        url = String(Object.values(answers))
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public/characters/', url, '/comics?&format=comic&limit=100&orderBy=title&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
        axios.get(fullUrl)
        .then((responseComics) => {
            
            const comics = responseComics.data.data.results
            const table = new Table({
                head: ['Comic ID', 'Titre'],
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                       , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                       , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                       , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
              });

            comics.forEach(element => {           
                
                table.push([element.id, element.title]);    
            });
            
            console.log(table.toString())
            console.log("\b")     
        })
        .catch(function (error) {
            console.log(error);
        })
    })
}

// Requête API - Recherche de comics par ID - Affiche la description, les personnages et le prix

else if (program.comicsById) {
    
    inquirer
    .prompt(question_comicsById).then(answers => {
        
        url = String(Object.values(answers))
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public/comics/', url, '?&format=comic&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
        axios.get(fullUrl)
        .then((responseComics) => {
            
            const comics = responseComics.data.data.results
                        
            comics.forEach(element => {           
                
                console.log(chalk.blue("\nID : ") + element.id + chalk.blue(" | Titre : ") + element.title + chalk.blue(" | Format : ") + element.format)
                console.log(chalk.blue("\nDescription : ") + element.description)
                console.log(chalk.blue("\nPersonnages : \n"))
                
                element.characters.items.forEach(characters => {

                    console.log(characters.name)
                })

                element.prices.forEach(prices => {

                    console.log(chalk.blue("\nType : ") + prices.type + chalk.blue(" | Prix : ") + prices.price + " €")
                })

                console.log(chalk.yellow("\nSeries associés : ") + element.series.name)
                
                console.log(chalk.red("\nStories associés : ") + element.stories.available)

                element.stories.items.forEach(stories => {

                    console.log(chalk.red("\nStories : ") + stories.name)
                })

                console.log(chalk.green("\nEvenements associés : ") + element.events.available)

                element.events.items.forEach(events => {

                    console.log(chalk.orange("\nEvenements : ") + events.name)
                })
                    
            });
            
            console.log("\b")     
        })
        .catch(function (error) {
            console.log(error);
        })
    })

} 

// Requête API - Recherche de series par ID de héros - Affiche l'ID de la série et le titre

else if (program.seriesByCharacterId) {
    
    inquirer
    .prompt(question_seriesByCharacterId).then(answers => {
        
        url = String(Object.values(answers))
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public/characters/', url, '/series?&limit=100&orderBy=title&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
        axios.get(fullUrl)
        .then((responseSeries) => {
            
            const series = responseSeries.data.data.results
            const table = new Table({
                head: ['ID Série', 'Titre'],
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                       , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                       , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                       , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
              });

            series.forEach(element => {           
                
                table.push([element.id, element.title]);    
                // console.log(chalk.blue("\nID : ") + element.id + chalk.blue(" | Titre : ") + element.title)
            });
            
            console.log(table.toString())
            console.log("\b")     
        })
        .catch(function (error) {
            console.log(error);
        })
    })

} 

// Requête API - Recherche de series par ID - Affiche l'ID, le titre, les années, la description, les personnages, les comics, stories et evenements

else if (program.seriesById) {
    
    inquirer
    .prompt(question_seriesById).then(answers => {
        
        url = String(Object.values(answers))
        let fullUrl = urljoin('https://gateway.marvel.com:443/v1/public/series/', url, '?&ts=1&apikey=01907a0e43ea09e2dd60256479542cd3&hash=594983bea9a4bb32904aead39c6b11cf')
        axios.get(fullUrl)
        .then((responseSeries) => {
            
            const series = responseSeries.data.data.results
                        
            series.forEach(element => {           
                
                console.log(chalk.blue("\nID : ") + element.id + chalk.blue(" | Titre : ") + element.title)
                console.log(chalk.blue("\nDébut : ") + element.startYear + chalk.blue(" | Fin : ") + element.endYear)
                if(element.description !== null) {
                    console.log(chalk.blue("\nDescription : ") + element.description)
                }
                console.log(chalk.blue("\nPersonnages : \n"))
                
                element.characters.items.forEach(characters => {

                    console.log(characters.name)
                })
                
                console.log(chalk.yellow("\nComics associés : ") + element.comics.available)

                element.comics.items.forEach(comics => {

                    console.log(chalk.yellow("\nComics : ") + comics.name)
                })

                console.log(chalk.red("\nStories associés : ") + element.stories.available)

                element.stories.items.forEach(stories => {

                    console.log(chalk.red("\nStories : ") + stories.name)
                })

                console.log(chalk.green("\nEvenements associés : ") + element.events.available)

                element.events.items.forEach(events => {

                    console.log(chalk.orange("\nEvenements : ") + events.name)
                })
            });
            
            console.log("\b")     
        })
        .catch(function (error) {
            console.log(error);
        })
    })

} 

else {
    program.help()
}





    
    
    
