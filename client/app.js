//client only code
Template.leaderboard.created = function(){
  _.defer(function () {
    
  var x = d3.scale.linear()
            .domain([0, 10])
            .range([0, 70]);
  Tracker.autorun(function () {
        if (Tracker.currentComputation.firstRun) {
          window.d3vis = {};
          window.d3vis.color = d3.scale.category10();
        }
        
        var players = Players.find({}).fetch();
        var data = _.map(players,function(e){
          e.value=e.score;
          return e;
        });

        window.d3vis.color.domain(players.map(function(d) { return d.name}));

        
        d3.select(".chart").selectAll("div").data(data)
          .enter().append("div");
           
        d3.select(".chart").selectAll("div").data(data)
           .style("width", function(d) { return x(d.score) + "px"; })
           .style("background-color", function(d) { return window.d3vis.color(d.name);})
          .text(function(d) { return d.name + ": "+d.score; });
    });  
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
  },
  'click .dec': function () {
    Players.update(Session.get("selectedPlayer"), {$inc: {score: -3}});
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
