$(document).ready(function() {

  var target = $('#ch24-dropdown-purpose > .options > .list ul');
  window.displayBoxIndex = -1;

  var data = [
    'Free use',
    'Used vehicle',
    'New vehicle',
    'Motorcycle',
    'Debt rescheduling / repayment of credit',
    'Balancing dispo',
    'Equipment / Furniture',
    'Renovation / construction financing',
    'PC / Audio / Video',
    'Travel'
  ];


  // *** Init Data ***
  pupulateData(target, data);
  selectElement(0);


  // *** Events ***
  // --------------------------------------------------
  $('#ch24-dropdown-purpose .selected').click(function() {
    $('#ch24-dropdown-purpose .list').toggle();
  });

  $('#ch24-dropdown-purpose .list li').click(function(e) {
    var valueId = $(this).val();
    selectElement(valueId)
  });

  $(document).click(function(event) {
    var clickTarget = $(event.target);
    if (!clickTarget.closest('#ch24-dropdown-purpose').length) {
      closeOpenList();
    }
  });

  $(window).keydown(function(e) {
    if ($('#ch24-dropdown-purpose .list:visible').length) {

      var currentElement = $('#ch24-dropdown-purpose li.active');

      switch(e.which) {
        case 38:
          navigate(-1);
          break;
  
        case 40:
          navigate(1);
          break;
  
        case 13:
          selectElement(currentElement.val())
          break;
  
        default: 
          return;
      }
    }

  });


  // *** Helper methods ***
  // --------------------------------------------------
  function pupulateData(target, data) {
    $.each(data, function(key, value) {
      target.append('<li value="' + key + '">' + value + '</li>');
    });
  }

  function closeOpenList() {
    $('#ch24-dropdown-purpose .list').hide();
  }

  function selectElement(valueId) {
    $('#ch24-dropdown-purpose .selected').text(data[valueId]);
    setElementActive(valueId);
    closeOpenList();
  }

  function setElementActive(valueId) {
    $('#ch24-dropdown-purpose .list ul li').each(function() {
      $(this).attr('class', '');
    });

    $('#ch24-dropdown-purpose .list ul').find('[value="' + valueId + '"]').addClass('active');
  }

  function navigate(diff) {
    displayBoxIndex += diff;
    var oBoxCollection = $("#ch24-dropdown-purpose .list ul li");
    if (displayBoxIndex >= oBoxCollection.length) {
        displayBoxIndex = 0;
    }
    if (displayBoxIndex < 0) {
        displayBoxIndex = oBoxCollection.length - 1;
    }
    oBoxCollection.removeClass('active').eq(displayBoxIndex).addClass('active');
  }

});