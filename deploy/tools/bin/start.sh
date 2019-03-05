#!/usr/bin/env bash

APP_HOME=/niub/www
PROJECT_NAME=$1
ENV=$2
FILE_NAME=${PROJECT_NAME}.tar.gz
DEST_DIR=${APP_HOME}/${PROJECT_NAME}-$2

if [ ! -n "$1" ];then
    echo "please input PROJECT_NAME prameter like [md-service-mongo] [md-parser-pdf] [md-parser-excel].";
    exit
fi

if [ ! -n "$2" ];then
    echo "please input ENV prameter like [dev] [pre] [prod].";
    exit
fi

echo "tar zxvf service: ${PROJECT_NAME}"
echo " path: ${DEST_DIR}/${FILE_NAME}  env : ${ENV}"
echo "clean space."
rm -rf ${DEST_DIR}/${PROJECT_NAME}
echo "mkdir -p : " ${DEST_DIR}/${PROJECT_NAME}
mkdir -p ${DEST_DIR}/${PROJECT_NAME}
echo "deploy space."
tar zxvf ${DEST_DIR}/${FILE_NAME} -C ${DEST_DIR}/${PROJECT_NAME}
echo "chown -r "
chown -R root:root ${DEST_DIR}
chmod -R 755 ${DEST_DIR}

if [ "$?" = "0" ]; then
    echo "${1%/} start succeed"
    echo $BOOT_START_LOG
else
    echo "${1%/} start failed"
    echo $BOOT_START_LOG
fi

