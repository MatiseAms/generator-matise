#! /bin/bash

# git clone git://develop.git.wordpress.org/

eval "$(docker-machine env default)"

docker run -d -p 80:80 -p 3306:3306 -v $(pwd)/public:/var/www/html --name <%= appName %> -e MYSQL_PASS="matise" tutum/lamp

IPADDRESS=$(docker-machine ip)
PORTS=$(docker port <%= appName %>);
LOG=$(docker logs <%= appName %>);

if grep "<%= appName %>.dev" /etc/hosts
then
  echo "<%= appName %> is already in hosts file"
else
  sudo sh -c "echo $IPADDRESS <%= appName %>.dev >> /etc/hosts"
fi

sleep 10

echo -e "IP address is:\n$IPADDRESS\n"

echo -e "Ports are:\n$PORTS"

echo -e "Logfile:\n$LOG"

docker exec -i <%= appName %> /bin/bash -c 'mysql -uadmin -pmatise -e "CREATE DATABASE wordpress"'
