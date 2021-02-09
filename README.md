# Personal Website

---

Hosting on AWS EC2 Elastic Beanstalk instance with a Relational Database Integration (AWS RDS PostgreSQL) using an NGINX configured proxy server.

>note: this page sends emails to and between one email in the configuration and will not go anywhere else.

Routes: (for STFC):
https://moehaemad.ca/structuredFlashCards/

| Operation       | Route           | Params           | Success={result: true}          |
| ------------- |:-------------:|-------------:|-------------:|
| (C) Create  | /createUser | {username: String, pass: String}| `default`|
| (C) Create  | /createDeck | {id: String, username: String, description: String}| `default`      |
| (C) Insert     | /createCard      | {id: String, front: String, back: string}      | `default`      |
| (R) Validate  | /checkuser/:username/:pass | <---| `default`|
| (R) Read  | /getDecks/:id/:username | <---| {result: true, ids: {id: Integer}[]}       |
| (R) Read  | /getCards/:id | <---| {result: true, cards: {front: String, back: String}[]}       |
| (U) Update | /setCard      | {columns: {columnName: String **:** value: String }[], specifyColumns: {columnName: String **:** value: String }[]}      | `default`      |
| (U) Update | /setDeckName      | {column: String, id: String, username: String, description: String}      | `default`      |
| (D) Delete  | /delCard/:id/:front?/:back?      | <---| `default`      |
| (D) Delete)  | /delDeck/:id/:username      | <---| `default`      |