<?php

namespace Models;

class Children extends Model {
    public static function findFree(): array {
        $dbh = parent::getPool();

        $result = $dbh->query('SELECT * FROM centreaere.enfant WHERE numChambre = 0');

        $dbh->close();

        return $result;
    }

    public static function findByIdRoom(int $id): array {
        $dbh = parent::getPool();        

        $result = $dbh->query(
            'SELECT * FROM centreaere.enfant WHERE numChambre = :id',
            [':id' => $id]
        );

        $dbh->close();

        return $result;
    }

    public static function update(int $idChild, int $idRoom): void {
        $dbh = parent::getPool();

        $sql = 'UPDATE centreaere.enfant 
                SET numChambre = :idRoom
                WHERE idEnfant = :idChild';

        $dbh->query('SET foreign_key_checks = 0');

        $dbh->query($sql, [
            ':idRoom' => $idRoom,
            ':idChild' => $idChild
        ]);

        $dbh->query('SET foreign_key_checks = 1');

        $dbh->close();
    }
}