set -e
export DIR=${PWD}
echo "--------------------------"
echo "Starting Build"
cd tools/node
echo "--------------------------"
echo "Installing npm modules..."
docker compose run --rm node npm install
echo "Build Finished"
echo "--------------------------"
cd ../..
