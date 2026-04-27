run:
	pnpm run dev

build:
	pnpm run build

start:
	pnpm run start -p 3001

dockerbuild:
	docker build -t iot-web-app .

dockerrun:
	docker run --rm -p 3001:3000 iot-web-app
