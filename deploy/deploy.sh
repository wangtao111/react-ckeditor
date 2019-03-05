#!/bin/bash

##
# author: Jenkin.K
# date: 2017.12.15
#
# 命令: ./deploy.sh dev/pre/prod
# dev: 测试环境
# pre: 预发布环境
# prod: 生产环境
# module 目录有两级结构的,只需修改PROJECT_NAME={PROJECT_NAME}
# module 目录有两级结构的,需要修改PROJECT_NAME={PROJECT_NAME} 与 FILE_PATH=target 与 TOOLS_PATH=deploy/tools/bin
# SERVER_PORT 服务启动的端口

if [ ! -n "$1" ];then
    echo "please input ENV paramete like [dev] [pre] [prod].";
    exit
fi

export PROJECT_NAME=aop-portal
export APP_HOME=/niub/www

SRC_DIR=$(dirname "$0")
FILE_PATH=target
TOOLS_PATH=deploy/tools/bin
export FILE_NAME=${PROJECT_NAME}.tar.gz
export DEST_DIR=${APP_HOME}/${PROJECT_NAME}
export ENV=$1
export SERVER_DOMAIN=aop.niub.la

date=$(date +%Y%m%d%H%M)

dev=(
47.97.84.144
)
pre=(
47.97.84.144
)
prod=(
47.97.81.66
)

SERVER_LIST=$pre

if [ "${ENV}" == "dev" ]; then
        SERVER_LIST=$dev
        DEST_DIR=${APP_HOME}/${PROJECT_NAME}-dev
        SERVER_DOMAIN=aop-dev.niub.la
fi
if [ "${ENV}" == "pre" ]; then
        SERVER_LIST=$pre
        DEST_DIR=${APP_HOME}/${PROJECT_NAME}-pre
        SERVER_DOMAIN=aop-pre.niub.la
fi
if [ "${ENV}" == "prod" ]; then
        SERVER_LIST=$prod
        DEST_DIR=${APP_HOME}/${PROJECT_NAME}-prod
        SERVER_DOMAIN=aop.niub.la
fi

echo "ENV is : " $1

for (( i=0; i<${#SERVER_LIST[*]}; ++i ))
    do
        echo SERVER_LIST ip : ${SERVER_LIST[$i]}
        echo DEST_DIR : ${DEST_DIR}
    done

function package {
    echo "clean target. " ${FILE_PATH}/${FILE_NAME}
    rm -rf ${FILE_PATH}/${FILE_NAME}
    echo "package target.file name: " ${FILE_PATH}/${FILE_NAME}
    mkdir -p target
    tar zcvf ${FILE_PATH}/${FILE_NAME} build
}

function deploy {
	for (( i=0; i<${#SERVER_LIST[*]}; ++i ))
        do
            echo "backup jar on SERVER_LIST , ip [ ${SERVER_LIST[$i]} ] !"
            ssh -T jenkins@${SERVER_LIST[$i]} << EOF
                sudo -i
                mkdir -p ${DEST_DIR}/logs
                mkdir -p ${DEST_DIR}/bak
                echo "mkdir -p : " ${DEST_DIR}/${PROJECT_NAME}
                mkdir -p ${DEST_DIR}/${PROJECT_NAME}
                chown -R jenkins:jenkins ${DEST_DIR}
                mv ${DEST_DIR}/${FILE_NAME} ${DEST_DIR}/bak/${FILE_NAME}.${date}

EOF
            echo "rsync tar to SERVER_LIST , ip [ ${SERVER_LIST[$i]} ] !"
            echo "rysnc -vz ${FILE_PATH}/${FILE_NAME} jenkins@${SERVER_LIST[$i]}:${DEST_DIR}/${FILE_NAME}"
            scp ${FILE_PATH}/${FILE_NAME} jenkins@${SERVER_LIST[$i]}:${DEST_DIR}/${FILE_NAME}
            echo "TOOLS_PATH:" ${TOOLS_PATH}
            scp ${TOOLS_PATH}/start.sh ${TOOLS_PATH}/stop.sh jenkins@${SERVER_LIST[$i]}:${DEST_DIR}
            echo "restart ${PROJECT_NAME} service"
            ssh -T jenkins@${SERVER_LIST[$i]} << EOF
                sudo -i
                echo "stop ################################################"
                sh ${DEST_DIR}/stop.sh ${PROJECT_NAME}
                echo "start ################################################"
                sh ${DEST_DIR}/start.sh ${PROJECT_NAME} ${ENV}
EOF
            healthCheck
        done
}

function healthCheck {
    HEALTH_CHECK_URL=http://${SERVER_LIST}/
    for i in {1..20}; do
    STATUS_CODE=`curl -o /dev/null -s -w "%{http_code}" ${HEALTH_CHECK_URL}`
    if [ "$STATUS_CODE" = "200" ]; then
       echo "发布成功"
       exit 0
    fi
    echo "健康检查失败 [" ${i} "] 次:"${HEALTH_CHECK_URL}
    sleep 1
done;

echo "发布失败"
exit 1

}

function de {
    package
    deploy
}

echo "if before ${ENV}V"
if [ "${ENV}V" != "V" ]; then
    echo "enter if"
	de
fi
