.PHONY: build deploy clean stop fresh

CRATE_NAME := hello_backend

build:
	cargo build --release
	candid-extractor ./target/wasm32-unknown-unknown/release/$(CRATE_NAME).wasm > ./src/$(CRATE_NAME)/$(CRATE_NAME).did
	dfx generate

deploy:
	dfx start --background || [ $$? -eq 255 ]
	dfx deploy

clean:
	dfx stop
	cargo clean
	rm ./src/$(CRATE_NAME)/$(CRATE_NAME).did || [ $$? -eq 1 ]

redeploy:
	make build
	make deploy

fresh:
	make clean
	make build
	make redeploy

stop:
	dfx stop
