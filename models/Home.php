<?php

namespace Models;

class Home extends Model {
    public function findAll(): array {
        $dbh = parent::getPool();

        $result = $dbh->query('SELECT * FROM centreaere.maison');

        $dbh->close();

        return $result;
    }
}