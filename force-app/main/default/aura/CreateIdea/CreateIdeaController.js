({
	createIdea : function(component, event, helper) {
		helper.createIdea(component, event);
	},
    doInit : function(component, event, helper) {
        helper.setCommunity(component);
        helper.setCategory(component);
        helper.setStatus(component);
        helper.setStatusFlag(component);
        helper.getAllIdeas(component);
    },
    handleChange : function(component,event){
        var titleComponent = component.find('titleInput');
        var descriptionComponent = component.find('Description');
        var categoriesComponent = component.find('Categories');
        var zoneComponent = component.find('zone'); 
        
        component.set('v.hasError',false);
        
        titleComponent.set('v.value','');
        titleComponent.set('v.errors',null);
        
        descriptionComponent.set('v.value','');
        descriptionComponent.set('v.errors',null);
        
        /*categoriesComponent.set('v.options','');
        categoriesComponent.set('v.errors',null);
        */
        zoneComponent.set('v.value','');
        zoneComponent.set('v.errors',null);
    },
    onTitleInput : function(component, event, helper){
        let searchValue=component.find('titleInput').get('v.value');
        helper.searchDuplicates(component,searchValue);
    },
    viewIdea : function(component, event, helper){
        console.log('viewIdea');
    	helper.displayIdea(component, event);
	},
    urlRedirect : function(component, event, helper){
        window.open(component.get("v.url"),'_blank');
    }
})