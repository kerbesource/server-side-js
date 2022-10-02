# server-side-js | 2022-10-02

**Since I cannot take participate on the lesson on 2022-10-08 due to the collision with 'Szakértői rendszerek' (taught by Baumgartner János), I decided to deal with 'Szerver oldali JavaScript programozás' today (2022-10-02).**

Below is a summary of the learning path I took today:

1. **Learn how to use TypeScript in a Node.js project.**
- Documentation used: https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/
- Source code: \2022-10-02\learn-ts\

2. **Learn how to use Sequelize (database management) in an Express app, using PostgreSQL.**
- Documentation used: https://sequelize.org/docs/v6/getting-started/
- Source code: \2022-10-02\learn-sequelize\
- In this project, I have implemented a full-CRUD API for the Vehicle data model, utilizing Sequelize with PostgreSQL.
- I included a *Postman request collection* in the project for the API (learn-sequelize.postman_collection.json).

3. **Learn how to serve HTML content with Express and embed a frontend toolkit like Bootstrap.**
- Documentations used:
    - https://expressjs.com/en/starter/static-files.html
    - https://dev.to/bam92/how-to-add-bootstrap-to-your-nodejs-project-ngc
    - https://www.geeksforgeeks.org/express-js-res-sendfile-function/
- Source code: \2022-10-02\learn-express-html\

4. **Put it all together: I created an app that adds a minimal bootstrap frontend to the previously created full-CRUD API (see 2).**
- No documentations used.
- Stack: TypeScript, Express, Sequelize, PostgresSQL, Bootstrap.
- Source code: \2022-10-02\ts-express-sequelize-postgres-bootstrap\

Planned for next occasion:
- Node.js development in Microsoft Azure and CI/CD pipelines:
    - https://learn.microsoft.com/en-us/training/modules/build-node-cosmos-app-vscode/
    - https://learn.microsoft.com/en-us/training/modules/deploy-nodejs/
    - https://learn.microsoft.com/en-us/training/modules/shift-nodejs-express-apis-serverless/
    - https://learn.microsoft.com/hu-hu/training/modules/build-a-web-app-with-mean-on-a-linux-vm/
