#!/bin/bash

# read argument
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -b|--branch) branch="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [ "$branch" = "" ]; then
  echo "Unknown parameter branch"
  exit 1;
fi

echo "Deploy to $branch"

# copy to remote server
if [ "$branch" = "dev" ]; then
  zip -r dist-seller-v2.zip dist/
  scp dist-seller-v2.zip lionnix-dev-main:/home/lionnix
  rm dist-seller-v2.zip
elif [ "$branch" = "master" ]; then
  zip -r dist-seller-v2.zip dist/
  scp dist-seller-v2.zip lionnix-prod-main:/home/lionnix
  rm dist-seller-v2.zip
else
  echo "Invalid branch"
  exit 1;
fi

# ssh remote server
if [ "$branch" = "dev" ]; then
  ssh lionnix-dev-main 'mkdir -p /usr/lionnix-dashboard/seller-v2; mv /home/lionnix/dist-seller-v2.zip /usr/lionnix-dashboard/seller-v2; cd /usr/lionnix-dashboard/seller-v2; zip -r dist.bak dist/; rm -rf dist; unzip dist-seller-v2.zip; sudo systemctl reload nginx'

elif [ "$branch" = "master" ]; then
  ssh lionnix-prod-main 'mkdir -p /usr/lionnix-dashboard/seller-v2; mv /home/lionnix/dist-seller-v2.zip /usr/lionnix-dashboard/seller-v2; cd /usr/lionnix-dashboard/seller-v2; zip -r dist.bak dist/; rm -rf dist; unzip dist-seller-v2.zip; sudo systemctl reload nginx'
else
  echo "Invalid branch"
  exit 1;
fi

exit