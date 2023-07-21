all: build_x

build_x:
	npm run build
	mkdir -p /data/workspace/mycube-ui
	cp -r build /data/workspace/mycube-ui

run:
	make build_x
	serve -s /data/workspace/mycube-ui/build