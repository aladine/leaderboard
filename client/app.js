//client only code
Template.leaderboard.created = function(){
  var data = [4, 8, 15, 16, 23, 42];
  var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
  _.defer(function(){
    d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) { return x(d) + "px"; })
      .text(function(d) { return d; });
  });
  

    
  }

Template.leaderboard.helpers({
  players: function () {
    return Players.find({}, { sort: { score: -1, name: 1 } });
  },
  selectedName: function () {
    var player = Players.findOne(Session.get("selectedPlayer"));
    return player && player.name;
  }
});

Template.leaderboard.events({
  'click .inc': function () {
    Players.update(Session.get("selectedPlayer"), {$inc: {score: 5}});
  }
});

Template.player.helpers({
  selected: function () {
    return Session.equals("selectedPlayer", this._id) ? "selected" : '';
  }
});

Template.player.events({
  'click': function () {
    Session.set("selectedPlayer", this._id);
  }
});
