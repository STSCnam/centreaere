<?php

namespace Utils;

class MySQL {
    private $_dbh;

    public function __construct(object $ids) {
        try {
            $this->_dbh = new \PDO(
                "mysql:host=$ids->host;port=$ids->port",
                $ids->user,
                $ids->password,
                [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]
            );
        } catch (\PDOException $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function query(string $sql, array $params = []): array {
        $stmt = $this->_dbh->prepare($sql);
        $result = null;

        $stmt->execute($params);

        try {
            $result = $stmt->fetchAll(\PDO::FETCH_OBJ);
        } catch (\PDOException $e) {}

        return $result ? $result : [];
    }

    public function close(): void {
        $this->_dbh = null;
    }
}