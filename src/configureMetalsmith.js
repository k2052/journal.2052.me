'use strict'

let metalsmith = require('metalsmith');
let ignore = require('metalsmith-ignore');
let filenames = require('metalsmith-filenames');
let collections = require('metalsmith-collections');
let slug = require('metalsmith-slug');
let drafts = require('metalsmith-drafts');
let markdown = require('./markdownPlugin');
let dateFormatter = require('metalsmith-date-formatter');
let feed = require('metalsmith-feed');
let excerpts = require('metalsmith-better-excerpts');

let metal = metalsmith(__dirname)
  .source('./posts')
  .metadata({
    site: {
      title: "K-2052's Journal",
      url: 'http://journal.k2052.me',
      author: 'K-2052'
    }
  })
  .use(ignore([
    'common/*',
    'client/*',
    '*.js'
  ]))
  .use(filenames())
  .use(drafts())
  .use(slug({
    patterns: ['*.md']
  }))
  .use(markdown('full', {
    breaks: true,
    html: true,
    typographer: true
  }))
  .use(collections({
    posts: {
      pattern: '*.md',
      sortBy: 'publishDate',
      reverse: true
    }
  }))
  .use(excerpts({
    pruneLength: 80
  }))
  .use(feed({collection: 'posts'}))
  .use(dateFormatter());

module.exports = metal;
