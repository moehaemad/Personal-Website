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
| (C) Insert     | /insertCard      | {id: String, front: String, back: string}      | `default`      |
| *done*(R) Validate  | /checkuser/:username/:pass | <-| {result: true, userId: `username`}       |
| (R) Read  | /getDecks/:id/:username | <-| {result: true, userId: `username`}       |
| (R) Read  | /getCards/:id | <-| {result: true, ids: Integer[], front: String[], back: String[]}       |
| (U) Update | /setCard      | {column: String, id: String, front: String, back: String}      | `default`      |
| (U) Update | /setDeckName      | {column: String, id: String, username: String, description: String}      | `default`      |
| Delete  | /delCard/:id      | <-| `default`      |
| Delete  | /delDeck/:id/:username      | <-| `default`      |