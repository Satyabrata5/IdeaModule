public without sharing class IdeaComponentController {  
    @AuraEnabled
    public static List<Idea> AllIdeas(String CommunityId,String selectedStatus,String selectedCategory){
        List<Idea> ideasList = new List<Idea>();
        
        IF(CommunityId=='None' || CommunityId=='undefined' || CommunityId==null){
            List<Community> idealst = new List<Community>();
            if(Schema.sObjectType.Community.fields.ID.isAccessible()&&
               Schema.sObjectType.Community.fields.IsActive.isAccessible()&&
               Schema.sObjectType.Community.fields.Name.isAccessible())
                	idealst =[Select Id, Name From Community WHERE IsActive=true Order By CreatedDate ASC LIMIT 1];
            if(idealst!=null && idealst.size()>0) CommunityId = idealst[0].id;
            
        }
        //System.debug('CommunityId '+CommunityId);
        if(Schema.SObjectType.Idea.isQueryable() && 
           Schema.sObjectType.Idea.fields.ID.isAccessible() &&
           Schema.sObjectType.Idea.fields.Title.isAccessible() &&
           Schema.sObjectType.Idea.fields.Body.isAccessible()&&
           Schema.sObjectType.Idea.fields.Categories.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorName.isAccessible() &&
           Schema.sObjectType.Idea.fields.NumComments.isAccessible() &&
           Schema.sObjectType.Idea.fields.CommunityId.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorSmallPhotoUrl.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteScore.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteTotal.isAccessible() &&
           Schema.sObjectType.Idea.fields.Status.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatedDate.isAccessible()){
               String query='Select Id, Title,IsHtml,Body,CommunityId,CreatorName,'
                            +' CreatorSmallPhotoUrl, VoteScore, VoteTotal,toLabel(Categories),'
                            +' Status,NumComments, CreatedDate,CreatedById,'
                            +' (Select Id, Type, CreatedbyId From Votes)'
                            +' From Idea Where CommunityId=';
               	query+='\''+CommunityId+'\'';
			  	if(!(selectedStatus=='None' || selectedStatus=='undefined' || selectedStatus==null || selectedStatus=='All')){
                   query+=' and Status=\''+selectedStatus+'\'';
               	}
               	if(!(selectedCategory=='None' || selectedCategory=='undefined' || selectedCategory==null || selectedCategory=='All')){
                   query+=' and Categories=\''+selectedCategory+'\'';
               	}
               query+=' order by CreatedDate desc LIMIT 50000 ';
               ideasList = database.query(query);
           }
        return ideasList;
    }
    
   /* @AuraEnabled
    public static List<Idea> AllIdeasByCommunityId(String CommunityId){
        List<Idea> ideasList = new List<Idea>();
        if(Schema.SObjectType.Idea.isQueryable() && 
           Schema.sObjectType.Idea.fields.ID.isAccessible() &&
           Schema.sObjectType.Idea.fields.Title.isAccessible() &&
           Schema.sObjectType.Idea.fields.Body.isAccessible()&&
           Schema.sObjectType.Idea.fields.Categories.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorName.isAccessible() &&
           Schema.sObjectType.Idea.fields.NumComments.isAccessible() &&
           Schema.sObjectType.Idea.fields.CommunityId.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorSmallPhotoUrl.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteScore.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteTotal.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatedDate.isAccessible()){
               ideasList = [Select Id, Title,IsHtml,Body,CommunityId,CreatorName, Status,
                            NumComments,CreatorSmallPhotoUrl, VoteScore, VoteTotal,CreatedById,
                            (Select Id, Type, CreatedbyId From Votes),
                            CreatedDate From Idea Where CommunityId=:CommunityId order by CreatedDate desc LIMIT 50000];
           }
        return ideasList;
    }*/
    
    @AuraEnabled
    public static List<Idea> AllTopIdeas(String CommunityId,String selectedStatus,String selectedCategory){
        List<Idea> ideasList = new List<Idea>();
        IF(CommunityId=='None' || CommunityId=='undefined' || CommunityId==null){
            List<Community> idealst = new List<Community>();
            IF(Schema.sObjectType.Community.fields.ID.isAccessible()&&
               Schema.sObjectType.Community.fields.IsActive.isAccessible()&&
               Schema.sObjectType.Community.fields.Name.isAccessible())
                idealst =[Select Id, Name From Community WHERE IsActive=true Order By CreatedDate ASC LIMIT 1];
            if(idealst!=null && idealst.size()>0) CommunityId = idealst[0].id;
        }
        
        if(Schema.SObjectType.Idea.isQueryable() && 
           Schema.sObjectType.Idea.fields.ID.isAccessible() &&
           Schema.sObjectType.Idea.fields.Title.isAccessible() &&
           Schema.sObjectType.Idea.fields.Body.isAccessible()&&
           Schema.sObjectType.Idea.fields.Categories.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorName.isAccessible() &&
           Schema.sObjectType.Idea.fields.NumComments.isAccessible() &&
           Schema.sObjectType.Idea.fields.CommunityId.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorSmallPhotoUrl.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteScore.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteTotal.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatedDate.isAccessible()){
               String query ='Select Id, Title,IsHtml,Body,CommunityId,CreatorName,Status,'
                            +' NumComments,CreatorSmallPhotoUrl, VoteScore, VoteTotal,CreatedById,'
							+' (Select Id, Type, CreatedbyId From Votes),toLabel(Categories),'
                            +' CreatedDate From Idea Where'
                            +' CommunityId=';
               
               	query+='\''+CommunityId+'\'';
			  	if(!(selectedStatus=='None' || selectedStatus=='undefined' || selectedStatus==null || selectedStatus=='All')){
                   query+=' and Status=\''+selectedStatus+'\'';
               	}
               	if(!(selectedCategory=='None' || selectedCategory=='undefined' || selectedCategory==null || selectedCategory=='All')){
                   query+=' and Categories=\''+selectedCategory+'\'';
               	}
               query+=' order by VoteTotal desc LIMIT 50000 ';
               ideasList = database.query(query);
           }
        
        return ideasList;
    }
    
    @AuraEnabled
    public static List<String> CommunityForIdea(){
        List<String> allComminuties = new List<String>();
        List<Community> idealst = new List<Community>();
        IF(Schema.sObjectType.Community.fields.ID.isAccessible()&&
           Schema.sObjectType.Community.fields.IsActive.isAccessible()&&
           Schema.sObjectType.Community.fields.Name.isAccessible())
            idealst =[Select Id, Name,IsActive From Community WHERE IsActive=true ];  
        For(Community s : idealst){
            allComminuties.add(s.Id+'####'+s.Name);
        }
        return allComminuties;
    }
    
    @AuraEnabled
    public static List<Idea> AllRecentIdeas(String CommunityId,String selectedStatus,String selectedCategory){
        List<Idea> ideasList = new List<Idea>();
        system.debug('CommunityId '+CommunityId);
        IF(CommunityId=='None' || CommunityId=='undefined' || CommunityId==null){
            List<Community> idealst = new List<Community>();
            IF(Schema.sObjectType.Community.fields.ID.isAccessible()&&
               Schema.sObjectType.Community.fields.IsActive.isAccessible()&&
               Schema.sObjectType.Community.fields.Name.isAccessible())
                idealst = [Select Id, Name From Community WHERE IsActive=true Order By CreatedDate ASC LIMIT 1];
            if(idealst!=null && idealst.size()>0) CommunityId = idealst[0].id;
        }
        
        if(Schema.SObjectType.Idea.isQueryable() && 
           Schema.sObjectType.Idea.fields.ID.isAccessible() &&
           Schema.sObjectType.Idea.fields.Title.isAccessible() &&
           Schema.sObjectType.Idea.fields.Body.isAccessible()&&
           Schema.sObjectType.Idea.fields.Categories.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorName.isAccessible() &&
           Schema.sObjectType.Idea.fields.NumComments.isAccessible() &&
           Schema.sObjectType.Idea.fields.CommunityId.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatorSmallPhotoUrl.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteScore.isAccessible() &&
           Schema.sObjectType.Idea.fields.VoteTotal.isAccessible() &&
           Schema.sObjectType.Idea.fields.CreatedDate.isAccessible()){
               String query = 'Select Id, Title,IsHtml,Body,CommunityId,CreatorName, LastViewedDate,' 
                            + ' NumComments,CreatorSmallPhotoUrl, VoteScore, VoteTotal,CreatedById,'
                            +' (Select Id, Type, CreatedbyId From Votes),CreatedDate ,Status,toLabel(Categories)'
                            +' From Idea Where CommunityId=';
               query+='\''+CommunityId+'\'';
			  	if(!(selectedStatus=='None' || selectedStatus=='undefined' || selectedStatus==null || selectedStatus=='All')){
                   query+=' and Status=\''+selectedStatus+'\'';
               	}
               	if(!(selectedCategory=='None' || selectedCategory=='undefined' || selectedCategory==null || selectedCategory=='All')){
                   query+=' and Categories=\''+selectedCategory+'\'';
               	}
               query+=' order by LastViewedDate desc NULLS LAST LIMIT 50000 ';
               ideasList = database.query(query);
           } 
        
        return ideasList;
    }
    
    @AuraEnabled
    public static List<IdeaComment> AllIdeaComments(String CommunityId,String selectedStatus,String selectedCategory){
        List<IdeaComment> ideaCommentList = new List<IdeaComment>();
        Set<Id> ideasIdsSet = new Set<Id>();
        System.debug('CommunityId '+CommunityId);
        String query='Select Id, CommentBody,CreatorName,CreatedDate, IdeaId,Idea.NumComments, Idea.Title,Idea.Status From IdeaComment Where CommunityId=';
        IF(CommunityId!='None' && CommunityId!='undefined' && CommunityId!=null){
            if(Schema.SObjectType.IdeaComment.isQueryable()&& 
               Schema.sObjectType.IdeaComment.fields.Id.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.CommentBody.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.UpVotes.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.CreatorName.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.IdeaId.isAccessible()){
                   query+='\''+CommunityId+'\'';
               }
        }else{
            List<Community> idealst = new List<Community>();
            IF(Schema.sObjectType.Community.fields.ID.isAccessible()&&
               Schema.sObjectType.Community.fields.IsActive.isAccessible()&&
               Schema.sObjectType.Community.fields.Name.isAccessible())
                idealst =[Select Id, Name,IsActive From Community WHERE IsActive=true ];  
            For(Community s : idealst ){
                ideasIdsSet.add(s.Id);
            }
            if(Schema.SObjectType.IdeaComment.isQueryable()&& 
               Schema.sObjectType.IdeaComment.fields.Id.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.CommentBody.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.UpVotes.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.CreatorName.isAccessible() &&
               Schema.sObjectType.IdeaComment.fields.IdeaId.isAccessible()){
                   query+='\''+ideasIdsSet+'\'';
               }
        }
        if(!(selectedStatus=='None' || selectedStatus=='undefined' || selectedStatus==null || selectedStatus=='All')){
                   query+=' and Idea.Status=\''+selectedStatus+'\'';
               	}
               	if(!(selectedCategory=='None' || selectedCategory=='undefined' || selectedCategory==null || selectedCategory=='All')){
                   query+=' and Idea.Categories=\''+selectedCategory+'\'';
               	}
        query+=' order by createdDate desc LIMIT 50000 ';
               ideaCommentList = database.query(query);
        Map<Id,IdeaComment> ideaCommentMap=new Map<Id,IdeaComment>();
        for(IdeaComment i : ideaCommentList)
        {
            if(ideaCommentMap.size()==0 || !ideaCommentMap.containsKey(i.IdeaId)){
            ideaCommentMap.put(i.IdeaId,i);
            }
        }
        System.debug(ideaCommentMap);
        List<IdeaComment> ideaCommentFinalList = new List<IdeaComment>();
        ideaCommentFinalList =ideaCommentMap.values(); 
		return ideaCommentFinalList;
    }
    
    @AuraEnabled
    public static void createIdeaVote(String parentId, String voteType){
        Vote ideaVote = new Vote(
            	ParentId = parentId,
            	Type = voteType
        );
        if(Schema.sObjectType.Vote.fields.ParentId.isCreateable()
          && Schema.sObjectType.Vote.fields.Type.isCreateable()){
            insert new List<Vote>{ideaVote};
        }
    }
     @AuraEnabled
    public static List<String> categoryPickList(){
        List<String> allCategories = new List<String>();
        Schema.SObjectType sObj = Schema.getGlobalDescribe().get('Idea');
        Map<String, Schema.SObjectField> fieldResult_Map = new Map<String, Schema.SObjectField>();
        fieldResult_Map = sObj.getDescribe().fields.getMap();
        List<Schema.Picklistentry> pickListValueList =fieldResult_Map.get('Categories').getDescribe().getpicklistValues();
        for(Schema.Picklistentry sch : pickListValueList){
            allCategories.add(sch.getLabel()+'####'+sch.getValue());
        }
        return allCategories;
    }
    @AuraEnabled
    public static List<String> statusPickList(){
        List<String> allCategories = new List<String>();
        Schema.SObjectType sObj = Schema.getGlobalDescribe().get('Idea');
        Map<String, Schema.SObjectField> fieldResult_Map = new Map<String, Schema.SObjectField>();
        fieldResult_Map = sObj.getDescribe().fields.getMap();
        List<Schema.Picklistentry> pickListValueList =fieldResult_Map.get('Status').getDescribe().getpicklistValues();
        for(Schema.Picklistentry sch : pickListValueList){
            allCategories.add(sch.getLabel()+'####'+sch.getValue());
        }
        return allCategories;
    }
    
}