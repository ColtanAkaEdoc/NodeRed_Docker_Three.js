# NodeRed_Docker_Three.js
Learning Docker by creating a NodeRed-Docker to use Three.js in this NodeRed-Docker

Dependencies:
1. Docker Installation
2. Knowledge Usinge NodeRed
3. Basic Knowledge in JavaScript

Docker Learning Sources:
1. https://youtu.be/i7ABlHngi1Q

Three.js Learning Sources
1. https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
2. https://threejs.org/manual/#en/fundamentals

Tools:
1. Visual Studio Code with Docker extention
2. Three.js Editor: https://threejs.org/editor/

Findings:
1. Docker image, docker container and docker compose are diffrent things but connect together
    1. The image is the building plan, what software ist to install and what commands are to do, when a new container is build (command: docker build; file: Dockerfile)
    2. The container is the thing itself, it does what ever the image said to do and is ready to be used (command: docker run; here proviedes node-red as a service)
    3. Docker compose is the case when you want to have more containers work together and share the filespace (command: docker-compose up; file: docker-compose.yml; the usecase here is to link internal container direcories to external docker host directories)
2. You do not neeed to build own images for everything, it is better to compose existing (offical) images from hub.docker.com to a composed one -> docker-compose
