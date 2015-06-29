var addSection = $('#new-section');
var index      = 1;
console.log(addSection);
$('#new-section').on('click', function () {
  event.preventDefault();
  console.log('new section made...');

  var $newSection      = $('<fieldset>'),
      $newTitleLabel   = $('<label for="section0">Next Section Title:<br/></label>'),
      $newTitle        = $('<input name="article[content]['+ index +'][title]" type="text" size="30" placeholder="Whats this section about?"><br/>'),
      $newContentLabel = $('<label for="content0">Next Section Content:<br/></label>'),
      $newContent      = $('<textarea name="article[content]['+ index +'][content]" type="text" rows="8" cols="40" placeholder="Tell me something cool!">');

  $('fieldset').append($newTitleLabel)
               .append($newTitle)
               .append($newContentLabel)
               .append($newContent);

  index++;
});
