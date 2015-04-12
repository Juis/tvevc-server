Meteor.methods({

  'insertProgram': function(data){
    if(data[0] === 111 && Meteor.call('validateProgram', data)){
        Program.insert({status:1, name:data[1], description:data[2], img:data[3], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
    }else{
      //erro aqui
    }
  },

  'updateProgram': function(data){
    if(data[0] === 222 && Meteor.call('validateProgram', data)){
        Program.update({_id:data[1]},{$set: {name:data[2], description:data[3], img:data[4], user_change:1, date_change:Meteor.call('dateNow')}});
    }else{
      //erro aqui
    }
  },

  'deleteProgram': function(data){
    if(data[0] === 333){
      var polls = answers = '';
      polls = Poll.find({program_id:data[1]}).map(function(a) {return [a._id]; });

      if(polls){

        for(var p in polls){
          answers = Answer.find({poll_id:polls[p][0]}).map(function(a) {return [a._id]; });
          if(answers){

            for(var a in answers){
              Answer.remove({_id:answers[a][0]});
            }
          }

          Poll.remove({_id:polls[p][0]});
        }
      }

      Program.remove({_id:data[1]});
    }
  }
  
});