module.exports = {
    dev: true,
    localuser: process.env.DEVUSER,
    localpass: process.env.DEVPASS,
    localdb: process.env.DEVDB,
    awsUser: process.env.PGUSER,
    awsPass: process.env.PGPASSWORD,
    awsDb: process.env.PGDATABASE,
    awsHost: process.env.PGHOST
}