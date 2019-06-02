({
    
    createCommentHelper : function(component, event){
        var commentText = component.find('comments');
        if(commentText.get('v.value') === undefined || commentText.get('v.value') === null || commentText.get('v.value') === ''){
            commentText.set('v.errors',[{message:"This field is required!"}]);
            component.set('v.hasError', true);
        }else{
            component.set('v.isSending' , true);
            commentText.set('v.errors',null);
            component.set('v.hasError', false);
            var action = component.get('c.postComment');
            var ideaIdx = component.get('v.ideaId');
            var commentBody = commentText.get('v.value');
            action.setParams({
                "ideaId" : ideaIdx,
                "commentBody" : commentBody
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state === 'SUCCESS' && component.isValid()){
                    component.set('v.isSending' , false);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        message: 'Comment Posted Successfully',
                        type:'success'
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
                }else{
                    console.log('Error Occured');
                    component.set('v.hasError', true);
                }
            });
            $A.enqueueAction(action);
        }
    },
    deleteIdea : function(component,Event){
        component.set('v.isSending' , true);
        var action = component.get('c.deleteIdea');
        action.setParams({
            "ideaId" : component.get('v.ideaId')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                
                var navService = component.find("navService");
                var pageReference = {    
                    "type": "standard__component",
                    "attributes": {
                        "componentName": "c__IdeaComponent"    
                    }
                }
                navService.navigate(pageReference);
            }else{
                console.log('Error While deleting the Idea:');
                component.set('v.isSending' , false);
                component.set('v.hasError', true);
            }
        });
        $A.enqueueAction(action);
        
    },
    deleteCommenthelper : function(component,Event){
        var idx = Event.target.id;
        console.log(idx);
        component.set('v.isSending' , true);
        var action = component.get('c.deletecommentFromIdea');
        action.setParams({
            "commentId" :idx
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log('###');
            if(state === 'SUCCESS' && component.isValid()){
                console.log('Sucess');
                component.set('v.isSending' , false);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    
                    message: 'Comment Deleted Successfully',
                    type:'success'
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                
            }else{
                console.log('Error While deleting the Idea:');
                component.set('v.isSending' , false);
                component.set('v.hasError', true);
            }
        });
        $A.enqueueAction(action);
    },
    initialCall : function(component, event) {
        component.set('v.isSending' , true);
        console.log('userId'+component.get("v.userId"));
        var action = component.get('c.displayIdeaDetails');
        action.setParams({
            "ideaId" : component.get('v.ideaId')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            //console.log(response.getReturnValue());
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.isSending' , false);
                component.set('v.hasError', false);
                component.set('v.ideaWithComments' , response.getReturnValue());
                console.log(component.get("v.ideaWithComments.idea.CreatedById"));
                this.getCurrentProfile(component);
                this.checkPermission(component,event,'Edit');
                this.checkPermission(component,event,'Delete');
            }else{
                console.log('Error While Fetching SOQL On Idea Object:');
                component.set('v.isSending' , false);
                component.set('v.hasError', true);
            }
        });
        $A.enqueueAction(action);
    },
    getCurrentProfile : function(component) {
        console.log('getCurrentUserProfile');
        var action = component.get('c.getCurrentUserProfile');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.userProfile', response.getReturnValue());
                
                /*if(component.get('v.userId')===component.get("v.ideaWithComments.idea.CreatedById")){
                    component.set("v.isRecordOwner",true);
                }
                else{*/
                component.set("v.isRecordOwner",true);
                // }
                component.find("edit").refresh();
            }else{
                console.log('Error While Fetching SOQL On Idea Object:');
            }
        });
        $A.enqueueAction(action);
    },
    checkPermission : function(component,Event,type) {
        let action= component.get("c.getObjectPermisson");
        action.setParams({type : type});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                if(type==='Edit'){
                    component.set("v.isEditable",response.getReturnValue());
                }
                else if(type==='Delete'){
                    component.set("v.isDeletable",response.getReturnValue()); 
                }
            }else{
                console.log('Error While Fetching SOQL On Idea Object:');
            }
        });
        $A.enqueueAction(action);
    }
})