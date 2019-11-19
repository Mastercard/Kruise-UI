GIT_COMMIT = $(shell git rev-parse HEAD)
GIT_COMMIT = $(shell git rev-parse HEAD)
GIT_SHA    = $(shell git rev-parse --short HEAD)
GIT_TAG    = $(shell git describe --tags --abbrev=0 --exact-match 2>/dev/null)
GIT_DIRTY  = $(shell test -n "`git status --porcelain`" && echo "dirty" || echo "clean")


.PHONY: all
all: build

.PHONY: build
build:
	docker build -t kruise-ui:latest .

.PHONY: prod
prod:
	docker build -f ./Dockerfile.prod -t ryane/kruise-ui:${GIT_SHA} .

run: build
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		-p 3002:3000 \
		--rm \
		--name=kruise-ui \
		kruise-ui:latest

bootstrap: build
	docker run -it \
		-v ${PWD}:/usr/src/app \
		--rm \
		kruise-ui:latest npx create-react-app kruise-ui
	sudo chown -R ${USER}:${USER} kruise-ui
	mv kruise-ui/.gitignore .
	mv kruise-ui/* .
	rm -r kruise-ui

.PHONY: deps
deps:
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		--rm \
		kruise-ui:latest npm install

.PHONY: shell
shell:
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		--rm \
		kruise-ui:latest bash
