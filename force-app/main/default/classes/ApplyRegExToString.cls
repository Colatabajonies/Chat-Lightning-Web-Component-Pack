global with sharing class ApplyRegExToString 
{
    @InvocableMethod(label='Apply RegEx to String')
    global static List<string> applyRegEx(List<applyRegExRequest> requests)
    {
        string response = '';
        if (requests.size() > 0)
        {
            response = requests[0].inputString;
            String regex = requests[0].pattern;
            String replacestring = requests[0].replaceString == 'null' ? '' : requests[0].replaceString;
            Pattern regexPattern = Pattern.compile(regex);
            Matcher regexMatcher = regexPattern.matcher(response);
        
            if (regexMatcher.find())
            {
                return new List<String>{response.replaceAll(regex, replacestring)};
            }
        }
        
        return new List<String>{response};
    }
    
    global class applyRegExRequest
    {
        @InvocableVariable(required=true)
        global string inputString;
        @InvocableVariable(required=true)
        global string pattern;
        @InvocableVariable(required=false)
        global string replaceString;
    }
}