import Backbone from 'backbone';
import Radio from 'backbone.radio';
import view from './views';

const Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    home: 'home',
    login: 'login',
  },
  initialize() {
    const channel = Radio.channel('route');
    const router = this;

    /* register router event handler */
    channel.on('route', function route(target) {
      router.navigate(target, { trigger: true });
    });

    channel.on('refresh', function refresh() {
      Backbone.history.loadUrl(Backbone.history.fragment);
    });
  },
  home() {
    const rootView = Radio.channel('app').request('rootView');
    const login = Radio.channel('app').request('login');
    if (!login) {
      Radio.channel('route').trigger('route', 'login');
    } else {
      rootView.show('content', new view.MainView());
    }
  },
  login() {
    const rootView = Radio.channel('app').request('rootView');
    const login = Radio.channel('app').request('login');
    if (login) {
      Radio.channel('route').trigger('route', 'home');
    } else {
      rootView.show('content', new view.LoginView());
    }
  },
});

export default Router;
