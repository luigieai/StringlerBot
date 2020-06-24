# StringlerBlot
Typescript bot made with discord.js - I'm creating while learn more about Javascript/Typescript.
For using, clone the example.env and create .env, and configure on your own

## Docker support
Docker is now supported!
To use it you need to manually build the image, first clone this repo, access the cloned folder, after that run:
```
docker build -t stringler .
```
And it's done! The image is built in your local docker repo.
After that, you'll need to create an .env file or pass environment values following the example on: example.env in this repo. I use this command to pass a created file:
```
docker run --env-file hello.env --name teste stringler
```
Docker will give you the environment values.
