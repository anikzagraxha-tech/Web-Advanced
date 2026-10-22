$('li').click(function(){
        alert('clicked')
});

$('#btn').click(function(){
        $('#h1').text('testing text');
        $('#h1').append('Extra text');
});

$('#btn2').on('click',function(){
    console.log('Second button is clicked')
})

$('#myDiv').click(function(){
    $(this).addClass('clicked')    
})
.find('span')
.attr('title','Hover over me')

$('#btn3').click(function(){
    //$(".hidden").show(3000);
    //$(".hidden").show;
    $(".hidden").show('slow');
})

$('#btn4').click(function(){
    $(".hidden").hide;
    $(".hidden").hide('slow');
})

$('#square').click(function(){
    $('#square').animate({
        'width':'200px',
        'height':'200px'
    })
})

$('.testing').click(function(){
    $('.testing').animate({
        'left':'+=50px',
        'opacity':0.25,
        'fontSize':'30px'
    },
    300,
    function(){
        console.log('Animation is complete');
    });
});

