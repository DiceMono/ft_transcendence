import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import Region from './Region';

/*
 * This is not tested.
 * if you test this, remove this comment
 */
const CollectionView = Backbone.View.extend({
  preinitialize() {
    this.listenTo(this, 'initialize', this.onInitialize);
    this.listenTo(this, 'render', this.onRender);
    this.listenTo(this, 'destroy', this.onDestroy);
  },
  /* {} */
  initialize(obj) {
    if (obj && obj.model) {
      this.model = obj.model;
      this.listenTo(this.model, 'change', this.render);
    }

    this.collection = new this.CollectionType(obj);
    this.listenTo(this.collection, 'add', this.add);

    this.subViews = [];
    this.regions = {};

    this.trigger('initialize', obj);
  },
  add(model) {
    const view = new this.ViewType({ model });
    this.subViews.push(view);
    $(this.childContainer).append(view.render().el);
  },
  render(selector) {
    const el = selector || this.el;
    this.template = this.template || _.template('');
    if (this.model) {
      $(el).html(this.template(this.model.toJSON()));
    } else {
      $(el).html(this.template());
    }

    /* fetch should be here - because of race condition (even if it's extremely edge case) */
    this.collection.fetch();
    this.trigger('render');
    return this;
  },
  destroy() {
    this.trigger('destroy');

    _.each(this.subViews, function destroySubViews(subView) {
      subView.destroy();
    });

    /* undo listenTo */
    this.stopListening();
    /* remove event handlers */
    this.undelegateEvents();
  },
  getRegion(regionName) {
    return this.regions[regionName];
  },
  addRegion(regionName, selector) {
    this.regions[regionName] = new Region(regionName, selector);
  },
  show(regionName, view) {
    const region = this.getRegion(regionName);
    region.show(view);
  },
});

export default CollectionView;
