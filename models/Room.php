<?php

namespace Models;

class Room extends Model {
    public static function findByIdHome(int $id): array {
        $dbh = parent::getPool();

        $result = $dbh->query(
            'SELECT t1.*, (
                SELECT COUNT(t2.idEnfant) 
                FROM centreaere.enfant AS t2 
                WHERE t2.numChambre = t1.idChambre
             ) AS nbEnfants
             FROM centreaere.chambre AS t1
             WHERE t1.numMaison = :id AND t1.idChambre <> 0',
            [':id' => $id]
        );
        
        $dbh->close();

        return $result;
    }
}