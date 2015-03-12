#!/usr/bin/env bash
set -e

BOOST_LIBS=$(cat repos/boost-libs.option)

GERRIT_CHANGE=$(cat PATCHSET | cut -d, -f1)
GERRIT_PATCHSET=$(cat PATCHSET | cut -d, -f2)
if [[ $GERRIT_CHANGE == 'master' ]]; then
  GERRIT_BRANCH=master
else
  GERRIT_BRANCH=refs/changes/$(python -c "print('%02d' % (${GERRIT_CHANGE} % 100))")/${GERRIT_CHANGE}/${GERRIT_PATCHSET}
fi

mkdir -p repos/ndn-cxx
cd repos/ndn-cxx

echo Checking out from Gerrit: ndn-cxx $GERRIT_BRANCH
git init
git fetch --depth=1 http://gerrit.named-data.net/ndn-cxx $GERRIT_BRANCH && git checkout FETCH_HEAD

DEBUG_FLAG=--debug
if [[ ${NDNCXX_DEBUG=1} -eq 0 ]]; then
  DEBUG_FLAG=
fi

echo Building ndn-cxx
./waf configure $DEBUG_FLAG --without-pch $BOOST_LIBS
./waf -j4 || ./waf -j1
sudo ./waf install
