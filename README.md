# Journal.2052.me

This is the source of my personal blog. It uses Markdown for posts, React for views, sass for the styles, babel + webpack metalsmith + npm scripts for the build system.

## Installation

Just run the following:

```sh
$ npm install
```

## Usage

To start up a dev server run:

```sh
$ npm run start
```

Any changes you make will be automatically reloaded.

### Writing Posts

Posts go in src/posts; they are written using Markdown and make us of YAML frontmatter dates for ordering.

### Building a Static Site

Run:

```sh
$ npm run build
```

And a static site will be outputted to build/. You can then serve this up however you like.

### Deploying to Github.io

The process for deploying to Github is dead simple all you have to do is just push build/ to the gh-pages branch. There are a zillion different one liners for this. If you prefer the git dependency only approach you can use the following:

```sh
$ git subtree push --prefix build origin gh-pages
```

But unfortunately that requires you to keep your main branch polluted with the build which isn't ideal. The best solution is to use a script like [git-directory-deploy](https://github.com/lukekarrys/git-directory-deploy) or [gh-pages](https://github.com/tschaub/gh-pages), gh-pages is already installed and setup. To use it just run:

```sh
$ npm run deploy
```

### Crossposting To Medium

There is a script for cross-posting to Medium (borrowed from https://github.com/jxnblk/writing). You can run it like this:

```sh
$ MEDIUM_TOKEN=YOUR_MEDIUM_ACCESS_TOKEN npm run medium src/posts/Post.md
```

## How it works

There are three ingredients that make up a Webpack static site build system (plus one secret ingredient -- an overly verbose description);

### 1. A data file

The first thing we need is something to gather up all our state, routes, content etc. We can then pass this data into our React components much like we would with a datastore (such as Redux). Our components will not need to worry how they get their state, it will come to them. We pass in this data file to a root component and then render out the entire structure using ReactDOM.renderToString().

We use Metalsmith to accomplish gathering all our posts and turning them into data. That way we don't have to re-invent the wheel for anything. We get drafts support, excerpts, markdown parsing, slugizing, code highlighting etc; all for free. We let Metalsmith do 90% of the work and we only do the parts we have to. The middleware for grabbing posts lives in [src/configureMetalsmith.js](src/configureMetalsmith.js) and we run it using code like:

```js
import metal from 'configureMetalsmith';

metal.read(function(err, files){
  metal.run(files, () => {
    let posts =
    this._metadata.posts.map((post) => {
      posts.push({
        title: post.title,
        slug: post.slug,
        date: post.publishDate,
        contents: post.contents.toString('utf8')
      });
    })

    // render posts using react
  })
})
```

It is really simple!

### 2. A build script.

The build script [src/build.js](src/build.js) takes the data and passes into a React component. To get multiple pages on would simply loop through the routes and at each one, render to a new file. We rely on Metalsmith's excellent fileset abstraction for this; our rendering code is middleware that passes posts into React views, which our routed using react-router. It looks like this:

```js
function renderReact(path, data, callback) {
  let store = configureStore(data);

  match({ routes, location: path}, (error, redirectLocation, renderProps) => {
    let reactApp = renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    )

    callback(indexView({ title: "K2052's Journal", data:  store.getState(), reactApp}))
  });
}

metal
  .use((files, metalsmith) => {
    const posts = []

    metalsmith._metadata.posts.map((post) => {
      posts.push({
        title: post.title,
        slug: post.slug,
        date: post.publishDate,
        filename: post.filename,
        contents: post.contents.toString('utf8')
      });
    })

    let data = {
      posts: posts,
      post: undefined
    };

    posts.map((post) => {
      data.post = post;

      renderReact(`/${post.slug}.html`, data, (resp) => {
        delete files[post.filename];
        files[`${post.slug}.html`] = {
          contents: resp
        }
      });
    });

    renderReact(`/`, data, (resp) => {
      files['index.html'] = {
        contents: resp
      }
    })
  })
  .destination('../build')
  .build(function (err) {
    if (err) {
      throw err;
    }
  });
```

See [src/build.js](src/build.js) for the full thing

## 3. Webpack config that builds the build script

Man that heading is a bit of tongue twister! The reason we run our build script through Webpack is so we can take advantage of the Webpack ecosystem. No need to fight with JSX transpilers, figure out how to pre-render Markdown, deal with loaders for image paths etc; we can use webpack's ecosystem for all of it.

The rest of it operates pretty much like a normal React workflow. There is client file in src/index.js and when it is all bundled up and included in a page it mounts to the \#app div. The static pages load the bundled js; so not only can your sites be completely static they can include plenty of JS awesomeness.

## Contributions

I'll happily accept feature requests, bug reports and pull requests for fixes. But anything for your own usage should probably go into a fork. That said, I'm happy to help turn this into a re-usable example, library, or generator or something. So if you have any ideas along that lines feel free to drop me a message!

## License

Everything in this repo is licensed under ISC (basically MIT with less lines). Fork it, quote from it, reuse it, remix etc in any way you like. I only ask that if you use it you change the branding enough that humans don't think you are me. And don't use it to be a jerk.
