public with sharing class HandshakerHandler {
    @AuraEnabled(cacheable=true)
    public static Integer theSumIs(Integer a, Integer b){
        if(a==0 && b==0)
            throw new AuraHandledException('Both A and B are 0!!!');
        return a+b;    
    }
}
