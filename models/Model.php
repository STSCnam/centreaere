<?php

namespace Models;

use Utils\MySQL;

$env = json_decode(file_get_contents(__DIR__ . '/../env.json'));

abstract class Model {
    protected static function getPool(): MySQL {
        global $env;

        return new MySQL($env->mysql);
    }
}