git pull

yarn --registry=https://registry.npm.taobao.org && yarn build

docker rm -f v3-element-plus

docker run -d --restart=on-failure:5 \
  -p 80:80 \
  -v $PWD/dist:/usr/share/nginx/html \
  --name v3-element-plus nginx
