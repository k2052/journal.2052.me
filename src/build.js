import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import configureStore from './store';
import routes from './routes';
import metal from './configureMetalsmith';
import indexView from './indexView';

function renderReact(path, data, callback) {
  let store = configureStore(data);

  match({ routes, location: path}, (error, redirectLocation, renderProps) => {
    let reactApp = renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    )

    callback(indexView({ title: `${data.title}`, data:  store.getState(), reactApp}))
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
      title: "K-2052's Journal",
      posts: posts,
      post: undefined
    };

    posts.map((post) => {
      data.post = post;
      data.title = post.title;

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
