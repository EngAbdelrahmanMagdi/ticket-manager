<?php

$filePath = 'vendor/danielmewes/php-rql/rdb/ValuedQuery/ValuedQuery.php';

if (file_exists($filePath)) {
    $content = file_get_contents($filePath);
    $content = str_replace('return new Match($this, $expression);', 'return new \\r\\Queries\\Math\\Match($this, $expression);', $content);
    $content = str_replace('public function match($expression)', 'public function rMatch($expression)', $content);
    file_put_contents($filePath, $content);
    echo "Fixed PHP 8+ Match keyword compatibility in php-rql package\n";
} else {
    echo "php-rql package not found\n";
}
