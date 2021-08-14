
# demo-graphql-client-app

An example app that has feeds / threads / posts etc.

## how

### install

```
git clone https://github.com/sunrise-choir/demo-graphql-client-app
cd 
npm install
```

## develop

### Generate the latest graphql schema and fragments from the ssb-patchql graphql endpoint (assuming it's running at port 8080)

```
npm run graphql:rebuild
```

```
npm start
```

browse to <http://localhost:9966/>.

## test

```
npm test
```

## deploy

```
npm run deploy
```
