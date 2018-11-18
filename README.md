# API_Marvel

Ceci est un CLI (Command Line Interface) en Node.js qui permet d'effectuer des requêtes de recherche sur l'API de Marvel.

--------------------------------------------------------------

Modules utilisés : 

- Commander pour les shortcuts CLI
- Inquirer pour les input utilisateurs
- Url-join pour la concaténation d'URL
- Chalk pour colorer les outputs
- Cli-table pour afficher les outputs sous forme de table
- Axios pour les requêtes API

--------------------------------------------------------------

L'application :

-  -a, --charactersByName     Search heros by name and show ID and Description
-  -b, --charactersStartWith  Search heros by beginning characters and show ID and Description
-  -c, --comicsByCharacterId  Search comics by character ID
-  -d, --comicsById           Search comics by ID and show Description and Price
-  -e, --seriesByCharacterId  Search series by Character ID
-  -f, --seriesById           Search series by ID
-  -h, --help                 output usage information

--------------------------------------------------------------

Les différentes types de recherche sont :
  
  - Par nom exact de héros - Affiche l'ID, description, les comics, les séries, les stories et les events disponibles.
  - Par héros dont le nom commence par "?" - Affiche l'ID, description, les comics, les séries, les stories et les events.
  - De comics par ID de héros - Affiche l'ID des comics et les titres
  - De comics par ID - Affiche la description, les personnages, le prix, les séries, les stories et les events
  - De series par ID de héros - Affiche l'ID des séries et les titre
  - De series par ID - Affiche l'ID, le titre, les années, la description, les personnages, les comics, stories et events

--------------------------------------------------------------

Exemple d'utilisation :

marvel -a : entrer exactement le nom du héros : copier l'ID pour chercher les comics ou séries associées
ou
marvel -b : entrer le nom du héros ou juste les lettres par lesquelles il commence

marvel -c : entrer l'ID du héros : Copier l'ID du comic souhaité pour plus d'informations.
ou 
marvel -e : entrer l'ID du héros : Copier l'ID de la série souhaitée pour plus d'informations.

marvel -d : entrer l'ID du comic pour afficher les informations
ou
marvel -f : entrer l'ID de la série pour afficher les informations

---------------------------------------------------------------

marvel -a : Hulk

ou

marvel -b : H et copier ID héros souhaité

marvel -c : ID Heros : 1009351 : Copier ID Comic souhaité : 38524

ou

marvel -e : ID Heros : 1009351 : Copier ID Série souhaitée : 22406

marvel -d : 38524

ou

marvel -f : 22406

