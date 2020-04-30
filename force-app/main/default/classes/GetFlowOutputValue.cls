global with sharing class GetFlowOutputValue 
{
    @InvocableMethod(label='Get Flow Output Var from JSON')
    global static List<string> getFlowOutput(List<getFlowVarInput> requests)
    {
        string response = '';
        try 
        {
            string targetVar = requests[0].varName;
        
            List<Object> lst_JsonParse = (List<Object>)Json.deserializeUntyped(requests[0].inputJSON);
            for(Object obj : lst_JsonParse)
            {
                Map<String,Object> mp_StrObj = (Map<string,Object>)obj;
                if (targetVar.toLowerCase() == 'null')
                {
                    response += mp_StrObj.get('name') + ': ' + mp_StrObj.get('value') + '\n';
                }
                else if ((String)mp_StrObj.get('name') == targetVar)
                {
                    response = (String)mp_StrObj.get('value');
                }
            }
        } catch (Exception ex) 
        {
            response = 'Error parsing response: ' + ex.getMessage();
        }
        
        return new List<String>{response};
    }
    
    global class getFlowVarInput
    {
        @InvocableVariable(required=true)
        global string inputJSON;
        @InvocableVariable(required=true)
        global string varName;
    }
}