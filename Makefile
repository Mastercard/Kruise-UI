.PHONY: all
all: build

.PHONY: build
build:
	docker build -t deploy-wizard-ui:latest .

.PHONY: prod
prod:
	docker build -f ./Dockerfile.prod -t deploy-wizard-ui:v0.1 .

run: build
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		-p 3001:3000 \
		--rm \
		--name=deploy-wizard \
		deploy-wizard-ui:latest

bootstrap: build
	docker run -it \
		-v ${PWD}:/usr/src/app \
		--rm \
		deploy-wizard-ui:latest npx create-react-app deploy-wizard-ui
	sudo chown -R ${USER}:${USER} deploy-wizard-ui
	mv deploy-wizard-ui/.gitignore .
	mv deploy-wizard-ui/* .
	rm -r deploy-wizard-ui

.PHONY: deps
deps:
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		--rm \
		deploy-wizard-ui:latest npm install
