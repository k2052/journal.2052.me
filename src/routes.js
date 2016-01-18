import App from 'containers//App';
import Posts from 'components//Posts';
import Post from 'components//Post';

const routes = [
  { path: '/',
    component: App,
    indexRoute: { component: Posts },
    childRoutes: [
      {
        path: '/:post.html',
        component: Post
      }
    ]
  }
];

export default routes;
