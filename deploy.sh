#!/usr/bin/env bash
# Redeploy WayFinder to Azure after a code change. No GitHub needed.
# Usage:  ./deploy.sh
set -euo pipefail

RG="cargoguard-rg"
ACR="cargoguardacr6804"
APP="cargoguard"
# Unique tag every deploy: Container Apps won't re-pull a moving ":latest",
# so a fresh tag is required to force a new revision onto the running app.
TAG="build-$(date +%s)"
IMAGE="$ACR.azurecr.io/cargoguard:$TAG"

echo "==> Building image in Azure (ACR) as $TAG ..."
az acr build --registry "$ACR" -g "$RG" --image "cargoguard:$TAG" --file Dockerfile . -o none

echo "==> Rolling out new revision..."
az containerapp update -n "$APP" -g "$RG" --image "$IMAGE" -o none

URL="https://$(az containerapp show -n "$APP" -g "$RG" --query 'properties.configuration.ingress.fqdn' -o tsv)/"
echo "==> Live at: $URL"
