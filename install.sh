#!/bin/bash

npm install && \
npm install -g pm2 && \
cd client && \
npm install && \
cd .. && \
echo "Los módulos se instalaron correctamente"