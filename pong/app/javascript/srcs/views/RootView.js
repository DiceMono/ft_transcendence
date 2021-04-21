import common from '../common';
import template from '../templates/RootView.html';

const RootView = common.View.extend({
  el: '#root',
  template,
  onRender() {
    this.addRegion('content', '#root .content');
  },
});

export default RootView;
