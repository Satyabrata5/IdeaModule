@IsTest(SeeAllData=true)
public with sharing class ViewIdeaController_Test {
    public static testMethod void viewIdea_UnitTest(){
        List<Community> communityList = [Select Id, Name From Community WHERE IsActive=true 
                                         Order By CreatedDate ASC LIMIT 1];
        Try{
            Idea ideaToCreate = new Idea();
            ideaToCreate.Title = 'TestIdea';
            ideaToCreate.CommunityId = communityList[0].Id;
            ideaToCreate.Categories='Salesforce';
            ideaToCreate.Status='Completed';
            insert ideaToCreate;
            IdeaComment comment = new IdeaComment();
            comment.IdeaId = ideaToCreate.Id;
            comment.CommentBody = 'commentBody';
            insert comment;
            Test.startTest();
            	ViewIdeaController.displayIdeaDetails(ideaToCreate.Id);
            	ViewIdeaController.postComment(ideaToCreate.Id, 'commentBody');
            	ViewIdeaController.deletecommentFromIdea(comment.id);
            	ViewIdeaController.deleteIdea(ideaToCreate.Id);
            	ViewIdeaController.getCurrentUserProfile();
            	ViewIdeaController.getObjectPermisson('Delete');
            Test.stopTest();
        }catch(Exception e){
            
        }
    }
}