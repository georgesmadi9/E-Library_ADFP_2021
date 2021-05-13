# E-Library_ADFP_2021
Final Project on REST API using Spring boot. 
This application is a simple E-Library simulation realised by Peter Harfouche, Christian Maalouly, Georges Madi and Raphael Sassine.

Possible Requests:
|                     URI                    | Method |                                      Description                                           |
|:------------------------------------------:|:------:|:------------------------------------------------------------------------------------------:|
| /api/Books                                 |   GET  |Affiche tous les livres                                                                     |
| /api/Books/{id}                            |   GET  |Affiche le livre ayant l’id {id}                                                            |
| /api/Books?title={title}                   |   GET  |Affiche le(s) livre(s) ayant un titre contenant {title}                                     |
| /api/Books?author={author}                 |   GET  |Affiche le(s) livre(s) ayant une note minimale de {rating}                                  |
| /api/Books?rating={rating}                 |   GET  |Affiche le(s) livre(s) écrit(s) par l’auteur {author}                                       |
| /api/Books?author={author}&rating={rating} |   GET  |Affiche le(s) livre(s) écrit(s) par l’auteur {author} et ayant une note minimale de {rating}|
| /api/Books                                 |  POST  |Ajoute un livre                                                                             |
| /api/Books/{id}                            |   PUT  |Modifie le livre avec l’id {id}                                                             |
| /api/Books/{id}                            | DELETE |Modifie le livre avec l’id {id}                                                             |
