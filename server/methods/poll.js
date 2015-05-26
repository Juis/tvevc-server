Meteor.methods({

  'insertPoll': function(data){
    if(data[0] === 111 && data[1] !== ''){
      var pollId = Poll.insert(
        {
          status:1, 
          program_id:data[1], 
          description:data[2], 
          img:data[4], 
          user_record:1, 
          user_change:1, 
          date_record:Meteor.call('dateNow'), 
          date_change:Meteor.call('dateNow')
        }
      );

      Answer.update(
        {_id: { $in:data[3] }}, 
        {$set: {poll_id:pollId}}, 
        {multi:true}
      );
    }else{
      //erro aqui
    }
  },

  'updatePoll': function(data){
    if(data[0] === 222 && data[1] !== ''){
      Poll.update(
        {_id:data[1]},
        {$set: 
          {
            program_id:data[2], 
            description:data[3], 
            img:data[5], 
            status:data[6], 
            user_change:1, 
            date_change:Meteor.call('dateNow')
          }
        }
      );
    }else{
      //erro aqui
    }
  },

  'updateStatusPoll': function(data){
    if(data[0] === 222 && data[1] !== ''){
      Poll.update(
        {_id:data[1]},
        {$set: 
          {
            status:data[2], 
            user_change:1, 
            date_change:Meteor.call('dateNow')
          }
        }
      );
    }else{
      //erro aqui
    }
  },

  'deletePoll': function(data){
    if(data[0] === 333){
      answers = Answer.find({poll_id:data[1]}).map(
        function(a) {
          return [a._id]; 
        }
      );

      if(answers){
        for(var a in answers){
          Answer.remove({_id:answers[a][0]});
        }
      }

      Poll.remove({_id:data[1]});
    }
  },

  'insertPollUser': function(data){
    if(data[0] === 111){
      try{
        PollUser.insert({
          poll_id:data[1],
          answer_id:data[2],
          user_id:data[3],
          status:1,
          date_record:Meteor.call('dateNow'),
          date_change:Meteor.call('dateNow')
        });
        return true;
      }catch(e){
        return false;
      }
    }
  },

  'updatePollUser': function(data){
    if(data[0] === 222){
      try{
        Poll.update(
          {_id:data[1]},
          {$set: 
            {
              poll_id:data[2],
              answer_id:data[3],
              user_id:data[4],
              status:1,
              date_change:Meteor.call('dateNow')
            }
          }
        );
        return true;
      }catch(e){
        return false;
      }
    }
  }
  
});