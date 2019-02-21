<?php

use Enginr\Router;
use Models\{
    Home, 
    Room,
    Children
};

$router = new Router();

$router->get('/homes', function($req, $res) use ($env) {
    $res->send(Home::findAll());
});

$router->get('/rooms', function($req, $res) use ($env) {
    $res->send(Room::findByIdHome((int)$req->body->id));
});

$router->get('/childrens', function($req, $res) use ($env) {
    $res->send(Children::findFree());
});

$router->get('/childsInRoom', function($req, $res) use ($env) {
    $res->send(Children::findByIdRoom((int)$req->body->id));
});

return $router;