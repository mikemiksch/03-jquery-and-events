// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var val = $(this).find('address a').text();
    var optionTag = '<option value="' + val + '">' + val + '</option>';
    $('#author-filter').append(optionTag);

    val = $(this).attr('data-category');
    optionTag = '<option value="' + val + '">' + val + '</option>';
    if ($('#category-filter option[value="' + val + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
      /* TODONE: If the select box changes to an option that has a value, we should:
                1. Hide all the articles,
                2. Fade in only the articles that match based on the author
                  that was selected. (Hint: attribute selector???)  */
    } else {
      $('article').not('.template').fadeIn();
      /* TODONE: Otherwise, we should:
                1. Show all the articles,
                2. Except the one article we are using as a template. */
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  /* TODONE: Just like we do for #author-filter above, we should handle change
            events on the #category-filter element. Be sure to reset
            the #author-filter while you're at it! */
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').not('.template').fadeIn();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  /* TODONE: Complete the delegated event handler below to help
            power the tabs feature.
      Clicking any .tab element should:
        1. Hide all the .tab-content sections.
        2. Fade in the single .tab-content section that is associated with
            the clicked .tab element's data-content attribute. */
  $('.main-nav').on('click', '.tab', function(){
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').on('click', function(){
    $('.tab-content').hide().fadeIn();
  });
};

articleView.setTeasers = function () {
  /* NOTE: this hides any elements after the first 2 (<p> tags in this case)
            in any article body: */
  $('.article-body *:nth-of-type(n+2)').hide();

  /* TODONE: Add a delegated event handler to reveal the remaining body section.
          When a .read-on link is clicked, we can:
          1. Prevent the default action of a link.
          2. Reveal everything in that particular article now.
          3. Hide the read-on link! (Might need event delegation here). */
  var author = $(this).data('author');
  $('#articles').on('click', 'a.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('*').show();
    $(this).hide();
  });

    // STRETCH GOAL!: change the 'Read More' link to 'Show Less'

};

// TODONE: Invoke all of the above functions (I, mean, methods!);

articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
