# Personal Website

---

Hosting on AWS EC2 Elastic Beanstalk instance with a Relational Database Integration (AWS RDS PostgreSQL) using an NGINX configured proxy server.

>note: this page sends emails to and between one email in the configuration and will not go anywhere else.

Routes: (for STFC):
https://moehaemad.ca/structuredFlashCards/

| Operation       | Route           | Params           | Success={result: true}          |
| ------------- |:-------------:|-------------:|-------------:|
| *done*(C) Create  | /createUser | {username: String, pass: String}| `default`|
| *done*(C) Create  | /createDeck | {id: String, username: String, description: String}| `default`      |
| *done*(C) Insert     | /createCard      | {id: String, front: String, back: string}      | `default`      |
| *done*(R) Validate  | /checkuser/:username/:pass | <-| `default`|
| *done*(R) Read  | /getDecks/:id/:username | <-| {result: true, ids: {id: Integer}[]}       |
| *done*(R) Read  | /getCards/:id | <-| {result: true, cards: {front: String, back: String}[]}       |
| (U) Update | /setCard      | {column: String, id: String, front: String, back: String}      | `default`      |
| (U) Update | /setDeckName      | {column: String, id: String, username: String, description: String}      | `default`      |
| (D) Delete  | /delCard/:id      | <-| `default`      |
| (D) Delete)  | /delDeck/:id/:username      | <-| `default`      |