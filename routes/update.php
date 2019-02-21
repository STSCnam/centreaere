<?php

use Enginr\Router;
use Models\Children;

$router = new Router();

$router->get('/', function($req, $res) use ($env) {
    Children::update((int)$req->body->idChild, (int)$req->body->idRoom);

    $res->send('Update complete.');
});

return $router;