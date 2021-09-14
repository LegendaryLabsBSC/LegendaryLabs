# ❄️ Legendary Frontend

## Local Frontend Dev

-build your react feature and bind id to a dom element using React.RenderDOM() somewhere in ./src
  -a good way to target one specific element is with getElementById(). examples in index.tsx
  -add that element to a source file within ./godlike/dist
-from the frontend directory, run ```yarn build:nosplit```
-copy the folder static folder from ./build over to ./godlike/dist
  -this allows the website template to see the build of the react features you've built

## Testing

-to test the site, run ```docker-compose up``` from the frontend directory
  -the files will be served at http://localhost:8080
-anytime you make changes you can restart the web server by running ```docker restart frontend_web_1```
  -if this doesn't work, the container might've been renamed. run ```docker ps``` and look for a running nginx container. that's the container you should restart
  -if you make changes to react features you will have to rebuild the project and replace the current build before restarting the container to see your changes

This project contains the main features of the Blizzard application.

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.
