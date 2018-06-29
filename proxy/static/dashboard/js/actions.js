$(document).ready(function(){

    function loadWorkspaces(){
        $.get("/get-workspaces", function(data){
            // console.log(data);

            var workspaceList = $('.workspace-list');
            workspaceList.html(" ");

            for(var x = 0; x < data.length; x++){
                var workspaceNameEscaped = data[x].name.replace("'","&#39;");
                workspaceList.append("<li><div class='workspace-controls'><form action='/initialize' method='post'><input type='hidden' value='"+data[x].slug+"' name='uuid' /><input type='hidden' value='"+data[x].id+"' name='id' /><button>Open</button></form><form action='/copy/"+data[x].slug+"' method='post'><button>Copy</button></form><form action='/remove/"+data[x].slug+"' method='post'><button>Remove</button></form></div><input type='name' name='workspaceName' value='"+workspaceNameEscaped+"' /><span class='last-edited'>Created: "+data[x].created+"</span><br><span class='slug'>Slug: "+data[x].slug+"</span> </li>");
            }

        })
    }

    loadWorkspaces();

    $(document).on("change",".workspace-list li input[name=workspaceName]",function(){

        var val = $(this).val();
        var id = $(this).parent().find("input[name='id']").val();

        $.post("/workspace-change-name", {workspaceId: id, workspaceNewName: val }, function(data, error){
            if(error != "success"){
                console.error(error);
            }
        })

    });
});