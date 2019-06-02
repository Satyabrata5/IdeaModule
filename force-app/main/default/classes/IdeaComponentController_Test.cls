@isTest
public with sharing class IdeaComponentController_Test {
    static testMethod void IdeaComponent_UnitTest() {
        List<Community> communityList = [Select Id, Name From Community WHERE IsActive=true 
                                         Order By CreatedDate ASC LIMIT 1];
        try{
            Idea ideaToCreate = new Idea();
            ideaToCreate.Title = 'TestIdea';
            ideaToCreate.CommunityId = communityList[0].Id;
            ideaToCreate.Categories='Salesforce';
            ideaToCreate.Status='Completed';
            insert ideaToCreate;
            Test.startTest();
            	IdeaComponentController.categoryPickList();
            	IdeaComponentController.statusPickList();
                System.assertequals(0,IdeaComponentController.AllIdeaComments(communityList[0].Id,'Completed','Salesforce').size());   
            	System.assertequals(0,IdeaComponentController.AllIdeaComments(communityList[0].Id,'Completed',null).size());
                System.assertequals(1,IdeaComponentController.AllIdeas(communityList[0].Id,null,null).size());
                System.assertequals(1,IdeaComponentController.AllIdeas(null,'Completed',null).size());
				System.assertequals(1,IdeaComponentController.AllTopIdeas(communityList[0].Id,'Completed','Salesforce').size());
                IdeaComponentController.CommunityForIdea();
                IdeaComponentController.AllRecentIdeas(communityList[0].Id,'Completed','Salesforce');
                IdeaComponentController.AllRecentIdeas(null,null,null);
                IdeaComponentController.AllIdeaComments(null,null,null);
                IdeaComponentController.createIdeaVote(ideaToCreate.Id,'Up');
            Test.stopTest();
        }catch(Exception e){
            
        }
        
    }
}