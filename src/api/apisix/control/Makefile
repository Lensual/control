DOCKER_HOST=unix:///var/run/docker.sock
PWD=$(shell pwd)

.PHONY: all
all: typescript-axios

.PHONY: typescript-axios
typescript-axios:
	docker -H ${DOCKER_HOST} run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:v7.7.0 generate \
		-i /local/apisix-control-3.9.0.yaml \
		-g typescript-axios \
		-o /local/typescript-axios \
		-c /local/typescript-axios.yaml \
		--skip-validate-spec

.PHONY: clean
clean:
	rm -rf ./typescript-axios
