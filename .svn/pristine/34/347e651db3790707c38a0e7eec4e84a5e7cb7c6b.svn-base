#!/bin/bash
#@date 2020-05-22
#@by myp361@163.com
installPath=/data/html/dospaas


path=$(cd `dirname $0`; pwd)
#判断程序是否执行
while true
do  
if read -t10 -p "Do you wish to install this program [yes/no]: " input
    then  
		case $input in
			yes|y|Y)
				break
				;;
			no|n|N)
				exit
				;;
			*)
				continue
				;;
		esac  
else
	echo "" #Timeout
	exit
fi   
done 

echo "svn up"
svn up

echo "yarn build"
yarn build

#echo "rm -rf $installPath"
#rm -rf $installPath

echo "\cp -rf $path/dist/* $installPath"
\cp -rf $path/dist/* $installPath














