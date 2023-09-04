all: start

start:
	npm start


build_x:
	npm run build
	mkdir -p /data/workspace/mycube-ui
	cp -r build /data/workspace/mycube-ui

run:
	make build_x
	serve -s /data/workspace/mycube-ui/build

run_go:
	make build_x
	go run main.go 3000