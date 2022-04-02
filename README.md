# liquids.rest

A free API for random facts about random liquids 🫗. Inspired by the [Kanye Rest Api](https://kanye.rest).

Built with a React frontend and Express backend.

## How to use

A demo is present on the website.

### Getting all the avaliable types

```shell
$ curl "api.liquids.rest"
{"types":["tea","water","wine"],"message":"Type not provided. Please specify a type from types."}
```

### Getting a fact from a specific type

```shell
$ curl "api.liquids.rest?type=water"
{"data":"Water is wet"}
```

## Getting started

This project requires node and npm for you to run and includes the [backend](api.liquids.rest) and the [frontend](liquids.rest) for this project.

To run this repository, do the following;

* Clone this repository and navigate it's root folder
* Run `npm install` and `npm run dev` to start the development server
* Your frontend will be running at [http://localhost:3000](http://localhost:3000) and the api will be at [http://localhost:4000](http://localhost:4000)

This project is currently deployed via Vercel and has been structured to work in that deployment method.

## Contributing

Please open a pull request to add any new facts/types/features to this repository. Any pull requests are welcome!

### Adding types

To add types, navigate to api/data and create a new json named `[newtype].json` for your new type following the same format as the existing json files. As soon as it is added, ensure to test that your new type at [http://localhost:4000?type=[newtype]](http://localhost:4000). Your pull request will then be reviewed and merged if deemed worthy.

## Licence

This project is distributed using the MIT licence. Feel free to fork this project to contribute or build your own API and website!
