# Personal Website

---

Hosting on AWS EC2 Elastic Beanstalk instance with a Relational Database Integration (AWS RDS PostgreSQL) using an NGINX configured proxy server.

>note: this page sends emails to and between one email in the configuration and will not go anywhere else.

Routes: (for STFC):
https://moehaemad.ca/structuredFlashCards/

| Operation       | Method |Route           | Params           | Success={result: true}          |
| ------------- |:--------- |:-------------:|-------------:|-------------:|
| (**C**RUD) Create  |POST |  /createUser | {username: String, pass: String}| `default`|
| (**C**RUD) Create  |POST |  /createDeck | {id: String, username: String, description: String}| `default`      |something | 
| (**C**RUD) Insert     |POST |  /createCard      | {id: String, front: String, back: string}      |something |  `default`      |
| (C**R**UD) Validate  |GET |  /checkuser/:username/:pass | <---| `default`|
| (C**R**UD) Read  |GET |  /getDecks/:username | <---| {result: true, ids: {id: Integer}[]}       |
| (C**R**UD) Read  |GET |  /getCards/:id | <---| {result: true, cards: {front: String, back: String}[]}       |
| (CR**U**D) Update |PUT |  /setCard      | {columns: {columnName: String **:** value: String }[], specifyColumns: {columnName: String **:** value: String }[]}      | `default`      |
| (CR**U**D) Update |PUT |  /setDeck      | {columns: {columnName: String **:** value: String }[], specifyColumns: {columnName: String **:** value: String }[]}      | `default`      |
| (CRU**D**) Delete  |DELETE |  /delCard/:id/:front?/:back?      | <---| `default`      |
| (CRU**D**) Delete)  |DELETE |  /delDeck/:id/:username      | <---| `default`      |

An example of the update PUT function body:
`{columns: [{id: 0}, {front: 'exampleAfterUpdate'}], specifyColumns: [{id: 0}, {front: 'exampleBeforeUpdate'}]}`