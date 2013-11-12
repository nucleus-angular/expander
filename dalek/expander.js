module.exports = {
  name: 'expander',

  'should hide content by default': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.notVisible('[data-ut="defaults"] .content', 'content not visible')
    .done();
  },

  'should show content when handle is clicked on': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="defaults"] .handle')
      .assert.visible('[data-ut="defaults"] .content', 'content visible after clicking handle')
    .done();
  },

  'should be able to define a custon handle selector': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="custom-handle"] .custom-handle')
      .assert.visible('[data-ut="custom-handle"] .content', 'content visible after clicking custom handle')
    .done();
  },

  'should be able to define a custon content selector': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="custom-content"] .handle')
      .assert.visible('[data-ut="custom-content"] .custom-content', 'content visible after clicking custom handle')
    .done();
  },

  'should be able to work with multiple expanders on the same page': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="defaults"] .handle')
      .assert.visible('[data-ut="defaults"] .content', 'expander content visible after clicking expander handle')
      .assert.notVisible('[data-ut="custom-handle"] .content', 'other expander content not visible after clicking other expander handle')
    .click('[data-ut="defaults"] .handle')
    .click('[data-ut="custom-handle"] .custom-handle')
      .assert.visible('[data-ut="custom-handle"] .content', 'expander content visible after clicking expander handle')
      .assert.notVisible('[data-ut="defaults"] .content', 'other expander content not visible after clicking other expander handle')
    .done();
  }
}