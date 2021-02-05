

$(() => {
  const $reserve = $(`
    <h4>Reserve this property</h4>
    <form>
    <label for="startDate">Start Date</label>
    <input type="date" id="startDate"></input>
    <input type="date" id="endDate"></input>
    <button type="submit">Reserve Now</button>
    </form>
  `);

  window.$reserve = $reserve;

  $reserve.on('submit', function (event) {
    event.preventDefault();
    const formData = {
      endDate: $(this).children('#endDate').val(),
      startDate: $(this).children('#startDate').val(),
      title: $(this).parent().parent().children('h3').text()
    };
    
    console.log('submitting POST')
    $.post('users/reserve', formData, () => {
      propertyListings.clearListings();
      getAllReservations()
        .then(function(json) {
          propertyListings.addProperties(json.reservations, true);
          views_manager.show('listings');
        })
        .catch(error => console.error(error));;
    });
  });

});