// Generated by CoffeeScript 1.10.0
(function() {
  var Category, mongoose, userSchema;

  mongoose = require('mongoose');

  userSchema = mongoose.Schema({
    username: String,
    email: {
      type: String,
      $p: {
        label: 'E-Mail'
      }
    },
    password: {
      type: String,
      $p: {
        hide: true
      }
    },
    isAdmin: {
      type: Boolean
    },
    tags: {
      type: Array,
      "default": []
    },
    meta: {
      slug: {
        type: String
      },
      thumb: {
        type: String
      },
      settings: {
        type: mongoose.Schema.Types.Mixed
      },
      deepMeta: {
        deepSlug: String
      }
    },
    data: mongoose.Schema.Types.Mixed
  });

  userSchema.virtual('$pTitle').get(function() {
    return this.username;
  });

  userSchema.virtual('$pTableRowClass').get(function() {
    if (this.isAdmin) {
      return 'info';
    } else {
      return null;
    }
  });

  Category = mongoose.model('Category', userSchema);

  Category.$p = {
    showAddButton: true,
    showSearchForm: true,
    redirectAfterAddEdit: 'old',
    rowActions: [
      {
        label: 'Catalogues',
        href: '/catalogues?conditions[user]={$row.id}'
      }
    ],
    pageActions: ['_delete']
  };

  module.exports = Category;

}).call(this);
