({
    refresh : function(component, event, helper) {
        //component.set('v.ideaRecord',null);
        if(!component.get("v.isRecordOwner"))
        {
            component.set("v.modalContext","Status Update");
        }
        console.log('recordOwner'+component.get("v.isRecordOwner"));
        var action = component.get('c.fetchIdeaDetails');
        var ideaId = component.get('v.ideaId');
        var selectOptns =[];
        
        action.setParams({
            "ideaId" : ideaId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                var responseValue = response.getReturnValue();
                component.set('v.ideaRecord', responseValue);
                var selectedVal = responseValue.Categories;
                console.log('edit idea'+JSON.stringify(responseValue));
                component.set('v.recordStatus',component.get('v.ideaRecord.Status'));
                var optionsCat = [];
                if(selectedVal!=null && selectedVal!= undefined && selectedVal.indexOf(';')>=0){
                    var splitValue =  selectedVal.split(';');
                    for(var i = 0; i < splitValue.length; i++ ){
                        optionsCat.push(
                            splitValue[i]
                        );
                        component.set("v.CategoryValue", optionsCat);
                    }
                }else if(selectedVal!=null && selectedVal!= undefined && selectedVal.indexOf(',')>=0){
                    var splitValue =  selectedVal.split(',');
                    for(var i = 0; i < splitValue.length; i++ ){
                        optionsCat.push(
                            splitValue[i]
                        );
                        component.set("v.CategoryValue", optionsCat);
                    }
                }else{
                    optionsCat.push(
                       selectedVal
                    );
                    component.set("v.CategoryValue", optionsCat);
                }
                var action = component.get('c.categoryPickList');
                action.setCallback(this, function(response){
                    var state = response.getState();
                    if(state === 'SUCCESS' && component.isValid()){
                        var result = response.getReturnValue();
                        for(var i = 0; i <result.length; i++){
                            selectOptns.push({"class": "optionClass",label:result[i].split('####')[0],value:result[i].split('####')[1]});
                        }
                        //component.find("Categories").set('v.options',selectOptns);
                        component.set('v.optionValue',selectOptns);
                    }else if(state === 'ERROR'){
                        console.log(reposne.error);
                    }else{
                        console.log('Unknown Error');
                    }
                });
                $A.enqueueAction(action);
                
                //component.find("Categories").set("v.options", selectOptns);
                //
                
                var selectOptns1 =[];
                var action = component.get('c.statusPickList');
                action.setCallback(this, function(response){
                    var state = response.getState();
                    if(state === 'SUCCESS' && component.isValid()){
                        var result = response.getReturnValue();
                        console.log('edit idea1'+component.get('v.recordStatus'));
                        for(var i = 0; i <result.length; i++){
                            if(component.get('v.recordStatus')===result[i].split('####')[0]){
                                selectOptns1.push({"class": "optionClass",label:result[i].split('####')[0],value:result[i].split('####')[1],selected:true});
                            }
                            else{
                                selectOptns1.push({"class": "optionClass",label:result[i].split('####')[0],value:result[i].split('####')[1]});
                            }
                                
                        }
                        console.log('selected'+JSON.stringify(selectOptns1));
                        component.set('v.ideaRecord.Status',component.get('v.recordStatus'));
                        component.find("statusInput").set('v.options',selectOptns1);
                    }else if(state === 'ERROR'){
                        console.log(reposne.error);
                    }else{
                        console.log('Unknown Error');
                    }
                });
                $A.enqueueAction(action);
                
                component.find("statusInput").set("v.options", selectOptns1);
                
            }
        });
        $A.enqueueAction(action);
    },
    updateIdea : function(component, event, helper) {
        var isValid = true;
        var titleComponent = component.find('titleInput'); 
        if(titleComponent) {
        if(titleComponent.get('v.value')==undefined || titleComponent.get('v.value')==''){
            isValid = false;
            component.set('v.hasError',true);
            titleComponent.set('v.errors',[{message:"Title Can not be empty"}]);
        }else{
            titleComponent.set('v.errors',null);
            component.set('v.hasError',false);
        }
        }
        if(isValid){
            
            var action = component.get('c.updateIdeaRecord');
            var categoryValues = component.find("CategoriesM").get("v.value");
            
            component.set("v.ideaRecord.Categories", categoryValues.toString());
            console.log(component.get('v.ideaRecord'));
            action.setParams({
                "Idearecord" : component.get('v.ideaRecord')
            });
            action.setCallback(this, function(response){
                
                var state = response.getState();
                if(state === 'SUCCESS' && component.isValid()){
                    var cmpTarget = component.find('Modalbox');
                    var cmpBack = component.find('Modalbackdrop');
                    $A.util.removeClass(cmpBack, 'slds-backdrop--open');
                    $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
                    $A.get('e.force:refreshView').fire();          
                }
            });
            $A.enqueueAction(action);
        }
        
    }
})