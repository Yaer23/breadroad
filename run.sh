
npm install --registry=https://registry.npm.taobao.org && npm run build && cd ./service && npm install --registry=https://registry.npm.taobao.org && cd .. && mkdir ./service/public && mv ./dist/index.html ./service/public/index.html && mv ./dist/static/ ./service/public/static/ && rm -rf ./dist