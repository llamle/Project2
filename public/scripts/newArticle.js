var addSection = $('#new-section');
var index      = 1;
console.log(addSection);
$('#new-section').on('click', function () {
  event.preventDefault();
  console.log('new section made...');

  var $newSection      = $('<fieldset>'),
      $newTitleLabel   = $('<label for="section0">Next Section Title:<br/></label>'),
      $newTitle        = $('<input name="article[content]['+ index +'][title]" type="text" size="30" placeholder="Whats this section about?"><br/>'),
      $newButton       = $('<button id="removeSection-<%= i %>" class="delete-section" data-section-id="<%= article.content[i]._id %>" name="button">Delete Section</button><br/>'),
      $newContentLabel = $('<label for="content0">Next Section Content:<br/></label>'),
      $newContent      = $('<textarea name="article[content]['+ index +'][content]" type="text" rows="8" cols="40" placeholder="Tell me something cool!" onkeyup="textAreaAdjust(this)" style="overflow:hidden">');

  $('fieldset').append($newTitleLabel)
               .append($newTitle)
               .append($newButton)
               .append($newContentLabel)
               .append($newContent);

  index++;
});

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
};


$('.delete-section').on('click', function(e){
  e.preventDefault();

  var sectionId = $(this).data('section-id');
  var $section  = $(this).parent();
  var articleId = $('#title').data('article-id');

  $.ajax({
    url: "/articles/" + articleId + "/section/" + sectionId,
    method: "DELETE",
    success: function (ajaxResponse) {
      if (ajaxResponse.success) {
        $section.slideUp(function () {
          $section.remove();
        });
        console.log(ajaxResponse);
      };
    }
  });
});
