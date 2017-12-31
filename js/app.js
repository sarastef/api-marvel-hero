
$(function(){
var marvel='https://gateway.marvel.com/v1/public/characters';
/*Liste des resultats*/

  $('#search_hero').keyup(function(){
      var searchField = $('#search_hero').val();
      $('#listComics ul').remove('');
      $('#listStories ul').remove('');
      $('#listEvents ul').remove('');
      
      $( "#search_hero" ).autocomplete({  
        source: function( request, response ) {  
          $.ajax({  
            url: "https://gateway.marvel.com:443/v1/public/characters",
            type: 'GET',  
            data: {  
                nameStartsWith: searchField,
                apikey: '1e1492d9ce1c03bb96ad4c421289eaf4',  
            },  
            success: function(data) {  
                response( $.map(data.data.results, function( result ) {  
                    return {  
                        label: result.name,  
                        value: result.name,  
                        imgsrc: result.thumbnail.path+'.'+result.thumbnail.extension,
                        comics: result.comics.available,
                        comicsItems:result.comics.items,  
                        stories:result.stories.available,
                        storiesItems:result.stories.items,
                        events:result.events.available,
                        eventsItems:result.events.items,
                        description:result.description

                    }  
                }));  
            }  
        });  
       },
       select: function (even, ui) {
        console.log(ui.item);
        $('#hero_name h1').replaceWith('<h1>'+ui.item.label+'</h1>');
        $('#comics a').replaceWith('<a href="#" class="pull-right" data-toggle="modal" data-target="#comicsList"><span class="badge">'+ui.item.comics+'</span></a>');
        $('#comicStories a').replaceWith('<a href="#" class="pull-right" data-toggle="modal" data-target="#storiesList"><span class="badge">'+ui.item.stories+'</span></a>');
        $('#comicEvents a').replaceWith('<a href="#" class="pull-right" data-toggle="modal" data-target="#eventsList"><span class="badge">'+ui.item.events+'</span></a>');
        $('#comicImg').html('<img src='+ui.item.imgsrc+'><p class="caption">'+ui.item.description+'</p>');
        $('#comics a').click(
             $.each(ui.item.comicsItems, function(key, name){
              $('#listComics').append('<ul><li>'+name.name+'</li></ul>');
        }));

        $('#comicStories a').click($.each(ui.item.storiesItems, function(index, name){
              $('#listStories').append('<ul><li>'+ name.name +'</li></ul>');
        }));
        $('#comicEvents a').click($.each(ui.item.eventsItems, function(index, name){
            $('#listEvents').append('<ul><li>'+name.name+'</li></ul>');
        }));
        
       } 

       }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {  
           return $( "<li class='list-group-item link-class' style='position: relative;' ></li>" )  
               .data( "item.autocomplete", item )  
               .append(  "<img height='40px' width='40px'  class='img-thumbnail' src='" + item.imgsrc + "' /> " + item.label)  
               .appendTo( ul );  

       };

   });
   });
