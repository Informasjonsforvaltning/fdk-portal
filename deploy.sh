#!/usr/bin/env bash
set -e

git fetch

GIT_STATUS=`git status | grep "Your branch is up-to-date with"`
if [ "${GIT_STATUS}" != "Your branch is up-to-date with 'origin/develop'." ] ; then
  echo "You need to be on origin/develop and be up to date with origin";
  exit;
fi

components="fuseki harvester harvester-api nginx reference-data registration registration-api registration-auth registration-validator search search-api"


# remove all local tags
git tag -d $(git tag -l)
# fetch all tags from github
git fetch --tags

DATETIME=`date "+%Y-%m-%dT%H_%M_%S"`

docker login --username ${dockerUsername} --password ${dockerPassword}

function dockerTag {
  component=$1
  fromEnvironment=$2
  toEnvironment=$3

  # pull image from docker hub (overwrites local image if it exists)
  docker pull dcatno/${component}:${fromEnvironment}_latest

  # tag and push latest eg. registration_latest
  docker tag dcatno/${component}:${fromEnvironment}_latest dcatno/${component}:${toEnvironment}_latest
  docker push dcatno/${component}:${toEnvironment}_latest

  # tag and push with date eg. registration_2017-01-01T23_59_01
  docker tag dcatno/${component}:${fromEnvironment}_latest dcatno/${component}:${toEnvironment}_${DATETIME}
  docker push dcatno/${component}:${toEnvironment}_${DATETIME}
}

function gitTag {
  fromEnvironment=$1
  toEnvironment=$2


  # checkout commit for tag that we are using as the base to tag on top of
  git checkout tags/${fromEnvironment}_latest

  # remove ***_latest tag from github and locally
  git push --delete origin ${toEnvironment}_latest || true
  git tag --delete ${toEnvironment}_latest || true

   # tag checked-out commit with ***_latest tag
   git tag ${toEnvironment}_latest
   git tag ${toEnvironment}_${DATETIME}

  # don't forget to checkout develop again, don't want any surprises later
  git checkout develop

  # push all tags to github
  git push origin --tags

}

function openshiftDeploy {
    osEnvironment=$1
    dateTag=$2

    #Delete old services from openshift, and deploy new ones
    sh runDeleteServicesInOpenshift.sh $osEnvironment
    sh runCreateAllServicesInOpenshift.sh $osEnvironment $datetag $dateTag
}


if [ "$1" == "st1" ] ; then

  for i in $components
  do
    dockerTag ${i} ut1 st1
  done

  gitTag ut1 st1

  #todo dobbeltsjekk at dockertag blir riktig
  openshiftDeploy st1 ${toEnvironment}_${DATETIME}



elif [ "$1" == "tt1" ] ; then

  for i in $components
  do
    dockerTag registration st1 tt1
  done

  gitTag st1 tt1

  openshiftDeploy tt1 ${toEnvironment}_${DATETIME}


elif [ "$1" == "ppe" ] ; then
  for i in $components
  do
    dockerTag registration tt1 ppe
  done

  gitTag tt1 ppe

  openshiftDeploy ppe ${toEnvironment}_${DATETIME}



elif [ "$1" == "prod" ] ; then

  for i in $components
  do
    dockerTag registration ppe prod
  done

  gitTag ppe prod

  #todo: sjekk om prod-navnet er prd eller prod
  openshiftDeploy prod ${toEnvironment}_${DATETIME}

else

  echo "####################################"
  echo "####################################"
  echo ""
  echo "First argument expect to be the name of an environment"
  echo "Eg. ./deploy.sh st1"
  echo ""
  echo "####################################"
  echo "####################################"
fi


echo "Done"


