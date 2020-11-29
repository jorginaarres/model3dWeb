#!/bin/bash

while getopts username:password: flag
do
    case "${flag}" in
        username) username=${OPTARG};;
        password) password=${OPTARG};;
    esac
done
sshpass -f <(printf '%s\n' $password) ssh $username@hackeps.salmeronmoya.com
touch /tmp/hola_gina_ha_funcionado_el_travis.txt
echo "Finalizando"
