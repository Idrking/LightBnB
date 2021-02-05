

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
      propertyTitle: $(this).parent().parent().children('h3').text()
    };
    
    $.post('users/reserve', formData, () => {
        console.log('POST submitted successfully');
    });
  });

});