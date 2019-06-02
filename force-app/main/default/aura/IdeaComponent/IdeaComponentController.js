({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
        helper.setCategory(component);
        helper.setStatus(component);
    },
    showAllIdeas : function(component, event, helper) {
        console.log('cat'+component.find('selectCategory').get('v.value'));
        console.log('status'+component.find('selectStatus').get('v.value'));
        helper.displayAllIdeas(component, event, helper);
    },
    showRecentIdeas : function(component, event, helper){
        helper.recentIdeas(component);
    },
    showTopIdeas : function(component, event, helper){
        helper.TopIdeas(component);
    },
    showIdeasComment : function(component, event, helper){
        helper.IdeasComment(component);
    },
    addCommentToIdea : function(component, event, helper){
        
    }, 
    closeModal : function(component, event, helper){  
        helper.closeModal(component, event);
    },
    openModal : function(component, event, helper){  
        helper.openModal(component, event);
    },
    updateIdeaList : function(component, event, helper){ 
        helper.updateIdeaList(component, event, helper);
    },
    refreshPage : function(component, event, helper){ 
        helper.closeModal(component, event);
        $A.get('e.force:refreshView').fire();
    },
    previous : function(component, event, helper){ 
        helper.previous(component, event);
    },
    next : function(component, event, helper){ 
        helper.next(component, event);
    },
    viewIdea : function(component, event, helper){ 
        helper.displayIdea(component, event);
    },
    reload : function(component, event, helper){ 
        $A.get('e.force:refreshView').fire();
    },
    redirectToUser : function(component, event, helper){
        var ctarget = event.currentTarget;
        var id_str = event.target.getAttribute("data-value");
        console.log(id_str);
    },
    onCategoryClick : function(component, event, helper){
        var category = event.target.id;
        console.log('category'+ category);
        if(category==='MyGard'){
           category='Extranet'; 
        }
        component.find('selectCategory').set('v.value',category);
        helper.updateIdeaList(component, event, helper);
    }
    
})