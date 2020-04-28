
({
    init : function (cmp) {
  //      console.log('location', window.location.search);
        var search = location.search.substring(1);
        //search = search.replace(/&amp;/g, '&');
var vars = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
//console.log('vars', vars);
       // var urlParams = new URLSearchParams(window.location.search);
   //     var keys = urlParams.keys();
//for(key of keys) { 
//  console.log(key); 
//}
// post
// action

      var flow = cmp.find("flowData");
      var flowName = cmp.get("v.flowName");
      var inputVariables = [];
/*
 {
          name : 'firstname',
          type : 'String',
          value : 'nice'
        }
*/
     delete vars.flowName;
     delete vars.language;
      var ikeys = Object.keys(vars);
      for(var key of ikeys){
        var uvalue = vars[key].replace(/\+/g, ' ')
       // console.log(key, vars[key]);
        inputVariables.push({
          name : key,
          type : 'String',
          value : uvalue
        });
      }

      
      flow.startFlow(flowName, inputVariables);
    },
  
    handleStatusChange : function (cmp, event) {
      if (event.getParam('status') === "FINISHED") {
        var outputVariables = event.getParam("outputVariables");
        if (!outputVariables)
        {
          outputVariables = 'Flow Complete';
        }
        //alert('w000t');
        //Try to do a postback
        window.parent.postMessage(
          {
              message: 'lwc:hide:' + JSON.stringify(outputVariables),
              type: 'flow.finished'
          });
      //Do something
      }
    },
    handleRouteChange : function(component, event, helper) {
     //   console.log(event);
    }
  });