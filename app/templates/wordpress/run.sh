#! /bin/bash

# git clone git://develop.git.wordpress.org/

eval "$(docker-machine env default)"

docker run -d -p 80:80 -p 3306:3306 -v $(pwd)/public:/var/www/html -v $(pwd)/themesrc:/var/www/html/content/themes/<%= appName %> --name <%= appName %> -e MYSQL_PASS="matise" tutum/lamp

# echo -e '## Docker container for <%= appName %> /n192.168.99.100 <%= appName %>.dev' | sudo tee -append /etc/hosts >> /dev/null

IPADDRESS=$(docker-machine ip)
PORTS=$(docker port <%= appName %>);
LOG=$(docker logs <%= appName %>);

if grep "<%= appName %>" /etc/hosts
then
  echo "<%= appName %> is already in hosts file"
else
  sudo sh -c "echo $IPADDRESS <%= appName %>.dev >> /etc/hosts"
fi

echo -e "IP address is:\n$IPADDRESS\n"

echo -e "Ports are:\n$PORTS"

echo -e "Logfile:\n$LOG"
