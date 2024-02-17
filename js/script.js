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

        document.getElementById('charaImg').innerHTML= '<img src="' + topPageCharacter.topPageImage +'" width="800px" draggable="false">'
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


$('#listBtn').click(function(){
    randomLoadingPage()
    const randomLoadingTime=Math.floor(Math.random() * 5000) + 1000
    $('#loading').fadeIn();
    $('.characters').delay(randomLoadingTime).fadeIn();
    $('#loading').delay(randomLoadingTime).fadeOut();

})
$('.characters .back').click(function(){
    randomLoadingPage()
    const randomLoadingTime=Math.floor(Math.random() * 5000) + 1000
    $('#loading').fadeIn();
    $('.characters').delay(randomLoadingTime).fadeOut();
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
const exploreHandleOnDown = e =>{
    exploreTrack.dataset.exploreMouseDownAt=e.clientX;
}
const exploreHandleOnUp = () =>{
    exploreTrack.dataset.exploreMouseDownAt='0';
    exploreTrack.dataset.explorePrevPercentage=exploreTrack.dataset.explorePercentage;
}
const exploreHandleOnMove = e =>{
    if (exploreTrack.dataset.exploreMouseDownAt==='0') return;
    const mouseDelta =parseFloat(exploreTrack.dataset.exploreMouseDownAt)-e.clientX;
    const maxDelta=window.innerWidth/0.75;

    const explorePercentage = (mouseDelta/maxDelta)*-100;
    const newPercentageTemp =parseFloat(exploreTrack.dataset.explorePrevPercentage)+explorePercentage;
    const newExplorePercentage=Math.max(Math.min(newPercentageTemp,-1),-75.5);
    exploreTrack.dataset.explorePercentage = newExplorePercentage;

    exploreTrack.style.transform =`translate(${newExplorePercentage}%,-50%)`
}
exploreTrack.onmousedown = e => exploreHandleOnDown(e);
exploreTrack.ontouchstart = e => exploreHandleOnDown(e.touches[0]);
exploreTrack.onmouseup = e => exploreHandleOnUp(e);
exploreTrack.ontouchend = e => exploreHandleOnUp(e.touches[0]);
exploreTrack.onmousemove = e => exploreHandleOnMove(e);
exploreTrack.ontouchmove = e => exploreHandleOnMove(e.touches[0]);

const characterTrack = document.getElementById('PCList');
const characterHandleOnDown = e =>{
    characterTrack.dataset.characterMouseDownAt=e.clientX;
}
const characterHandleOnUp = () =>{
    characterTrack.dataset.characterMouseDownAt='0'
    characterTrack.dataset.characterPrevPercentage=characterTrack.dataset.characterPercentage
}
const characterHandleOnMove = e =>{
    if (characterTrack.dataset.characterMouseDownAt==='0') return;
    const mouseDelta =parseFloat(characterTrack.dataset.characterMouseDownAt)-e.clientX;
    const maxDelta=window.innerWidth/0.75;

    const characterPercentage = (mouseDelta/maxDelta)*-100;
    const newcharacterPercentageTemp =parseFloat(characterTrack.dataset.characterPrevPercentage)+characterPercentage;
    const newcharacterPercentage=Math.max(Math.min(newcharacterPercentageTemp,-.8),-78.5);
    characterTrack.dataset.characterPercentage = newcharacterPercentage;

    characterTrack.style.transform =`translate(${newcharacterPercentage}%,-50%)`
}
characterTrack.onmousedown = e => characterHandleOnDown(e);
characterTrack.ontouchstart = e => characterHandleOnDown(e.touches[0]);
characterTrack.onmouseup = e => characterHandleOnUp(e);
characterTrack.ontouchend = e => characterHandleOnUp(e.touches[0]);
characterTrack.onmousemove = e => characterHandleOnMove(e);
characterTrack.ontouchmove = e => characterHandleOnMove(e.touches[0]);

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

document.querySelectorAll('.listedChara').forEach((div)=>{
    div.addEventListener('click',(e)=>{
        $('.dialogBackground').fadeIn();
        $('.characterDialog').attr('open','open');

        const selectChara =characters[e.currentTarget.dataset.characterName]

        document.getElementById('characterListImg').src=selectChara.fullImage;
        document.getElementById('characterListImg').alt=selectChara.name;
        document.getElementById('characterListName').innerHTML='<ruby><rb>'+selectChara.name+'</rb><rp>(</rp><rt>'+selectChara.ruby+'</rt><rp>)</rp></ruby>';
        document.getElementById('characterAge').innerHTML=selectChara.age;
        document.getElementById('characterJob').innerHTML=selectChara.job;
        document.getElementById('characterComment').innerHTML=selectChara.comment;
        document.querySelector('.collapsibleContent').innerHTML=selectChara.scenario;

        const system = selectChara.system

        const CoC6th = 'STR '+selectChara.STR+' | CON '+selectChara.CON+' | POW '+selectChara.POW+' | DEX '+selectChara.DEX+' <br> APP '+selectChara.APP+' | SIZ '+selectChara.SIZ+' | INT '+selectChara.INT+' | EDU '+selectChara.EDU;
        const inSANe = '好奇心：'+selectChara.intrest+' | 恐怖心：'+selectChara.fear+'<br>'+selectChara.insaneSkilSet;
        const emoklore ='身体 '+selectChara.physic+' | 器用 '+selectChara.clever+' | 精神 '+selectChara.mental+' | 五感 '+selectChara.sense+'<br>知力 '+selectChara.wisdom+' | 魅力 '+selectChara.charm+' | 社会 '+selectChara.social+' | 運勢 '+selectChara.luck;

        switch(system){
            case 'CoC6th':
                document.getElementById('characterStatistic').innerHTML=CoC6th;
                break;
            case 'inSANe':
                document.getElementById('characterStatistic').innerHTML=inSANe
                break;
            case 'multiple':
                document.getElementById('characterStatistic').innerHTML=emoklore+'<br>'+CoC6th
                break;
        }
    })
})

$('.collapsible').on('click', function() {
	$(".collapsibleContent").slideToggle();
	$(this).toggleClass('activatedCollapsible');
});


$('.closeDialog').click(function(){
    $('.dialogBackground').fadeOut();
    $(this).parent().removeAttr('open','open');
	$(".collapsibleContent").slideUp();
})