#!/bin/bash

while getopts username:password: flag
do
    case "${flag}" in
        username) username=${OPTARG};;
        password) password=${OPTARG};;
    esac
done
touch /tmp/hola_gina_ha_funcionado_el_travis.txt
echo "Finalizando"
