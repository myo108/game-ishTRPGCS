function displayTime(){
    var dateTime = new Date();
    var hrs = String(dateTime.getHours()).padStart(2,0);
    var min = String(dateTime.getMinutes()).padStart(2,0);
    var sec = String(dateTime.getSeconds()).padStart(2,0)
    var yrs = dateTime.getFullYear();
    var mon = String(dateTime.getMonth()+1).padStart(2,0);
    var day = String(dateTime.getDate()).padStart(2,0);

    document.getElementById('year').innerHTML=yrs;
    document.getElementById('month').innerHTML=mon;
    document.getElementById('day').innerHTML=day;
    document.getElementById('hours').innerHTML=hrs;
    document.getElementById('minutes').innerHTML=min;
    document.getElementById('second').innerHTML=sec;
}
setInterval(displayTime,500)

function topPageRandomCharacter(){
    const randomCharacter = 
        obj => Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0];
    const topPageCharacter= characters[randomCharacter(characters)]

        document.getElementById('charaImg').innerHTML= '<img src="' + topPageCharacter.image +'" width="800px" draggable="false">'
        document.getElementById('charaName').innerHTML='<h3>' + topPageCharacter.name + '</h3>';
        document.getElementById('charaDialog').innerHTML='<p>'+ topPageCharacter.dialog + '</p>'
}
topPageRandomCharacter();

function randomLoadingPage(){
    const random = 
    obj => Object.keys(obj)[(Math.random() * Object.keys(obj).length) | 0];
const loadingPage= loading[random(loading)]

    document.getElementById('loadingScreenTitle').innerHTML=loadingPage.title;
    document.getElementById('loadingScreenContents').innerHTML=loadingPage.contents;

}

$('#exploreBtn').click(function(){
    randomLoadingPage()
    const randomLoadingTime=Math.floor(Math.random() * 5000) + 1000
    $('#loading').fadeIn();
    $('.explore').delay(randomLoadingTime).fadeIn();
    $('#loading').delay(randomLoadingTime).fadeOut();

})
$('.explore .back').click(function(){
    randomLoadingPage()
    const randomLoadingTime=Math.floor(Math.random() * 5000) + 1000
    $('#loading').fadeIn();
    $('.explore').delay(randomLoadingTime).fadeOut();
    $('#loading').delay(randomLoadingTime).fadeOut();
    topPageRandomCharacter();

})
var slider = tns({
    container: '.eventSlider',
    items: 1,
    slideBy:1,
    autoplay: false,
    controls:false,
    mouseDrag:true,
    nav:false,
    "autoplay": true,
    "autoplayTimeout": 5000,
    autoplayButtonOutput:false,
});

const exploreTrack = document.getElementById('scenarioList');

    exploreTrack.onpointerdown = e =>{
        exploreTrack.dataset.exploreMouseDownAt=e.clientX;
    }
    
    exploreTrack.onpointermove = e =>{
        if (exploreTrack.dataset.exploreMouseDownAt==='0') return;

        const mouseDelta =parseFloat(exploreTrack.dataset.exploreMouseDownAt)-e.clientX;
        const maxDelta=window.innerWidth/1.5;

        const percentage = (mouseDelta/maxDelta)*-100;
        const newPercentageTemp =parseFloat(exploreTrack.dataset.explorePrevPercentage)+percentage;
        const newPercentage=Math.max(Math.min(newPercentageTemp,-1.4),-50);
        exploreTrack.dataset.percentage = newPercentage;

        exploreTrack.style.transform =`translate(${newPercentage}%,-50%)`
    }
    exploreTrack.onpointerup = () =>{
        exploreTrack.dataset.exploreMouseDownAt='0'
        exploreTrack.dataset.explorePrevPercentage=exploreTrack.dataset.percentage
    }

    document.querySelectorAll('.listedScenario').forEach((img)=>{
        img.addEventListener('click',(e)=>{
            $('.dialogBackground').fadeIn();
            $('.scenarioDialog').attr('open','open');
            const selectScenario =clearedScenario[e.currentTarget.dataset.scenarioName]
            document.getElementById('scenarioImg').src=selectScenario.scenarioImg;
            document.getElementById('scenarioImg').alt=selectScenario.title;
            document.getElementById('scenarioName').innerHTML=selectScenario.title;
            document.getElementById('authorKP').innerHTML=selectScenario.authorKeeper;
            document.getElementById('scenarioLink').setAttribute('href',selectScenario.scenarioLink);
            document.getElementById('site').innerHTML=selectScenario.site;
            document.getElementById('clearedDate').innerHTML=selectScenario.date;
            document.getElementById('PCName').innerHTML=selectScenario.PC;
            document.getElementById('scenarioComment').innerHTML=selectScenario.comment
            
        })
    })
$('.closeDialog').click(function(){
    $('.dialogBackground').fadeOut();
    $(this).parent().removeAttr('open','open')
})