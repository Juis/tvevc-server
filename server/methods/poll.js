Meteor.methods({

  'insertPoll': function(data){
    if(data[0] === 111 && data[1] !== ''){
      var pollId = Poll.insert({status:1, program_id:data[1], description:data[2], img:data[4], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
      Answer.update({_id: { $in:data[3] }}, {$set: {poll_id:pollId}}, {multi:true});
    }else{
      //erro aqui
    }
  },

  'updatePoll': function(data){
    if(data[0] === 222 && data[1] !== ''){
      Poll.update({_id:data[1]},{$set: {program_id:data[2], description:data[3], img:data[4], img:data[5], user_change:1, date_change:Meteor.call('dateNow')}});
    }else{
      //erro aqui
    }
  },

  'deletePoll': function(data){
    if(data[0] === 333){
      answers = Answer.find({poll_id:data[1]}).map(function(a) {return [a._id]; });
      if(answers){

        for(var a in answers){
          Answer.remove({_id:answers[a][0]});
        }
      }

      Poll.remove({_id:data[1]});
    }
  }
  
});