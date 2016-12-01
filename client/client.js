var state = {index: "", login: "", reg: "active"};
Session.setDefault("currentUrl", {index: "active", login: "", reg: ""});

Template.container.currentUrl = function () {
    //Console.log('currentUrl');
  return Session.get("currentUrl");
  //return state;
};

var urlRouter = Backbone.Router.extend({
  routes: {
    "":  "index",
    "login": "login",
    "reg": "reg"
  },
  index: function () {
    state = {index: "active", login: "", reg: ""};
    Session.set("currentUrl", {index: "active", login: "", reg: ""});
  },
  login: function () {
    state = {index: "", login: "active", reg: ""};
    Session.set("currentUrl", {index: "", login: "active", reg: ""});
  },
  reg: function () {
    state = {index: "", login: "", reg: "active"};
    Session.set("currentUrl", {index: "", login: "", reg: "active"});
  },
  redirect: function (url) {
    this.navigate(url, true);
  }
});

Router = new urlRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});

Template.nav.active = function () {
  return Session.get("currentUrl");
  //return state;
};

Template.reg.events({
  'click #submit': function (evt) {
    evt.preventDefault();
    var $username = $("#username").val();
    var $password = $("#password").val();
    var $password_repeat = $("#password-repeat").val();
    if ($password.length ===0 || $username.length ===0) {
      Session.set("info", {success: "", error: "用户名或密码不能为空"});
      return;
    }
    if ($password !== $password_repeat) {
      Session.set("info", {success: "", error: "两次输入密码不一致"});
      return;
    }
    Accounts.createUser({username: $username, password: $password}, function (err) {
      if (err) {
        Session.set("info", {success: "", error: err.reason});
      } else {
        Router.redirect("/");//跳转到主页
        Session.set("info", {success: "注册成功", error: ""});
      }
    });
  }
});

//Session.setDefault("currentUrl", {index: "active", login: "", reg: ""});
Session.setDefault("info", {success: "", error: ""});
Template.info.info = function () {
  return Session.get("info");
};