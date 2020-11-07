ng build --configuration $1
sudo rm -rf /usr/share/nginx/toastdos/*
cp -r dist/toastdos-new-front/* /usr/share/nginx/toastdos/