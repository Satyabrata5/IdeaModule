({
    handleChange : function(component, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        component.set("v.masterProfile",$A.get("$Label.c.Idea_Master_Profile"));
		component.set('v.userId', userId);
        // console.log(component.get("v.pageReference"));
        var pageReference = component.get("v.pageReference");
        if(pageReference) {
            var ideaId = pageReference.state.ideaId;
            // console.log('ideaId'+ideaId);
            component.set('v.ideaId', ideaId);
            component.set('v.Community', pageReference.state.Community);
            helper.initialCall(component,Event);
            
		}
       // console.log('recordOwner'+component.get("v.isRecordOwner"));
        //console.log('ideaId'+component.get("v.ideaId"));
    },
    createComment : function(component, event, helper){
        helper.createCommentHelper(component, event);
    },
    ideadelete : function(component,event,helper){
        helper.deleteIdea(component, event);
    },
    ideasTab : function(component,event,helper){
        
        var navService = component.find("navService");
        var pageReference = {    
            "type": "standard__component",
            "attributes": {
                "componentName": "c__IdeaComponent"    
            }
        }
        navService.navigate(pageReference);
    },
    deletecomment : function(component,event,helper){
        var idx = event.target.id;
        helper.deleteCommenthelper(component,event);
    },
    closeModal: function(component, event){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack, 'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    openModal: function(component, event) {
        var eventTarget = event.getSource().getLocalId();
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    openModalComment: function(component, event) {
        var idx = event.target.id;
        component.set('v.ideaCommentId',idx);
        component.set('v.isOpenModalComment',true);
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop1');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    closeModalComment: function(component, event){    
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop1');
        $A.util.removeClass(cmpBack, 'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
        $A.get('e.force:refreshView').fire();
    }
})