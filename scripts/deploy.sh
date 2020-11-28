#!/bin/bash

while getopts username:password: flag
do
    case "${flag}" in
        username) username=${OPTARG};;
        password) password=${OPTARG};;
    esac
done
echo "Username: $username";
echo "Age: $password";

