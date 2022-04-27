install:
	cd gltfjsx; \
	npm install; \
	cd ..; \
	cd viewer; \
	npm install; \
	HOST=0.0.0.0 npm run start;
