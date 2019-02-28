const restify = require('restify');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
  });
  
  const knex = require('knex')({
      client: 'mysql',
      connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '123456789',
        database : 'db'
      }
    });


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});

server.get("/all", function(req, res, next) {
  knex('velha').then(dados => {
    res.send(dados);
  }, next);

});


server.post("/save", function(req, res, next) {
    console.log(req.body);
    knex('velha')
    .insert(req.body)
    .then(dados => {
      return res.send(dados);
    }, next);
});

server.get(
  /\/(.*)?.*/,
  restify.plugins.serveStatic({
    directory: "./dist",
    default: "index.html"
  })
);