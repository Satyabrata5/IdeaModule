({
    onInit : function(component, event, helper){
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        component.set('v.userId', userId);
        var action = component.get('c.CommunityForIdea');
        component.set('v.isSending',true);
        action.setCallback(this,function(response){
            var state = response.getState();
            var zoneOptions =[];
            var zoneComponent = component.find('zone');
            if(state === 'SUCCESS' && component.isValid()){
				var result = response.getReturnValue();
                for(var i = 0; i < result.length; i++){
                    zoneOptions.push({label:result[i].split('####')[1],value:result[i].split('####')[0]});
                }
                zoneComponent.set('v.options',zoneOptions);
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    displayAllIdeas : function(component, event, helper){
        var action = component.get('c.AllIdeas');
        var pageSize = component.get("v.pageSize");
        component.set('v.isSending',true);
        action.setParams({
            "CommunityId" :  component.find('zone').get('v.value'),
			"selectedStatus" : component.find('selectStatus').get('v.value'),
            "selectedCategory" : component.find('selectCategory').get('v.value')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.isSending',false);
                var result = response.getReturnValue();
                
                component.set('v.ideaListToShow',result);
                
                component.set("v.totalIdeas", component.get("v.ideaListToShow").length);
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                console.log(component.get("v.totalIdeas"));
                if(result.length>0 && component.find('zone').get('v.value')!==result[0].CommunityId){
				component.find('zone').set('v.value',result[0].CommunityId);
                }
                var ideaPaginationList = [];
                for(var i=0; i< pageSize; i++)
                {
                    if(component.get("v.ideaListToShow").length> i)
                        ideaPaginationList.push(result[i]);    
                }
                component.set('v.ideaPaginationList', ideaPaginationList);
                //console.log('Pagination '+component.get('v.ideaPaginationList'));
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    recentIdeas : function(component) {
        var action = component.get('c.AllRecentIdeas');
        var pageSize = component.get("v.pageSize");
        component.set('v.isSending',true);
        action.setParams({
            "CommunityId" :  component.find('zone').get('v.value'),
            "selectedStatus" : component.find('selectStatus').get('v.value'),
            "selectedCategory" : component.find('selectCategory').get('v.value')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var result = response.getReturnValue();
                component.set('v.ideaListToShow',result);
                component.set('v.isSending',false);
                
                component.set("v.totalIdeas", component.get("v.ideaListToShow").length);
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                
                var ideaPaginationList = [];
                for(var i=0; i< pageSize; i++)
                {
                    if(component.get("v.ideaListToShow").length> i)
                        ideaPaginationList.push(result[i]);    
                }
                component.set('v.ideaPaginationList', ideaPaginationList);
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    IdeasComment : function(component){
        //console.log('zoneid'+component.find('zone').get('v.value'));
        var action = component.get('c.AllIdeaComments');
        component.set('v.isSending',true);
        action.setParams({
            "CommunityId" :  component.find('zone').get('v.value'),
            "selectedStatus" : component.find('selectStatus').get('v.value'),
            "selectedCategory" : component.find('selectCategory').get('v.value')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var result = response.getReturnValue();
                component.set('v.ideaCommentToShow',result);
                component.set('v.isSending',false);
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    TopIdeas : function(component){
        var action = component.get('c.AllTopIdeas');
        var pageSize = component.get("v.pageSize");
        component.set('v.isSending',true);
        action.setParams({
            "CommunityId" :  component.find('zone').get('v.value'),
            "selectedStatus" : component.find('selectStatus').get('v.value'),
            "selectedCategory" : component.find('selectCategory').get('v.value')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var result = response.getReturnValue();
                component.set('v.ideaListToShow',result);
                component.set('v.isSending',false);
                
                component.set("v.totalIdeas", component.get("v.ideaListToShow").length);
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                
                var ideaPaginationList = [];
                for(var i=0; i< pageSize; i++)
                {
                    if(component.get("v.ideaListToShow").length> i)
                        ideaPaginationList.push(result[i]);    
                }
                component.set('v.ideaPaginationList', ideaPaginationList);
                
                console.log(result.length);
                if(result.length==0){
                    component.set('v.noIdeas',true);
                }else{
                   component.set('v.noIdeas',false); 
                }
            }else if(state === 'ERROR'){
                console.log(response.error);
            }else{
                console.log('UNKNOWN ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    closeModal: function(component, event){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack, 'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
        //$A.get('e.force:refreshView').fire();
    },
    openModal: function(component, event) {
        var eventTarget = event.getSource().getLocalId();
        component.set('v.tabValue',eventTarget);
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    updateIdeaList : function(component, event, helper){
		console.log('cat'+component.find('selectCategory').get('v.value'));
        console.log('tabid'+component.find('tabset').get('v.selectedTabId'));
        let tabId=component.find('tabset').get('v.selectedTabId');
        if(tabId==='all_Ideas'){
        this.displayAllIdeas(component, event, helper);
        }
        else if(tabId==='recent_Ideas'){
         this.recentIdeas(component);   
        }
        else if(tabId==='top_Ideas'){
         this.TopIdeas(component);   
        }
        else if(tabId==='idea_Comments'){
         this.IdeasComment(component);   
        }
        
    },
    next : function(component, event){
        var idealist = component.get("v.ideaListToShow");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var PaginationIdealist = [];
        
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++)
        {
            if(idealist.length > i)
            {
                
                PaginationIdealist.push(idealist[i]);
                
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        
        component.set('v.ideaPaginationList', PaginationIdealist);
    },
    previous : function(component, event) 
    {
        var idealist = component.get("v.ideaListToShow");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var PaginationIdealist = [];
        
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++)
        {
            if(i > -1)
            {
                PaginationIdealist.push(idealist[i]);
                counter ++;
            }
            else
            {
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        
        component.set('v.ideaPaginationList', PaginationIdealist);
    },
    displayIdea : function(component, event){
        var idx = event.target.id;
        //console.log('Clicked Idea Id =>'+idx+'  '+component.get('v.CommunitySite'));
        component.set("v.ideaId",idx);
        component.set("v.navigate",true);
        
        var navService = component.find("navService");
        
        var pageReference = {    
            "type": "standard__component",
            "attributes": {
                "componentName": "c__ViewIdea"    
            },    
            "state": {
                ideaId : idx,  
                Community : component.get('v.CommunitySite')
            }
        }
        
        if( component.get('v.CommunitySite') === 'No'){ 
            navService.navigate(pageReference); 
		 }
    },
    setCategory : function(component){
        var action = component.get('c.categoryPickList');
        action.setCallback(this, function(response){
            var state = response.getState();
            var categoriesComponent = component.find('selectCategory');
            if(state === 'SUCCESS' && component.isValid()){
                var selectOptns =[{label : 'All',value : 'All'}];
                var result = response.getReturnValue();
                for(var i = 0; i <result.length; i++){
                    selectOptns.push({
                        label:result[i].split('####')[0],
                        value:result[i].split('####')[1]
                    });
                }
				categoriesComponent.set('v.options',selectOptns);
			}else if(state === 'ERROR'){
                console.log(reposne.error);
            }else{
                console.log('Unknown Error');
            }
        });
        $A.enqueueAction(action);
    },
    setStatus : function(component){
        var action = component.get('c.statusPickList');
        action.setCallback(this, function(response){
            var state = response.getState();
            var statusComponent = component.find('selectStatus');
            if(state === 'SUCCESS' && component.isValid()){
                var selectOptns =[{label : 'All',value : 'All'}];
                var result = response.getReturnValue();
                for(var i = 0; i <result.length; i++){
                    selectOptns.push({label:result[i].split('####')[0],value:result[i].split('####')[1]});
                }
                statusComponent.set('v.options',selectOptns);
            }else if(state === 'ERROR'){
                console.log(reposne.error);
            }else{
                console.log('Unknown Error');
            }
        });
        $A.enqueueAction(action);
    },
    
})