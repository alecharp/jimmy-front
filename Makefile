.PHONY: docker
.DEFAULT_GOAL := docker

DOCKER_TAG = latest
DOCKER_IMG := $(USER)/jimmy-front:$(DOCKER_TAG)

clean:
	@rm -rf dist

node_modules: npm-shrinkwrap.json
	@npm ci --silent
dist: node_modules
	@npm run test
	@npm run build
docker: dist Dockerfile server/package.json server/server.js
	@docker image build -t $(DOCKER_IMG) .
