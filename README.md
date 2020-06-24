# StringlerBlot
Typescript bot made with discord.js - I'm creating while learn more about Javascript/Typescript.
For using, clone the example.env and create .env, and configure on your own

## Docker support
Docker is now supported!
But you need to manually build the image, first clone this repo, enter in the cloned folder, after that run:
```
docker build -t stringler .
```

And done! Image is build in your local docker repo, after that, you'll need to create an .env file or pass environment values following the example on: example.env on this repo. I use this command to pass a created file:
```
docker run --env-file hello.env --name teste stringler
```
And docker will pass the environment values for you.
