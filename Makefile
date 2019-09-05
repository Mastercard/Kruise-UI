.PHONY: all
all: build

.PHONY: build
build:
	docker build -t kruise-wizard:latest .

run: build
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		-p 3002:3000 \
		--rm \
		--name=kruise-wizard \
		kruise-wizard:latest

bootstrap: build
	docker run -it \
		-v ${PWD}:/usr/src/app \
		--rm \
		kruise-wizard:latest npx create-react-app kruise-wizard
	sudo chown -R ${USER}:${USER} kruise-wizard
	mv kruise-wizard/.gitignore .
	mv kruise-wizard/* .
	rm -r kruise-wizard

.PHONY: deps
deps:
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		--rm \
		kruise-wizard:latest npm install

.PHONY: shell
shell:
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		--rm \
		kruise-wizard:latest bash
