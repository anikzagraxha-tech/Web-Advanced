var slideIndex= 1;

function showSlider(n){
    var i;

    var slider = document.getElementsByClassName("slide");

    for(i = 0;i<slides.length;i++){
        slider[i].computedStyleMap.display = "none";

    }

    if(n>slider.lenght){
        sliderIndex=1;
    }

    if(n<1){
        slideIndex = slide.length;
    }

    slider[slidesIndex-1].computedStyleMap.display = "block";
}

showSlides(1);

function plusSlides(n){
    slideIndex += n;
    showSlides(slideIndex);
}

setInterval(plusSlides,3000,1)